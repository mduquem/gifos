class Browser {
   constructor() {
      this.video = document.getElementById('video-output');
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
      try {
         this.stream = await navigator.mediaDevices.getUserMedia(constraints);
         // /* use the stream */
         this.video.srcObject = this.stream;
         this.video.play();
         return this.stream;
      } catch (err) {
         /* handle the error */
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
            console.log(this.file, 'form');
            localStorage.setItem('gif', this.file.get());
            console.log('finish');
         });
         console.log(form);
         return form;
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
            `https://api.upload.giphy.com/v1/gifs?api_key=${this.apiKey}`,
            config
         );
         return uploadResponse;
      } catch (err) {}
   }
}
