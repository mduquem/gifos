class UX {
   constructor() {
      this.currentStep = 1;
      this.renderedCard = null;
   }

   switchTheme() {
      const logoImg = document.getElementById('logo');

      this.dark = !this.dark;
      if (this.dark) {
         document.documentElement.setAttribute('data-theme', 'dark');
         logoImg.removeAttribute('src');
         logoImg.setAttribute('src', 'assets/img/gifOF_logo_dark.png');
      } else {
         document.documentElement.setAttribute('data-theme', 'light');
         logoImg.removeAttribute('src');
         logoImg.setAttribute('src', 'assets/img/gifOF_logo.png');
      }
   }

   addStep() {
      this.currentStep += 1;
   }

   deleteStep() {
      this.currentStep -= 1;
   }

   startRecording() {
      const card = document.getElementById('card-container');
      card.innerHTML = `
            <div class="video-output-group">
              <video class="video-output" id="video-output"></video>
            </div>
     `;
   }
}
