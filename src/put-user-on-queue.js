const authApiProxy = require('../proxies/authenticateApi');
const getActiveUsers = require('./functions/get-active-users');
const filterUsersByGroup = require('./functions/filter-users-by-group');
const setUserPresence = require('./functions/set-user-presence');

const CLIENT_ID = "1b5d71fa-f9a8-463c-941f-07611e3ecf1b" ;
const CLIENT_SECRET = "m90_wASq0rJYcykdGMFdQNwBeAds_iyoZkh7pCQkPRk";
const ORG_REGION = "sa_east_1"; // eg. us_east_1

(async () => {
  const startTime = Date.now()

  const token = await authApiProxy.authenticate(CLIENT_ID, CLIENT_SECRET, ORG_REGION);
  
  let numUsersOutOfQueue = 0

  const activeUsers = await getActiveUsers();

  // const validUsers = await filterUsersByGroup(users);

  // numUsersOutOfQueue = validUsers.length + numUsersOutOfQueue

  // for (user of validUsers) {
  //   await setUserPresence(user.id);
  // }
  
  // const endTime = Date.now();
  // const executionTime = endTime - startTime; // milissegundos
  
  // console.log(`\nTempo de execução da RPA: ${executionTime}ms`)
  // console.log(`\nTempo de execução da RPA: ${executionTime/1000}s`)
})()