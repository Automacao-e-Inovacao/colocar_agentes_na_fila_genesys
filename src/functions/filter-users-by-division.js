// Filtro de divisões válidas
let validDivisions = [
  "EQT Dist - Massivo Geral",
  "EQT Dist - Outros",
  "EQT Dist - RS  - Massivo Geral",
  "Goiás - EQT Serviços"
]

async function filterUsersByDivision(users) {

  return users.entities.filter(user => {
    
    const isDivisionValid = validDivisions.includes(user.division.name)
    const IsNotOnQueue = user.presence.presenceDefinition.id == "6a3af858-942f-489d-9700-5f9bcdcdae9b" // Available

    return isDivisionValid && IsNotOnQueue
  })    
}

module.exports = filterUsersByDivision;


// user.group -> IsNotOnQueue

// const isGroupValid = validGroups.includes(user.group.name)