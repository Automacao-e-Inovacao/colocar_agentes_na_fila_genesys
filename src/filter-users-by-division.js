async function filterUsersByDivision(users) {
  
  // Filtro de divisões válidas
  let validDivisions = [
    "EQT Dist - Massivo Geral",
    "EQT Dist - Outros",
    "EQT Dist - RS  - Massivo Geral",
    "Goiás - EQT Serviços"
  ]

  return users.entities.filter(user => {
    
    const divisionIsValid = validDivisions.includes(user.division.name)
    const notOnQueue = user.presence.presenceDefinition.id == "6a3af858-942f-489d-9700-5f9bcdcdae9b" // Available

    return divisionIsValid && notOnQueue
  })    
}

module.exports = filterUsersByDivision;