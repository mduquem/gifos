const ui = new UI();
const giphy = new Giphy();

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
