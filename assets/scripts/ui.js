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

      if (data) {
         for (let index = 0; index < 3; index++) {
            let element = data[index].title;

            const listItem = document.createElement('li');

            const btnElement = document.createElement('button');
            btnElement.className = 'suggestion-item';

            btnElement.innerHTML = `${element}`;
            btnElement.setAttribute('id', 'suggestion-item');
            listItem.appendChild(btnElement);
            resultList.appendChild(listItem);

            btnElement.onclick = () => {
               this.giphy.getSearchResults(element).then((res) => {
                  this.paintSearchResults(res.gifData.data);
               });
            };
         }
         suggestionsOutput.appendChild(resultList);
         setTimeout(() => {
            suggestionsOutput.innerHTML = '';
         }, 10000);
      } else {
         alert('No Results. Search Again');
      }
   }

   paintSuggestionsImage(data) {
      const suggestionsImage = document.getElementById('suggestions-card-image');
      const resultImageList = document.createElement('ul');
      resultImageList.className = 'result-list-image';
      const element = data.images.downsized.url;

      let title = data.title;

      title = title.replace(/GIF/, '');
      title = title.replace(/by(.*)/, '');
      title = title.replace(/ /, '');
      title = title && title.charAt(0).toUpperCase() + title.substring(1);

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
        
         
         <button  id="suggestions-btn" class="suggestions-btn">Ver más</button>

    
    
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
      const tagsResult = document.createElement('ul');
      tagsResult.className = 'tags-results-list';
      listResult.className = 'search-results-list';

      output.innerHTML = '';

      for (let index = 0; index < data.length; index++) {
         const url = data[index].images.downsized.url;

         const newListItem = document.createElement('li');
         newListItem.innerHTML = `<img class="trending-image"  width="280px" height="280px" src=${url} />`;
         listResult.insertBefore(newListItem, listResult.lastElementChild);
      }

      output.appendChild(listResult);
   }

   paintMyGifs() {
      let keys = Object.keys(localStorage);
      const listResult = document.createElement('ul');
      listResult.className = 'search-results-list';

      let idsString = '';

      keys = keys.filter((key) => {
         return key.substring(0, 3) === 'gif';
      });

      console.log(keys);
      for (let index = 0; index < keys.length; index++) {
         let element = keys[index];
         element = element.split('gif').pop();
         console.log(element);
         idsString += index === keys.length ? `${element.trim()},` : `${element.trim()}`;
         const listItem = document.createElement('li');
         listItem.innerHTML = `<iframe class="trending-image" src="https://giphy.com/embed/${element.trim()}" width="280px" height="280px" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`;
         listResult.appendChild(listItem);
      }

      this.giphy
         .getGifsById(idsString)
         .then((res) => {
            console.log(res);
         })
         .catch((err) => {
            console.log(err);
         });

      const output = document.getElementById('gifs-output');
      output.innerHTML = `
      <div class="suggestions-header">
         Mis Guifos
      </div>

      `;
      output.appendChild(listResult);
   }
}
