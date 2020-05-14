const ui = new UI();
const giphy = new Giphy();
const browser = new Browser();

const toggleSwitchBtn = document.querySelector('#theme-switch');
toggleSwitchBtn.addEventListener('click', () => {
   ui.toggleSwitch();
});

const searchInput = document.getElementById('search-bar');
searchInput.addEventListener('keyup', (event) => {
   let userText = event.target.value;

   userText = userText.replace(/\s/, '+');
   userText = userText.replace(/GIF/, '');
   console.log(userText);

   const searchBtn = document.getElementById('search-btn');

   if (userText != '') {
      searchBtn.classList.add('active-search');

      giphy.getSearchResults(userText).then((data) => {
         ui.paintSuggestions(data.gifData.data);
      });
   } else {
      searchBtn.classList.remove('active-search');

      ui.clearProfile();
   }
});

const searchEvent = document.getElementById('search-btn');

searchEvent.addEventListener('click', (event) => {
   const searchInput = document.getElementById('search-bar').value;
   event.preventDefault();
   if (searchInput != '') {
      giphy.getSearchResults(searchInput).then((res) => {
         if (res.gifData.pagination.total_count == 0) {
         }
         ui.paintSearchResults(res.gifData.data);
      });

      giphy.getRelatedResults(searchInput).then((res) => {});
   }
});

const dayBtn = document.getElementById('day-theme');
dayBtn.addEventListener('click', () => {
   ui.switchToDay();
});

const nightBtn = document.getElementById('night-theme');
nightBtn.addEventListener('click', () => {
   ui.switchToNight();
});

const logo = document.getElementById('logo-anchor');
logo.addEventListener('mouseenter', () => {
   ui.onHoverLogo();
});

logo.addEventListener('mouseleave', () => {
   ui.unHoverLogo();
});

window.onload = () => {
   ui.switchTheme();
   giphy.getTrendingResults().then((res) => {
      ui.paintTrendingGifs(res);
   });
   giphy.getRandomResults().then((res) => {
      // ui.paintRandomGifs(res.randomData.data);
      ui.paintSuggestionsImage(res.randomData.data);

      // ui.paintRandomGifs(res.randomData.data);
   });
   giphy.getRandomResults().then((res) => {
      // ui.paintRandomGifs(res.randomData.data);
      ui.paintSuggestionsImage(res.randomData.data);

      // ui.paintRandomGifs(res.randomData.data);
   });
   giphy.getRandomResults().then((res) => {
      // ui.paintRandomGifs(res.randomData.data);
      ui.paintSuggestionsImage(res.randomData.data);

      // ui.paintRandomGifs(res.randomData.data);
   });
   giphy.getRandomResults().then((res) => {
      // ui.paintRandomGifs(res.randomData.data);
      ui.paintSuggestionsImage(res.randomData.data);

      // ui.paintRandomGifs(res.randomData.data);
   });
};
