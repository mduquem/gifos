class UI {
   constructor(url, name, key) {
      this.url = url;
      this.name = name;
      this.key = key;
      this.dark = false;
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

      for (let index = 0; index < 4; index++) {
         const element = data[index];
         const listItem = document.createElement('li');
         resultList.appendChild(listItem);

         listItem.innerHTML = `
             <img class="trending-image" src=${element.images.downsized.url} width=${element.images.downsized.width} height=${element.images.downsized.height}  />
       `;
      }
      output.appendChild(resultList);
   }

   paintRandomGifs(data) {
      data = data.randomData;
      const output = document.getElementById('suggestions-output');

      console.log(data);
      for (let index = 0; index < data.length; index++) {
         const element = data[index];
         console.log(element);
         const url = element.data.images.downsized.url;
         const width = element.data.images.downsized.width;
         const height = element.data.images.downsized.height;

         const newImage = document.createElement('img');
         newImage.setAttribute('src', `${url}`);
         newImage.style.width = width;
         newImage.style.height = height;
         output.insertBefore(newImage, output.firstElementChild);
      }
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
         resultList.appendChild(listItem);
      }
      suggestionsOutput.appendChild(resultList);
      setTimeout(() => {
         suggestionsOutput.innerHTML = '';
      }, 1000000000);
   }

   clearProfile() {}
}
