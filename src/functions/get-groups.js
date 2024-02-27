const platformClient = require('purecloud-platform-client-v2')
const groupsApi  = new platformClient.GroupsApi()

async function getGroups() {

  let pageNumber = 1
  let pageCount = 1
  let groupList = []

  let opts = {
    "pageSize": 200,
    "pageNumber": pageNumber,
    "sortOrder": "ASC"
  };

  try {
    while(pageNumber <= pageCount) {
      const groups = await groupsApi.getGroups(opts)
      groupList.push(...groups.entities)

      pageNumber = groups.pageNumber + 1
      pageCount = groups.pageCount
      opts.pageNumber = pageNumber
    }
    return groupList
  } catch (e) {
    console.log("There was a failure calling getGroups");
    console.error(e);
  }
}

module.exports = getGroups;