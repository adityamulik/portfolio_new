const needle = require('needle');
const dotenv = require('dotenv');
dotenv.config();

exports.handler = async event => {
  const subject = event.queryStringParameters.name;
  const token = process.env.TWITTER_BEARER_TOKEN;
  console.log(token);

  const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

  async function getRequest() {

      // Edit query parameters below
      // specify a search query, and any additional fields that are required
      // by default, only the Tweet ID and text fields are returned
      const params = {
          'query': 'from:adityamulik',
          'tweet.fields': 'author_id'
      }

      const res = await needle('get', endpointUrl, params, {
          headers: {
              "User-Agent": "v2RecentSearchJS",
              "authorization": `Bearer ${token}`
          }
      })

      if (res.body) {
          return res.body;
      } else {
          throw new Error('Unsuccessful request');
      }
  }

  (async () => {

      try {
          // Make request
          const response = await getRequest();
          console.log(response);
          return {
            statusCode: 200,
            body: response,
          }
          // console.dir(response, {
          //     depth: null
          // });

      } catch (e) {
          console.log(e);
          process.exit(-1);
      }
      process.exit();
  })();
}