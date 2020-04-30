const browser = new Browser();

const UIVideo = new UI();
const giphy = new Giphy();

const createNewGif = document.getElementById('create-gif-btn');
createNewGif.addEventListener('click', () => {
   browser
      .getStream()
      .then((res) => {
         UIVideo.handleVideo(res);
      })
      .catch((err) => console.log(err));
});

const stopRecording = document.getElementById('stop-recording');
stopRecording.addEventListener('click', () => {
   console.log('Hola desde el stopRecording');
   fileInClient = true;
   UIVideo.stopRecording(() => console.log('hola desde el callback!!!!!!!!'));
});

const uploadBtn = document.getElementById('upload-gif');
uploadBtn.addEventListener('click', () => {
   console.log('inside upload');

   if (true) {
      giphy.uploadGif();
   }
});
