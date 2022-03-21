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