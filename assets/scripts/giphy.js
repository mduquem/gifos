// Every API Request will be handled in this file
class Giphy {
   constructor() {
      this.apiKey = 'EVXJhVK8O4M0zOGlqExmwJZXNiX9rMTE';
      this.body = null;
   }

   async getSearchResults(search) {
      const gifResponse = await fetch(
         `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${this.apiKey}`
      );

      const gifData = await gifResponse.json();

      return {
         gifData,
      };
   }

   async getTrendingResults() {
      const trendingResponse = await fetch(
         `https://api.giphy.com/v1/gifs/trending?api_key=${this.apiKey}&limit=25&rating=G`
      );

      const trendingData = await trendingResponse.json();

      return {
         trendingData,
      };
   }

   async getRandomResults() {
      const randomResponse = await fetch(
         `https://api.giphy.com/v1/gifs/random?api_key=${this.apiKey}&tag=&rating=G`
      );
      const randomData = await randomResponse.json();

      return {
         randomData,
      };
   }
}
