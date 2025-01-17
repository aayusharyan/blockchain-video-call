var firebaseConfig = {
  apiKey: "AIzaSyAUX8UgqMjDAhjj0Wk6UPs4Yj0-xhPfRkw",
  authDomain: "myapplication-70889.firebaseapp.com",
  databaseURL: "https://myapplication-70889.firebaseio.com",
  projectId: "myapplication-70889",
  storageBucket: "myapplication-70889.appspot.com",
  messagingSenderId: "556386051122",
  appId: "1:556386051122:web:d96a510b01fd56902d882b"
};
firebase.initializeApp(firebaseConfig);


let audioInList = [];
let audioOutList = [];
let videoInList = [];
let localStream = null;
let audioVolume = 1;
let isMuted = false;
let peerConnectionList = {};
let dataChannelList = {};
let pendingPeerConnection = null;
let pendingdataChannel = null;
let pendingICEDetails = [];
var db = firebase.firestore();
let isScreenShare = false;
let servers = {
  iceServers: [
    {
      urls: [
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
      ],
    },
  ],
  iceCandidatePoolSize: 10,
}

let audioContext = new AudioContext()
let gainNode = audioContext.createGain();

let getMediaDeviceList = async () => {
  audioInList = [];
  audioOutList = [];
  videoInList = [];
  let deviceList = await navigator.mediaDevices.enumerateDevices();
  deviceList.forEach((singleDevice) => {
    if (singleDevice.kind == 'audiooutput') {
      audioOutList.push(singleDevice);
    } else if (singleDevice.kind == 'audioinput') {
      audioInList.push(singleDevice);
    } else if (singleDevice.kind == 'videoinput') {
      videoInList.push(singleDevice);
    }
  });
};

let startStream = async () => {
  await navigator.mediaDevices.enumerateDevices();
  var videoElem = document.querySelector("#person1 > video");
  console.log(videoElem);
  let mediaProp = {
    audio: true,
    video: {
      deviceId: 'default',
    }
  };

  if (!navigator.mediaDevices.getUserMedia) {
    alert('No Permissions');
  }
  try {
    localStream = await navigator.mediaDevices.getUserMedia(mediaProp);

    videoElem.srcObject = localStream;
    videoElem.onloadedmetadata = (e) => {
      videoElem.play();
    };
  } catch (err) {
    console.log(err);
  }
}

(async () => {
  await startStream();
  await getMediaDeviceList();
  // await connectRTC();
  console.log('Populating');
  populateUI();
  autoJoinCall();
})();

let AttachAudio = () => {
  const audioTrack = localStream.getAudioTracks()[0];
  var src = audioContext.createMediaStreamSource(new MediaStream([audioTrack]));
  var dst = audioContext.createMediaStreamDestination();
  gainNode.gain.value = 1;
  [src, gainNode, dst].reduce((a, b) => a && a.connect(b));
  localStream.removeTrack(audioTrack);
  localStream.addTrack(dst.stream.getAudioTracks()[0]);
}

let generateOffer = async (peerConnection, CandidateDBReference) => {
  pendingICEDetails = [];
  let documents = await CandidateDBReference.collection('offers').doc('pending').collection('details').get();
  documents.forEach((singleDoc) => {
    singleDoc.ref.delete();
  });
  await CandidateDBReference.collection('offers').doc('pending').delete();
  let myCandidateOfferDetails = CandidateDBReference.collection('offers').doc('pending').collection('details');
  peerConnection.onicecandidate = (event) => {
    event.candidate && myCandidateOfferDetails.add(event.candidate.toJSON()) && pendingICEDetails.push(event.candidate.toJSON());
  }

  let offerDescription = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type
  };

  await CandidateDBReference.set(offer);
}

let newCall = async () => {
  AttachAudio();
  pendingPeerConnection = createPeerConnection();

  let callDoc = db.collection("offers").doc();
  let callID = callDoc.id;
  document.getElementById('call_id').value = callID;

  window.history.pushState('', "Call", `?call=${callID}`);

  let candidates = callDoc.collection('candidates');
  let myCandidate = candidates.doc();

  await generateOffer(pendingPeerConnection, myCandidate);

  listenForCandidates(candidates, myCandidate);
}


