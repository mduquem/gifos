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
      for (let index = 0; index < data.length; index++) {
         const element = data[index];
         results.push(element);
         const listItem = document.createElement('li');

         listItem.innerHTML = `
             <iframe src=${element.images.downsized.url} width=${element.images.downsized.width} height=${element.images.downsized.height} style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
       `;
         resultList.appendChild(listItem);
      }
      document.getElementById('output').appendChild(resultList);

      return results;
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
