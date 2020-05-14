const browser = new Browser();
const giphy = new Giphy();
const ui = new UI();

const startUpload = document.getElementById('first-success-btn');
startUpload.addEventListener('click', () => {
   browser
      .getStream()
      .then((res) => {
         const createNewGif = document.getElementById('create-gif-btn');
         createNewGif.addEventListener('click', () => {
            browser
               .startRecording()
               .then((res) => {})
               .catch((err) => {});
         });
      })
      .catch((err) => {});
});

window.onload = () => {
   ui.switchTheme();
   ui.paintMyGifs();
};
