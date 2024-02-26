const platformClient = require('purecloud-platform-client-v2')
const groupsApi  = new platformClient.GroupsApi()

async function getGroups() {
  let opts = {
    "pageSize": 100,
    "pageNumber": 1,
  };

  try {
    return await groupsApi.getGroups(opts)
  } catch (e) {
    console.log("There was a failure calling getGroups");
    console.error(e);
  }
}

module.exports = getGroups()