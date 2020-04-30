class UI {
   async handleVideo(stream) {
      const recorder = RecordRTC(stream, {
         type: 'gif',
         frameRate: 1,
         quality: 10,
         width: 360,
         hidden: 240,
         onGifRecordingStarted: function () {
            console.log('it started');
         },
      });
      recorder.startRecording();
      return recorder;

      // /* use the stream */
      // const video = document.getElementById('video-output');
      // // video.setAttribute('src', window.URL.createObjectURL(stream));
      // video.srcObject = stream;
   }

   async stopRecording(callbackFunction) {
      recorder.stopRecording(() => {
         console.log('recording stopped');
         let blob = recorder.getBlob();
         let form = new FormData();
         form.append('file', blob, 'myGif.gif');
         invokeSaveAsDialog(blob);
         console.log(form.get('file'));
         return form.get('file');
      });
      callbackFunction();
   }
}
