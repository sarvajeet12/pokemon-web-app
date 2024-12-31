import { pokemonData } from "./api";
import { apiConnector } from "./api-connector";

export const getPokemonData = async (pageNumber) => {
    try {
        const response = await apiConnector("GET", `${pokemonData.DATA_API}/pokemon?offset=${pageNumber}&limit=9`);

        if (response.status === 200) {


            const detailedPokemonData = response.data.results.map(async (currPokemon) => {
                const resp = await apiConnector("GET", currPokemon.url)
                return resp.data;
            });


            const detailedResponses = await Promise.all(detailedPokemonData);
            return detailedResponses;

        } else {
            throw new Error("Failed to fetch Pokémon data. Server responded with a status other than 200.")
        }
    } catch (error) {
        throw new Error(`Error while fetching Pokémon data: ${error.message}`);
    }
}


export const getIndiPokemonData = async (id) => {
    try {
        const response = await apiConnector("GET", `${pokemonData.DATA_API}/pokemon/${id}`);

        console.log("indi data : ", response.data)

        if (response.status === 200) {
            return response.data

        } else {
            throw new Error("Failed to fetch Pokémon data. Server responded with a status other than 200.")
        }
    } catch (error) {
        throw new Error(`Error while fetching Pokémon data: ${error.message}`);
    }
}