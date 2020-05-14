// Every API Request will be handled in this file

class Giphy {
   constructor() {
      this.searchEndpoint = 'https://api.giphy.com/v1/gifs/search';
      this.trendEndpoint = 'https://api.giphy.com/v1/gifs/trending';
      this.uploadEndpoint = 'https://upload.giphy.com/v1/gifs?';
      this.idEndpoint = 'https://api.giphy.com/v1/gifs';
      this.apiKey = 'EVXJhVK8O4M0zOGlqExmwJZXNiX9rMTE';
      this.body = null;
   }

   async getSearchResults(search) {
      const gifResponse = await fetch(`${this.searchEndpoint}?q=${search}&api_key=${this.apiKey}`);

      const gifData = await gifResponse.json();

      return {
         gifData,
      };
   }

   async getTrendingResults() {
      const trendingResponse = await fetch(
         `${this.trendEndpoint}?api_key=${this.apiKey}&limit=10&rating=G`
      );

      const trendingData = await trendingResponse.json();

      return {
         trendingData,
      };
   }

   async getRandomResults() {
      const randomResponse = await fetch(
         `https://api.giphy.com/v1/gifs/random?api_key=${this.apiKey}&rating=G&limit=4`
      );
      const randomData = await randomResponse.json();

      return {
         randomData,
      };
   }

   async getRelatedResults(term) {
      const relatedResponse = await fetch(
         `https://api.giphy.com/v1/tags/related?api_key=${this.apiKeykey}&term=${term}`
      );

      const relatedData = await relatedResponse.json();
      return {
         relatedData,
      };
   }

   async getGifsById(ids) {
      const response = await fetch(`api.giphy.com/v1/gifs?api_key=${this.apiKey}&ids=${ids}`);
      const data = await response.json();

      return {
         data,
      };
   }

   async uploadGif(file) {
      const headers = new Headers();
      const uploadResponse = await fetch(`${this.uploadEndpoint}api_key=${this.apiKey}`, {
         method: 'POST',
         headers,
         body: file,
         cors: 'no-cors',
      });

      const uploadData = await uploadResponse.json();
      const gifId = uploadData.data.id;
      return {
         uploadData,
         gifId,
      };
   }
}
