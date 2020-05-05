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
               .then((res) => {
                  console.log(res);
               })
               .catch((err) => {});
         });
      })
      .catch((err) => {});
});

window.onload = () => {
   ui.switchTheme();
};
