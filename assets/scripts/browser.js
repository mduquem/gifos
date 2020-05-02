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
            <button id="create-gif-btn" class="main-btn overlapped-btn" style="z-index: 200">Capturar</button>
         </div>
       

      
`;
      try {
         this.stream = await navigator.mediaDevices.getUserMedia(constraints);
         // /* use the stream */
         const video = document.getElementById('video-output');
         video.srcObject = this.stream;
         video.play();

         console.log(this.video, this.stream);
         return this.stream;
      } catch (err) {
         /* handle the error */
         console.log(err);
         return err;
      }
   }

   async startRecording() {
      const recorder = RecordRTC(this.stream, {
         type: 'gif',
         frameRate: 1,
         quality: 10,
         width: 360,
         hidden: 240,

         onGifRecordingStarted: function () {},
      });
      try {
         this.recorder = await recorder.startRecording();
         return this.recorder;
      } catch (err) {
         return err;
      }
   }

   async stopRecording() {
      const recorder = this.recorder;
      try {
         this.stream.getVideoTracks().forEach((track) => {
            track.stop();
         });
         await recorder.stopRecording(() => {
            let blob = this.recorder.getBlob();
            this.file = new FormData();
            this.file.append('file', blob, 'myGif.gif');
            localStorage.setItem('gif', this.file.get('file'));
         });
         return this.file;
      } catch (err) {
         return err;
      }
   }

   onStopRecording() {}

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
