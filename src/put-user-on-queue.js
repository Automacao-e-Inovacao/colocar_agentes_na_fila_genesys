require('dotenv').config();
const authApiProxy = require('../proxies/authenticateApi');
const getActiveUsers = require('./functions/get-active-users');
const filterUsersByGroup = require('./functions/filter-users-by-group');
const setUserPresence = require('./functions/set-user-presence');
const inMemoryActiveUsersList = require('./utils/in-memory-active-users-list');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const orgRegion = process.env.ORG_REGION;

const putUserOnQueue = async () => {
  const startTime = Date.now()

  const token = await authApiProxy.authenticate(clientId, clientSecret, orgRegion);
  
  const activeUsers = await getActiveUsers();
  const validUsers = await filterUsersByGroup(activeUsers);

  if (validUsers.length > 0) {
    for (user of validUsers) {
      await setUserPresence(user.id);
    }
  } 

  const endTime = Date.now();
  const executionTime = endTime - startTime; // milissegundos

  console.log(`\n----------------------------------------------`)
  console.log(`Usuários fora da fila: ${validUsers.length}`)
  console.log(`\nTempo de execução da RPA: ${executionTime/1000}s`)
  console.log(`\nTérmino da execução da RPA: ${new Date(endTime)}`)
}

putUserOnQueue();

const intervalTime = 1 * 60 * 1000; // 1 minutos em milissegundos
setInterval(putUserOnQueue, intervalTime);
