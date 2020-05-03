const browser = new Browser();
const giphy = new Giphy();
const ui = new UI();
let currentStep = 1;

const startUpload = document.getElementById('first-success-btn');
startUpload.addEventListener('click', () => {
   browser
      .getStream()
      .then((res) => {
         currentStep = 2;
         const createNewGif = document.getElementById('create-gif-btn');
         createNewGif.addEventListener('click', () => {
            browser
               .startRecording()
               .then()
               .catch((err) => {});
         });
      })
      .catch((err) => {});
});

const stopRecording = document.getElementById('stop-recording');
stopRecording.addEventListener('click', () => {
   browser
      .stopRecording()
      .then((res) => {})
      .catch((err) => {});
});

const uploadBtn = document.getElementById('upload-gif');
uploadBtn.addEventListener('click', () => {
   browser
      .uploadGif()
      .then((res) => {})
      .catch((err) => {});
});

window.onload = () => {
   ui.switchTheme();
};
