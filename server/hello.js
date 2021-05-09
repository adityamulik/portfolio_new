const needle = require('needle');
const dotenv = require('dotenv');
dotenv.config();

const token = process.env.TWITTER_BEARER_TOKEN;

const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

exports.handler = async event => {
  const subject = event.queryStringParameters.name;
  console.log(token);
  return {
    statusCode: 200,
    body: `Hello ${subject}`,
  }
}