let joinCall = async () => {
  AttachAudio();
  playSound();
  let callID = document.getElementById('call_id').value;
  let callDoc = db.collection("offers").doc(callID);

  let candidateList = callDoc.collection('candidates');
  let myCandidate = candidateList.doc();

  candidateList.get().then((snapshot) => {
    (async () => {
      for (let singleCandidate of snapshot.docs) {
        let peerConnection = createPeerConnection();
        let newCandidateId = singleCandidate.id;
        let candidateOfferDetails = singleCandidate.data();

        let myOfferDetails = myCandidate.collection('offers').doc(newCandidateId).collection('details');
        peerConnection.onicecandidate = (event) => {
          event.candidate && myOfferDetails.add(event.candidate.toJSON());
        }

        peerConnection.ondatachannel = (event) => {
          receiveChannel = event.channel;
          dataChannelList[newCandidateId] = receiveChannel;
          receiveChannel.onmessage = (event) => {
            message = JSON.parse(event.data);
            messageHandler(message, newCandidateId);
          };
          receiveChannel.onopen = () => {
            if (receiveChannel.readyState == 'open') {
              sendConfigMessage(receiveChannel, { returnConfig: true });
            }
          }
        }

        await peerConnection.setRemoteDescription(candidateOfferDetails);
        let answerDescription = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answerDescription);

        let answer = {
          type: answerDescription.type,
          sdp: answerDescription.sdp,
        }

        await myCandidate.collection('offers').doc(newCandidateId).set(answer);

        peerConnection.ontrack = (e) => {
          console.log('OnTrack Fired');
          console.log(e);
          if (e.streams.length > 0) {
            let remoteStream = new MediaStream();
            e.streams[0].getTracks().forEach((track) => {
              remoteStream.addTrack(track);
            });
            newVideo(remoteStream, newCandidateId);
          }
        }
        // Assume that the track already exists.
        let remoteStream = peerConnection.getRemoteStreams()[0];
        newVideo(remoteStream, newCandidateId);

        peerConnection.newCandidateId = newCandidateId;
        peerConnection.onconnectionstatechange = peerConnectionStateChanged;
        peerConnectionList[newCandidateId] = peerConnection;

        newCandidateFirestoreListener = singleCandidate.ref.collection('offers').doc(myCandidate.id).collection('details').onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type == 'added') {
              let data = change.doc.data();
              peerConnectionList[newCandidateId].addIceCandidate(new RTCIceCandidate(data));
            }
          })
        });
        peerConnectionList[newCandidateId].unsetFirestoreListener = newCandidateFirestoreListener;
      }
    })();
  });

  pendingPeerConnection = createPeerConnection();
  await generateOffer(pendingPeerConnection, myCandidate);

  listenForCandidates(candidateList, myCandidate);
}

let listenForCandidates = (candidateCollection, myCandidate) => {
  candidateCollection.onSnapshot((snapshot) => {
    (async () => {
      for (let change of snapshot.docChanges()) {
        if (change.type == 'added' && change.doc.id !== myCandidate.id && peerConnectionList[change.doc.id] == undefined) {
          let candidateDdata = (await change.doc.ref.collection('offers').doc(myCandidate.id).get()).data();
          if (candidateDdata == undefined) {
            // Candidate is not Ready Yet, attach a listener and then update it.
            let candidateDetails = change.doc.ref.collection('offers').doc(myCandidate.id);
            console.log('INIT');
            let unsub = candidateDetails.onSnapshot((anotherChange) => {
              (async () => {
                if (anotherChange.data() !== undefined) {
                  let candidateDoc = await candidateCollection.doc(change.doc.id);
                  updateCandidateConnection(candidateDoc, myCandidate, unsub);
                }
              })();
            });
          } else {
            updateCandidateConnection(change.doc.ref, myCandidate, null);
          }

        }
      }
    })();
  });
}

let peerConnectionStateChanged = async (event) => {
  let connectionState = event.target.connectionState;
  if (connectionState == 'disconnected' || connectionState == 'closed' || connectionState == 'failed') {
    let newCandidateId = event.target.newCandidateId;
    await event.target.unsetFirestoreListener();
    delete peerConnectionList[newCandidateId];
    delete dataChannelList[newCandidateId];
    if (document.getElementById(newCandidateId)) {
      document.getElementById(newCandidateId).remove();
    }
  }
}

