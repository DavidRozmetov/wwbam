const webCamElement = document.getElementById("webCam");
const canvasElement = document.getElementById("canvas");

const webcam = new Webcam(webCamElement, "user", canvasElement);
let isCameraOn = false;

document.addEventListener("keydown", function (event) {
  if (event.key === "/" && event.metaKey) {
    if (!isCameraOn) {
      webcam.start();
      webCamElement.style.width = "90vw";
      webCamElement.style.height = "90vh";
      webCamElement.style.marginLeft = "5vw";
      webCamElement.style.marginTop = "3vh";
      webCamElement.style.visibility = "visible";
      webCamElement.style.opacity = ".85";
      isCameraOn = true;
    } else {
      webcam.stop();
      isCameraOn = false;
      webCamElement.style.visibility = "hidden";
    }
  }
});
