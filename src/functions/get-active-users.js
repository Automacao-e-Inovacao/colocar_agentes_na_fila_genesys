const platformClient = require('purecloud-platform-client-v2')
const usersApi = new platformClient.UsersApi();

async function getActiveUsers(pageNumber) {
  let opts = {
      "pageSize": 200, // Number | Page size
      "pageNumber": pageNumber, // Number | Page number
      "sortOrder": "ASC", // String | Ascending or descending sort order
      "expand": ["presence"], // [String] | Which fields, if any, to expand
      "state": "active" // String | Only list users of this state
  };
  
  try {
    return await usersApi.getUsers(opts)
  } catch (e) {
    console.log("There was a failure calling getUsers");
    console.error(e);
  }
}

module.exports = getActiveUsers;