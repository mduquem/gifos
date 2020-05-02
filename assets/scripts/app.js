const ui = new UI();
const giphy = new Giphy();
const browser = new Browser();

const toggleSwitch = document.querySelector('#theme-switch');
toggleSwitch.addEventListener('click', () => {
   ui.switchTheme();
});

const searchInput = document.getElementById('search-bar');
searchInput.addEventListener('keyup', (event) => {
   const userText = event.target.value;

   if (userText != '') {
      giphy.getSearchResults(userText).then((data) => {
         ui.paintSuggestions(data.gifData.data);
      });
   } else {
      ui.clearProfile();
   }
});

const searchEvent = document.getElementById('search-btn');

searchEvent.addEventListener('click', (event) => {
   event.preventDefault();
   ui.pagination = ui.pagination + 1;
});

window.onload = () => {
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
