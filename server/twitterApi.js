const needle = require('needle');
const dotenv = require('dotenv');
dotenv.config();

exports.handler = async (event, context, callback) => {

  const token = process.env.TWITTER_BEARER_TOKEN;

  const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

  async function getRequest() {

    const params = {
        'query': 'from:adityamulik',
        'tweet.fields': "attachments,author_id,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang",
        'user.fields': 'username'
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

  try {
    const response = await getRequest();
    return ({
        statusCode: 200,
        body: JSON.stringify(response)
    })
  } catch {
    const badResponse = "Please visit Aditya's Official Twitter Handle to view his tweets!";
    return ({
        statusCode: 401,
        body: JSON.stringify(badResponse)
    })
  }
}