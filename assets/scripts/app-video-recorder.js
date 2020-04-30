const browser = new Browser();

const UIVideo = new UI();

const createNewGif = document.getElementById('create-gif-btn');
createNewGif.addEventListener('click', () => {
   browser
      .getStream()
      .then((res) => {
         UIVideo.handleVideo(res);
      })
      .catch((err) => console.log(err));
});