let updateCandidateConnection = async (newCandidateDoc, myCandidate, unSubscribeFn) => {
  let newCandidateId = newCandidateDoc.id;
  let newCandidateOfferDetails = newCandidateDoc.collection('offers').doc(myCandidate.id).collection('details');
  let candidateDetails = await newCandidateDoc.collection('offers').doc(myCandidate.id).get();
  let answerDescription = new RTCSessionDescription(candidateDetails.data());
  pendingPeerConnection.setRemoteDescription(answerDescription);

  let myOfferDetails = myCandidate.collection('offers').doc(newCandidateId).collection('details');
  pendingICEDetails.forEach((singlePendingICEDetail) => {
    myOfferDetails.add(singlePendingICEDetail);
  });
  pendingPeerConnection.onicecandidate = (event) => {
    event.candidate && myOfferDetails.add(event.candidate.toJSON());
  }

  pendingPeerConnection.ontrack = (e) => {
    console.log('OnTrack Fired');
    console.log(e);
    if (e.streams.length > 0) {
      let remoteStream = new MediaStream();
      e.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
      playSound();
      newVideo(remoteStream, newCandidateId);
    }
  }

  pendingdataChannel.onmessage = (event) => {
    let message = JSON.parse(event.data);
    messageHandler(message, newCandidateId);
  };
  // pendingdataChannel.onopen = () => {
  //     console.log('Pending...', pendingdataChannel);
  //     pendingdataChannel.onopen = () => {
  //         console.log('Inner Call');
  //         if(pendingdataChannel.readyState == 'open') {
  //             sendConfigMessage(pendingdataChannel);
  //         }   
  //     }
  // }

  newCandidateFirestoreListener = newCandidateOfferDetails.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        let candidate = new RTCIceCandidate(change.doc.data());
        peerConnectionList[newCandidateId].addIceCandidate(candidate);
      }
    });
  });
  pendingPeerConnection.unsetFirestoreListener = newCandidateFirestoreListener;

  pendingPeerConnection.onconnectionstatechange = peerConnectionStateChanged;
  pendingPeerConnection.newCandidateId = newCandidateId;
  dataChannelList[newCandidateId] = pendingdataChannel;
  peerConnectionList[newCandidateId] = pendingPeerConnection;
  pendingPeerConnection = createPeerConnection();
  await generateOffer(pendingPeerConnection, myCandidate);

  if (unSubscribeFn != null) {
    unSubscribeFn();
  }
}

let sendConfigMessage = (dataChannel, options) => {
  let personVideo = document.getElementById("person1").getElementsByTagName('video')[0];
  let flipped = personVideo.classList.contains("flipped");
  let returnConfig = false;
  if (options?.returnConfig) {
    returnConfig = true;
  }
  let message = {
    video: {
      flipped: flipped,
    },
    action: {
      returnConfig: returnConfig,
    }
  };

  console.log('Config Message', message);

  dataChannel.send(JSON.stringify(message));
}

let messageHandler = (message, candidateId) => {
  let flipped = false;
  if (message?.video?.flipped) {
    flipped = true;
  }
  if (flipped) {
    document.getElementById(candidateId).classList.add('flipped');
  } else {
    document.getElementById(candidateId).classList.remove('flipped');
  }

  if (message?.action?.returnConfig) {
    sendConfigMessage(dataChannelList[candidateId]);
  }
}

let createPeerConnection = () => {
  let peerConnection = new RTCPeerConnection(servers);
  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  pendingdataChannel = peerConnection.createDataChannel("meta", {});
  console.log(pendingdataChannel);

  return peerConnection;
}

let playSound = () => {
  let audio = new Audio('deduction-588.mp3');
  audio.play();
}

let newVideo = (stream, candidateId) => {
  let videoElement = null;
  if (document.getElementById(candidateId)) {
    videoElement = document.querySelector("[id='" + candidateId + "'] > video");
  } else {
    let videoOverlay = document.createElement('div');
    videoOverlay.id = candidateId;
    videoOverlay.classList.add('overlay')
    videoHolder.appendChild(videoOverlay);
    videoElement = document.createElement('video');
    videoOverlay.appendChild(videoElement);
    videoOverlay.addEventListener('click', function () {
      makeBigVideo(this);
    }, false);
  }
  console.log(videoElement);
  videoElement.srcObject = stream;
  videoElement.onloadedmetadata = (e) => {
    videoElement.play();
  };
}

let changeVolume = (elem) => {
  audioVolume = elem.value;
  if (!isMuted) {
    gainNode.gain.value = elem.value;
  }
}

let changeMute = (elem) => {
  isMuted = !isMuted;
  if (isMuted) {
    elem.classList.add("disabled");
    gainNode.gain.value = 0;
  } else {
    elem.classList.remove("disabled");
    gainNode.gain.value = audioVolume;
  }
}

let getMoji = () => {
  let mojis = ['🤫', '😀', '😁', '😅', '😂', '🤣', '😇', '🤪', '😜', '🤓', '🧐', '😎', '🥸', '🥳', '🤩', '🤑', '👨🏻‍💻'];
  return mojis[Math.floor(Math.random() * mojis.length)]
}

