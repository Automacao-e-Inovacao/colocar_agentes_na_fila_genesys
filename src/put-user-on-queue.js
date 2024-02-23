const authApiProxy = require('../proxies/authenticateApi');
const getActiveUsers = require('./get-active-users');
const filterUsersByDivision = require('./filter-users-by-division');
const setUserPresence = require('./set-user-presence');

const CLIENT_ID = "1b5d71fa-f9a8-463c-941f-07611e3ecf1b" ;
const CLIENT_SECRET = "m90_wASq0rJYcykdGMFdQNwBeAds_iyoZkh7pCQkPRk";
const ORG_REGION = "sa_east_1"; // eg. us_east_1

// [
//   'entities',   'pageSize',
//   'pageNumber', 'total',
//   'firstUri',   'nextUri',
//   'lastUri',    'selfUri',
//   'pageCount'
// ]

(async () => {
  const startTime = Date.now()

  const token = await authApiProxy.authenticate(CLIENT_ID, CLIENT_SECRET, ORG_REGION);

  let pageNumber = 1
  let pageCount = 1
  let nUsersOutOfQueue = 0

  while (pageNumber <= pageCount) {
    // Buscando usuários ativos
    users = await getActiveUsers(pageNumber);
    
    // Filtrando os usuários válidos
    validUsers = await filterUsersByDivision(users);

    nUsersOutOfQueue = validUsers.length + nUsersOutOfQueue
  
    for (user of validUsers) {
      await setUserPresence(user.id);
    }

    pageNumber = users.pageNumber + 1
    pageCount = users.pageCount
  }

  
  const endTime = Date.now(); // Captura o tempo de término
  const executionTime = endTime - startTime; // Calcula o tempo de execução em milissegundos
  
  console.log(`Qtd de pessoas fora da fila: ${nUsersOutOfQueue}`)
  console.log(`Tempo de execução da RPA: ${executionTime}`)
})()