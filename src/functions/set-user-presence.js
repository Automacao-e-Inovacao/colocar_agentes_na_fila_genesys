const platformClient = require('purecloud-platform-client-v2')
let presenceApi = new platformClient.PresenceApi();

async function setUserPresence(userPresenceId) {
  let userPresenceBody = {
    presenceDefinition: {
        id: "e08eaf1b-ee47-4fa9-a231-1200e284798f", // "Em fila"
    },
  }

  try {
    return await presenceApi.patchUserPresencesPurecloud(userPresenceId, userPresenceBody)
  } catch (err) {
      console.log("There was a failure calling patchUserPresencesPurecloud");
      console.error(err);
  };
}

module.exports = setUserPresence