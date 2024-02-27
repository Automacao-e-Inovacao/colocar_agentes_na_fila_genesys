const getGroups = require("./get-groups")

let validGroupsList = [
  "Acionamento Ilhas - GO",
	"Apoio Comercial - Backoffice - Agentes",
	"EQT Dist - GC - Ag Backup",
	"EQT Dist - GC - Ag Demanda",
	"EQT Dist - GD - Ag Backup",
	"EQT Dist - GD - Ag Demanda",
  "EQT Dist - GC - Agentes",
	"EQT Dist - GD - Agentes",
	"EQT Dist - Massivo - Agentes",
	"EQT Dist - Massivo - Agentes  (SEM CEA)",
	"EQT Dist - Massivo - Novos Agentes",
	"EQT Dist - Neg - Ag Backup",
	"EQT Dist - Neg - Agentes",
	"EQT Dist - OUV - Ag Backup",
	"EQT Dist - Ouv - Ag Demanda",
	"EQT Dist - Ouv - Agentes",
	"EQT Dist - Reclamação PA - Agentes",
	"EQT Dist - Sup Cred - Ag Backup",
	"EQT Dist - Sup Cred - Ag Demanda",
	"EQT Dist - Sup Cred - Agentes",
	"EQT Dist - Telecom - Agentes",
	"EQT Dist - Telemed - Ag Backup",
	"EQT Dist - Telemed - Agentes",
	"EQTL Suporte Equipe Vendas",
	"EQTL Suporte Equipe Vendas  para N/NE",
	"GO - EQT - GC/GD- Agentes",
	"GO - EQT - Massivo - Agentes",
	"GO - EQT - Massivos (Filas Comerciais GO - Contingência)",
	"GO - EQT - Ouv - Agentes",
	// "GO - EQTL - Suporte Ao Varejo N/NE (Sem CEA)",
	// "RS - EQT - Massivo - Agentes	Operação CEEE RS Varejo",
	"RS - EQT - Ouvidoria - Agentes",
	"RS - EQT - Suporte Credenciado - Agentes",
	"RS - EQT Dist - EMERGENCIAL - CEEE (TREINAMENTO EMERGENCIAL RS)"
]

async function filterUsersByGroup(users) {

  const groups = await getGroups()

  const validGroupsWithId = groups.filter(group => validGroupsList.includes(group.name))

	const validGroupIds = validGroupsWithId.map(group => group.id)

	const filteredUsers = users.filter(user => {
		
		const isGroupValid = user.groups.some(group => validGroupIds.includes(group.id))
		
		const isNotOnQueue = user.presence.presenceDefinition.id == "6a3af858-942f-489d-9700-5f9bcdcdae9b" // Available
		
		return isGroupValid && isNotOnQueue
	}
	);
	
	return filteredUsers;
}

module.exports = filterUsersByGroup