const needle = require('needle');
const dotenv = require('dotenv');
dotenv.config();

exports.handler = async (event, context, callback) => {

  const token = process.env.TWITTER_BEARER_TOKEN;

  const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

  async function getRequest() {

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

//   (async () => {

//       try {
//           // Make request
//           const response = await getRequest();
//           // console.dir(response, {
//           //     depth: null
//           // });

//       } catch (e) {
//           console.log(e);
//           process.exit(-1);
//       }
//   })();

  try {
    const response = await getRequest();
    return ({
        statusCode: 200,
        body: JSON.stringify(response)
    })
  } catch {
    const badResponse = "Please visit Aditya's Official Twitter Handle to view Tweets!";
    return ({
        statusCode: 400,
        body: JSON.stringify(badResponse)
    })
  }
}