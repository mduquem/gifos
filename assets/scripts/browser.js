class Browser {
   constructor() {
      this.permision = 'permission';
   }

   async getStream() {
      let stream = null;
      const constraints = {
         audio: false,
         video: {
            height: { max: 480 },
         },
      };
      try {
         stream = await navigator.mediaDevices.getUserMedia(constraints);
         console.log(stream);
         return stream;
      } catch (err) {
         /* handle the error */
         return err;
      }
   }
}
