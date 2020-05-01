const browser = new Browser();
const giphy = new Giphy();

const startUpload = document.getElementById('start');
startUpload.addEventListener('click', () => {
   browser
      .getStream()
      .then((res) => {})
      .catch((err) => {});
});

const createNewGif = document.getElementById('create-gif-btn');
createNewGif.addEventListener('click', () => {
   browser
      .startRecording()
      .then((res) => {
         file = res;
         return res;
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
