export const getMediaStream = async () => {
  await navigator.mediaDevices.enumerateDevices();
  const mediaProp = {
    audio: true,
    video: {
      deviceId: 'default',
    }
  };

  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia(mediaProp);
    return mediaStream;
  } catch (err) {
    throw new Error(err);
  }
}

export const getMediaDeviceList = async () => {
  const audioInList  = [];
  const audioOutList = [];
  const videoInList  = [];
  const deviceList   = await navigator.mediaDevices.enumerateDevices();
  deviceList.forEach((singleDevice) => {
    if (singleDevice.kind === 'audiooutput') {
      audioOutList.push(singleDevice);
    } else if (singleDevice.kind === 'audioinput') {
      audioInList.push(singleDevice);
    } else if (singleDevice.kind === 'videoinput') {
      videoInList.push(singleDevice);
    }
  });
  return [audioInList, audioOutList, videoInList];
};

export const getNewStream = async (deviceId) => {
  const mediaProp = {
    audio: false,
    video: {
      deviceId: deviceId
    }
  };

  try {
    const tempStream = await navigator.mediaDevices.getUserMedia(mediaProp);
    return tempStream;
  } catch (err) {
    throw new Error(err)
  }
}

export const servers = {
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

export const getNewPeerConnection = () => {
  const peerConnection = new RTCPeerConnection(servers);
  return peerConnection;
}

export const generateOffer = async (peerConnection) => {
  let offerDescription   = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type
  };
  return offer;
}

// let generateOffer = async (peerConnection, CandidateDBReference) => {
//   pendingICEDetails = [];
//   let documents = await CandidateDBReference.collection('offers').doc('pending').collection('details').get();
//   documents.forEach((singleDoc) => {
//       singleDoc.ref.delete();
//   });
//   await CandidateDBReference.collection('offers').doc('pending').delete();
//   let myCandidateOfferDetails = CandidateDBReference.collection('offers').doc('pending').collection('details');
  
  
  

//   await CandidateDBReference.set(offer);
// }

// export const getICECandidates = () => {



//   pendingPeerConnection = createPeerConnection();

//   let callDoc = db.collection("offers").doc();
//   let callID = callDoc.id;
//   document.getElementById('call_id').value = callID;

//   window.history.pushState('', "Call", `?call=${callID}`);

//   let candidates = callDoc.collection('candidates');
//   let myCandidate = candidates.doc();

//   await generateOffer(pendingPeerConnection, myCandidate);

//   listenForCandidates(candidates, myCandidate);
// }

// const createPeerConnection = () => {
  
//   localStream.getTracks().forEach((track) => {
//     peerConnection.addTrack(track, localStream);
//   });

//   pendingdataChannel = peerConnection.createDataChannel("meta", {});
//   console.log(pendingdataChannel);

//   return peerConnection;
// }