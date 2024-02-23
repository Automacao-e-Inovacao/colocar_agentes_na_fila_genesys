require('dotenv').config();
const authApiProxy = require('../proxies/authenticateApi');

const CLIENT_ID = "1b5d71fa-f9a8-463c-941f-07611e3ecf1b" ;
const CLIENT_SECRET = "m90_wASq0rJYcykdGMFdQNwBeAds_iyoZkh7pCQkPRk";
const ORG_REGION = "sa_east_1"; // eg. us_east_1

(async () => {
  console.log("Starting the user provisioner")
  const token = await authApiProxy.authenticate(CLIENT_ID, CLIENT_SECRET, ORG_REGION);

  console.log(`token: ${JSON.stringify(token, null, 4)}`);
})();