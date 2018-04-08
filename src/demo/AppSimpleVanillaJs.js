import CameraPhoto from '../lib';
import './styles.css';

// get video and image elements
let videoElement = document.getElementById('videoId');
let imgElement = document.getElementById('imgId');

// get buttons elements
let takePhotoButtonElement = document.getElementById('takePhotoButtonId');
let stopCameraButtonElement = document.getElementById('stopCameraButtonId');
let startMaxResolutionButtonElement = document.getElementById('startMaxResolutionId');
let cameraSettingElement = document.getElementById('cameraSettingsId');

// instantiate CameraPhoto with the videoElement
let cameraPhoto = new CameraPhoto(videoElement);

// start the camera with prefered environment facingMode ie. ()
// if the environment facingMode is not avalible, it will fallback
// to the default camera avalible.
cameraPhoto.startCamera(cameraPhoto.FACING_MODES.ENVIRONMENT)
  .then(() => {
    console.log('Camera started !');
  })
  .catch((error) => {
    console.error('Camera not started!', error);
  });

// function called by the buttons.
function takePhoto () {
  let dataUri = cameraPhoto.getDataUri();
  imgElement.src = dataUri;
}

function showSettings () {
  let settings = cameraPhoto.getSettings();

  // by default is no camera...
  let innerHTML = 'No camera';
  if (settings) {
    let {aspectRatio, frameRate, height, width} = settings;
    innerHTML = `
      aspectRatio:${aspectRatio}
      frameRate: ${frameRate}
      height: ${height}
      width: ${width}
    `;
  }
  cameraSettingElement.innerHTML = innerHTML;
}

function stopCamera () {
  cameraPhoto.stopCamera()
    .then(() => {
      console.log('Camera stoped!');
    })
    .catch((error) => {
      console.log('No camera to stop!:', error);
    });
}

function startCameraMaxResolution () {
  cameraPhoto.startCameraMaxResolution(cameraPhoto.FACING_MODES.ENVIRONMENT)
    .then(() => {
      console.log('Camera started with maximum resoluton !');
    })
    .catch((error) => {
      console.error('Camera not started!', error);
    });
}

setInterval(() => {
  showSettings();
}, 500);

// bind the buttons to the right functions.
takePhotoButtonElement.onclick = takePhoto;
stopCameraButtonElement.onclick = stopCamera;
startMaxResolutionButtonElement.onclick = startCameraMaxResolution;

// setTimeout(() => {
//   startCameraMaxResolution();
// }, 5000);
