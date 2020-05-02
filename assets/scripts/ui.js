// DOM Handler for the Home Page

class UI {
   constructor(url, name, key) {
      this.url = url;
      this.name = name;
      this.key = key;
      this.dark = false;
      this.pagination = 0;
      this.giphy = new Giphy();
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
         listItem.textContent = `${element}`;
         listItem.className = 'suggestions-card-item';
         listItem.setAttribute('id', 'suggestion-item');
         resultList.appendChild(listItem);
      }
      suggestionsOutput.appendChild(resultList);
      setTimeout(() => {
         suggestionsOutput.innerHTML = '';
      }, 10000);
   }

   paintSuggestionsImage(data) {
      console.log(data);
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

      console.log(`${this.giphy.getSearchResults(title)}`);

      suggestionsImage.insertBefore(listItem, suggestionsImage.lastElementChild);
      const suggBtn = document.getElementById('suggestions-btn');
      suggBtn.addEventListener('click', () => {
         this.giphy.getSearchResults(title).then((res) => {
            this.paintSearchResults(res.gifData);
         });
      });
   }

   paintSearchResults(data) {
      console.log(data);
      const output = document.getElementById('suggestions');
      const outputList = document.createElement('ul');
   }

   clearProfile() {}
}
