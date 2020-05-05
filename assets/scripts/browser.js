class Browser {
   constructor() {
      this.card = document.getElementById('card-container');
      this.apiKey = 'EVXJhVK8O4M0zOGlqExmwJZXNiX9rMTE';

      this.stream = null;
      this.recorder = null;
      this.file = null;
      this.giphy = new Giphy();
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
    
      <div class="suggestions-card-header">
      <p id="header">Un Chequeo Antes de Empezar</p> 
       <button class="btn-unstyled">
          <img src="assets/svg/button close.svg" alt="Boton cerrar" />
       </button>
    </div>
            <video class="video-output" id="video-output">
            </video>
            <div class="output-video-btn" id="btn-group">
               <div id="video-timer"></div>
               <button id="create-gif-btn" class="main-btn overlapped-btn" style="z-index: 200">

                <img  src="../assets/svg/camera.svg" alt="Icono de una cámara" />Capturar</button>
            </div>

         </div>
       

      
`;
      try {
         this.stream = await navigator.mediaDevices.getUserMedia(constraints);
         const video = document.getElementById('video-output');
         video.srcObject = this.stream;
         video.play();

         return this.stream;
      } catch (err) {
         /* handle the error */
         return err;
      }
   }

   async startRecording() {
      document.getElementById('header').innerText = 'Capturando Tu Guifo';
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
            uploadBtn.onclick = () => {
               giphy
                  .uploadGif(file)
                  .then((res) => {
                     console.log(file.get('file'));
                     localStorage.setItem(`gif${res.gifId}`, JSON.stringify(blob));

                     this.card.innerHTML = `
                     <div class="search-input-header">     <p>Guifo creado con éxito</p></div>
                     <div>
                     </div>
             <div class="info-group">
             <button class="main-btn" id="copy-gif">Copiar enlace</button>
             <button class="main-btn" id="download-gif">Descargar gif</button>
             </div>
              
                  `;
                     const copyBtn = document.getElementById('copy-gif');
                     const downloadBtn = document.getElementById('download-gif');

                     copyBtn.onclick = () => {
                        navigator.clipboard.writeText(`https://giphy.com/gifs/${res.gifId}`);
                     };

                     downloadBtn.onclick = () => {
                        invokeSaveAsDialog(blob);
                     };
                  })
                  .catch((err) => {
                     this.card.innerHTML = `Erro al crear tu guifo: ${err}`;
                  });
               this.stream.getTracks().forEach((track) => {
                  track.stop();
               });
               this.card.innerHTML = `
               <div class="search-input-header"><p>Subiendo Guifo
               </p></div>
                  <div class="uploading-group">
                  <img alt="icono de globo" src="../assets/img/globe_img.png"/>

                 <strong>Estamos suubiendo tu guifo..</strong> .
                  </div>

                  <span class="loader"></span>
              

               <div>
              
               </div>
               
               `;
            };

            repeteBtn.onclick = () => {
               this.getStream()
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
            };
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
}
