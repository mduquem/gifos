// Every API Request will be handled in this file

class Giphy {
   constructor() {
      this.searchEndpoint = 'https://api.giphy.com/v1/gifs/search';
      this.trendEndpoint = 'https://api.giphy.com/v1/gifs/trending';
      this.uploadEndpoint = 'https://upload.giphy.com/v1/gifs?';
      this.idEndpoint = 'https://api.giphy.com/v1/gifs';
      this.uploadEndpoint = this.apiKey = 'EVXJhVK8O4M0zOGlqExmwJZXNiX9rMTE';
      this.body = null;
      this.browser = new Browser();
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

   async getRelatedResults() {
      const relatedResponse = await fetch(
         `https://api.giphy.com/v1/tags/related?api_key=${key}&term="wow"`
      );

      const relatedData = await relatedResponse.json();
      return {
         relatedData,
      };
   }

   async uploadGif() {
      const headers = new Headers();
      const uploadFile = this.browser.stopRecording();
      const uploadResponse = await fetch(`${this.uploadEndpoint}api_key=${this.apiKey}`, {
         method: 'POST',
         headers,
         body: uploadFile,
         cors: 'no-cors',
      });

      const uploadData = await uploadResponse.json();
      const gifId = uploadData.data.id;

      return {
         uploadData,
         gifId,
      };
   }

   async getUploadedGif(id) {
      const response = fetch(`${this.idEndpoint}`);
   }

   async visitCounter() {
      // const visitResponse = await fetch(`https://gifos-56c81.firebaseio.com/visits.json`, {
      //    method: 'POST',
      //    body: {
      //       visits: 0,
      //    },
      // });
      const visitResponse = await fetch('https://gifos-56c81.firebaseio.com/visits.json');

      const visitsData = await visitResponse.json();
      const totalCount = visitsData.total_count + 1;
      const newVisitData = JSON.stringify({
         total_count: totalCount,
      });

      const registerVisit = await fetch('https://gifos-56c81.firebaseio.com/visits.json', {
         method: 'POST',
         body: newVisitData,
      });

      const registerData = await registerVisit.json();
      return {
         totalCount,
      };
   }
}
