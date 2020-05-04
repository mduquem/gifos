class Browser {
   constructor() {
      this.card = document.getElementById('card-container');

      this.apiKey = 'EVXJhVK8O4M0zOGlqExmwJZXNiX9rMTE';

      this.stream = null;
      this.recorder = null;
      this.file = null;
   }

   async getStream() {
      const constraints = {
         audio: false,
         video: {
            height: { max: 480 },
         },
      };
      this.card.innerHTML = `
      <div class="video-output-group">
    
            <video class="video-output" id="video-output">
            </video>
            <div class="output-video-btn" id="btn-group">
               <div id="video-timer"></div>
               <button id="create-gif-btn" class="main-btn overlapped-btn" style="z-index: 200">Capturar</button>
            </div>

         </div>
       

      
`;
      try {
         this.stream = await navigator.mediaDevices.getUserMedia(constraints);
         // /* use the stream */
         const video = document.getElementById('video-output');
         video.srcObject = this.stream;
         video.play();

         return this.stream;
      } catch (err) {
         /* handle the error */
         return err;
      }
   }

   stopRecording(recorder) {
      console.log('hello from stop recoding');
      const video = document.getElementById('video-output');
      const btnGroup = document.getElementById('btn-group');

      const repeteBtn = document.createElement('button');
      repeteBtn.innerText = 'Repetir Captura';
      repeteBtn.style.zIndex = '900px';
      repeteBtn.classList.add('main-btn', 'overlapped-btn');

      const uploadBtn = document.createElement('button');
      uploadBtn.innerText = 'Subir Guifo';
      uploadBtn.style.zIndex = '900px';
      uploadBtn.classList.add('main-btn', 'overlapped-btn-right');
      try {
         recorder.stopRecording(() => {
            let blob = recorder.getBlob();
            let file = new FormData();
            file.append('file', blob, 'myGif.gif');
         });
         btnGroup.replaceChild(uploadBtn, btnGroup.lastElementChild);

         btnGroup.insertBefore(repeteBtn, btnGroup.lastElementChild);

         video.pause();
         return file;
      } catch (err) {
         video.pause();

         return err;
      }
   }

   async startRecording() {
      const btnGroup = document.getElementById('btn-group');

      const newBtn = document.createElement('button-group');
      newBtn.innerHTML = '<img src="../assets/svg/recording.svg" alt="Grabando" />Detener';
      newBtn.style.zIndex = '900px';
      newBtn.classList.add('main-btn', 'overlapped-btn', 'stop-btn');

      const recorder = RecordRTC(this.stream, {
         type: 'gif',
         frameRate: 1,
         quality: 10,
         width: 360,
         hidden: 240,

         onGifRecordingStarted: function () {
            btnGroup.replaceChild(newBtn, btnGroup.lastElementChild);
         },
      });

      try {
         recorder.startRecording();
         newBtn.onclick = () => {
            this.stopRecording(recorder);
         };

         return recorder;
      } catch (err) {
         console.log(err);
         return err;
      }
   }

   async uploadGif() {
      const config = {
         method: 'POST',
         body: this.body,
      };

      try {
         const uploadResponse = await fetch(
            `https://upload.giphy.com/v1/gifs?api_key=${this.apiKey}&file${this.body}`,
            config
         );
         return uploadResponse;
      } catch (err) {}
   }
}
