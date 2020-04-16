const themeToggler = document.getElementById('theme-toggler');

const apiKey = 'EVXJhVK8O4M0zOGlqExmwJZXNiX9rMTE';

themeToggler.addEventListener('click', toggleTheme);

function toggleTheme() {
   console.log('theme clicked');
}

// function getSearchResults(search) {
//    const found = fetch(
//       `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${apiKey}`
//    )
//       .then((res) => {
//          return res.json();
//       })
//       .then((data) => {
//          return data;
//       })
//       .catch((err) => console.log(err));

//    return found;
// }

// getSearchResults('friday');

// function getRandomResults() {
//    const suggestionsOutput = document.getElementById('suggestions-output');
//    const found = fetch(
//       `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=&rating=G`
//    )
//       .then((res) => {
//          return res.json();
//       })
//       .then((data) => {
//          console.log(data);
//          const newGif = data.data;

//          return data;
//       })
//       .catch((err) => console.log(err));

//    return found;
// }

function getTrendingResults() {
   fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&rating=G`
   )
      .then((res) => {
         return res.json();
      })
      .then((data) => {
         const results = Array();
         data = data.data;
         console.log(typeof results);
         console.log(typeof data);
         for (let index = 0; index < data.length; index++) {
            const element = data[index];
            results.push(element);
         }
         return results;
      })
      .catch((error) => console.log(error));
}

window.onload = onLoadData;

function onLoadData() {
   const output = document.getElementById('output');

   let results = getTrendingResults();

   for (let index = 0; index < results.length; index++) {
      const element = results[index];
   }
}
