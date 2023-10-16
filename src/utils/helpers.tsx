export const parseEvolutionChain = (chain) => {
	const speciesList = [];

	const traverse = (chain) => {
		if (chain && chain.species) {
			speciesList.push(chain.species.name);
			if (chain.evolves_to && chain.evolves_to.length > 0) {
				for (const evolution of chain.evolves_to) {
					traverse(evolution);
				}
			}
		}
	}

	traverse(chain);

	return speciesList;
}