let changeVideo = async (elem) => {
  if (isScreenShare) {
    return;
  }
  let deviceId = elem.value;
  let videoTrack = localStream.getVideoTracks()[0];
  let newVideoTrack = null;
  let tempStream = null
  let flipped = false;

  if (deviceId == "") {
    let canvas = document.getElementById('blankCanvas');
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#BDBDBD";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "80px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(getMoji(), 110, 110);
    tempStream = canvas.captureStream(30);
    newVideoTrack = tempStream.getVideoTracks()[0];
  } else {
    let mediaProp = {
      audio: false,
      video: {
        deviceId: deviceId
      }
    };

    if (!navigator.mediaDevices.getUserMedia) {
      alert('No Permissions');
    }
    try {
      tempStream = await navigator.mediaDevices.getUserMedia(mediaProp);
      newVideoTrack = tempStream.getVideoTracks()[0];
    } catch (e) {
      console.log('ERRORRRR');
      console.log(e);
    }
    flipped = true;
  }
  await localStream.addTrack(newVideoTrack);
  videoTrack.stop();
  localStream.removeTrack(videoTrack);
  const sUsrAg = navigator.userAgent;
  let video = document.getElementById('person1').getElementsByTagName('video')[0];
  video.srcObject = localStream;

  Object.values(peerConnectionList).forEach((singlePeerConnection) => {
    var sender = singlePeerConnection.getSenders().find(function (s) {
      return s.track.kind == videoTrack.kind;
    });

    console.log('found sender:', sender);
    sender.replaceTrack(newVideoTrack);
  });
  tempStream.getTracks().forEach((singleTrack) => {
    tempStream.removeTrack(singleTrack);
  });
  Object.values(dataChannelList).forEach((singleDataChannel) => {
    let message = {
      video: {
        flipped: flipped,
      }
    }

    singleDataChannel.send(JSON.stringify(message));
  });
  if (flipped) {
    document.getElementById('person1').classList.add('flipped');
  } else {
    document.getElementById('person1').classList.remove('flipped');
  }
}

let populateUI = () => {
  console.log(localStream.getVideoTracks()[0].getSettings());
  let videoDeviceId = localStream.getVideoTracks()[0].getSettings().deviceId;
  // console.log(videoDeviceId);
  videoInList.forEach(singleVideoIn => {
    let newOption = document.createElement('option');
    newOption.innerText = singleVideoIn.label;
    newOption.value = singleVideoIn.deviceId;
    if (videoDeviceId == newOption.value) {
      newOption.setAttribute('selected', 'selected');
    }
    document.getElementById('videInputSelect').appendChild(newOption);
  });
  //TODO: Finish it.
  //     audioInList  = [];
  // let audioOutList = [];
}

let shareScreen = async () => {
  let tempStream = null;
  let options = {
    video: {
      cursor: "always"
    },
  }

  try {
    tempStream = await navigator.mediaDevices.getDisplayMedia(options);
  } catch (err) {
    console.error("Error: " + err);
    return;
  }

  let videoTrack = localStream.getVideoTracks()[0];
  let newVideoTrack = tempStream.getVideoTracks()[0];

  newVideoTrack.onended = function () {
    isScreenShare = false;
    changeVideo(document.getElementById('videInputSelect'));
  };

  await localStream.addTrack(newVideoTrack);
  videoTrack.stop();
  localStream.removeTrack(videoTrack);
  let video = document.getElementById('person1');
  video.srcObject = localStream;

  Object.values(peerConnectionList).forEach(function (singlePeerConnection) {
    var sender = singlePeerConnection.getSenders().find(function (s) {
      return s.track.kind == videoTrack.kind;
    });

    console.log('found sender:', sender);
    sender.replaceTrack(newVideoTrack);
  });
  tempStream.getTracks().forEach((singleTrack) => {
    tempStream.removeTrack(singleTrack);
  });

  document.getElementById('person1').classList.remove('flipped');

  Object.values(dataChannelList).forEach((singleDataChannel) => {
    let message = {
      video: {
        flipped: false,
      }
    }

    singleDataChannel.send(JSON.stringify(message));
  });

  isScreenShare = true;
}

let autoJoinCall = () => {
  let search = location.search.substring(1);
  let params = new URLSearchParams(search);
  let callId = params.get("call");
  if (callId != null) {
    document.getElementById('call_id').value = callId;
    joinCall();
  }
}

let makeBigVideo = (elem) => {
  if (!elem.classList.contains('bigVideo')) {
    let bigVideos = document.querySelectorAll('.bigVideo');
    bigVideos.forEach((singleElement) => {
      singleElement.classList.remove('bigVideo');
    });
    elem.classList.add('bigVideo');
  } else {
    elem.classList.remove('bigVideo');
  }
  // console.log('Element', elem);
}