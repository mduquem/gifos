class UI {
   handleVideo(stream) {
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

      setTimeout(() => {
         recorder.stopRecording(() => {
            console.log('recording stopped');
            let blob = recorder.getBlob();
            let form = new FormData();
            form.append('file', blob, 'myGif.gif');
            invokeSaveAsDialog(blob);
            console.log(form.get('file'));
            localStorage.setItem('gif1', JSON.stringify(blob));
         });
      }, 5000);

      // /* use the stream */
      // const video = document.getElementById('video-output');
      // // video.setAttribute('src', window.URL.createObjectURL(stream));
      // video.srcObject = stream;
   }
}
