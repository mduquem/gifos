// DOM Handler for the Home Page

class UI {
   constructor(url, name, key) {
      this.url = url;
      this.name = name;
      this.key = key;
      this.giphy = new Giphy();
      this.theme = 'dark';
      this.showToggle = false;
   }

   onHoverLogo() {
      const logoImg = document.getElementById('logo');

      if (this.theme == 'day') {
         logoImg.setAttribute('src', 'assets/img/gifOF_logo_dark.png');
      } else if (this.theme == 'dark') {
         logoImg.setAttribute('src', 'assets/img/gifOF_logo.png');
      }
   }

   unHoverLogo() {
      const logoImg = document.getElementById('logo');

      if (this.theme == 'dark') {
         logoImg.setAttribute('src', 'assets/img/gifOF_logo_dark.png');
      } else if (this.theme == 'day') {
         logoImg.setAttribute('src', 'assets/img/gifOF_logo.png');
      }
   }

   switchTheme() {
      const logoImg = document.getElementById('logo');

      const currentTheme = localStorage.getItem('theme');

      if (currentTheme === 'day') {
         this.theme = 'day';
      } else if (currentTheme === 'dark') {
         this.theme = 'dark';
      }

      if (this.theme != 'null' && this.theme == 'dark') {
         document.documentElement.setAttribute('data-theme', 'dark');
         logoImg.removeAttribute('src');
         logoImg.setAttribute('src', 'assets/img/gifOF_logo_dark.png');
      } else if (this.theme == 'day') {
         document.documentElement.setAttribute('data-theme', 'light');
         logoImg.removeAttribute('src');
         logoImg.setAttribute('src', 'assets/img/gifOF_logo.png');
      }
   }

   toggleSwitch() {
      const dayBtn = document.getElementById('day-theme');
      const darkBtn = document.getElementById('night-theme');

      this.showToggle = !this.showToggle;

      if (!this.showToggle) {
         dayBtn.style.visibility = 'hidden';
         darkBtn.style.visibility = 'hidden';
      } else if (this.showToggle) {
         dayBtn.style.visibility = 'visible';
         darkBtn.style.visibility = 'visible';
      }
   }

   switchToDay() {
      this.theme = 'day';
      localStorage.setItem('theme', 'day');
      this.switchTheme();
   }

   switchToNight() {
      this.theme = 'dark';
      localStorage.setItem('theme', 'dark');
      this.switchTheme();
   }

   paintTrendingGifs(data) {
      data = data.trendingData.data;
      const output = document.getElementById('trending-output');
      const resultList = document.createElement('ul');

      resultList.className = 'list-trending';

      for (let index = 0; index < data.length; index++) {
         const element = data[index];
         const listItem = document.createElement('li');
         resultList.appendChild(listItem);

         listItem.innerHTML = `
             <img class="trending-image" src=${element.images.downsized.url} width="auto" height=${element.images.downsized.height}  />
       `;
      }
      output.appendChild(resultList);
   }

   paintSuggestions(data) {
      const suggestionsOutput = document.getElementById('suggestions-output');
      const resultList = document.createElement('ul');
      resultList.className = 'result-list';

      suggestionsOutput.innerHTML = '';
      for (let index = 0; index < 3; index++) {
         const element = data[index].title;
         const listItem = document.createElement('li');

         const btnElement = document.createElement('button');
         btnElement.className = 'suggestion-item';

         btnElement.innerHTML = `${element}`;
         btnElement.setAttribute('id', 'suggestion-item');
         listItem.appendChild(btnElement);
         resultList.appendChild(listItem);

         btnElement.setAttribute('onclick', `this.giphy.getSearchResults(${element})`);
         btnElement.onclick = function () {
            this.giphy.getSearchResults(element).then((res) => {
               this.paintSearchResults(res.gifData.data);
            });
         };
      }
      suggestionsOutput.appendChild(resultList);
      setTimeout(() => {
         suggestionsOutput.innerHTML = '';
      }, 10000);
   }

   paintSuggestionsImage(data) {
      const suggestionsImage = document.getElementById('suggestions-card-image');
      const resultImageList = document.createElement('ul');
      resultImageList.className = 'result-list-image';
      const element = data.images.downsized.url;

      const title = data.title;

      const listItem = document.createElement('div');
      listItem.className = 'suggestions-image-item';
      listItem.innerHTML = `
      <div class="suggestions-card">

      <div class="suggestions-card-header">
        <p>#${title}</p> 
         <button class="btn-unstyled">
            <img src="assets/svg/button close.svg" alt="Boton cerrar" />
         </button>
      </div>

         <img class="suggestions-card-image" height="280px" width="280px" src=${element} alt="" />
        
         
         <button  id="suggestions-btn" class="suggestions-button">Ver más</button>

    
    
      <div class="suggestions-output" id="suggestions-output"></div>
   </div>
      
      
      `;

      suggestionsImage.insertBefore(listItem, suggestionsImage.lastElementChild);
      const suggBtn = document.getElementById('suggestions-btn');
      suggBtn.addEventListener('click', () => {
         this.giphy.getSearchResults(title).then((res) => {
            this.paintSearchResults(res.gifData.data);
         });
      });
   }

   paintSearchResults(data) {
      const output = document.getElementById('search-results');
      const listResult = document.createElement('ul');
      listResult.className = 'search-results-list';

      output.innerHTML = '';

      for (let index = 0; index < data.length; index++) {
         const url = data[index].images.downsized.url;

         const newListItem = document.createElement('ul');
         newListItem.innerHTML = `<li><img  width="280px" height="280px" src=${url} /></li>`;
         listResult.insertBefore(newListItem, listResult.firstElementChild);
      }

      output.appendChild(listResult);
   }

   paintVisits(data) {
      console.log('hello from paintvisitis', data);
      const output = document.getElementById('visit-counter');
      output.innerHTML = `
      ${data.totalCount}
      `;
   }

   clearProfile() {}
}
