import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View} from 'react-native';

const pokePath = "https://pokeapi.co/api/v2/";
const pokeQuery = "pokemon?limit=3&offset=0";
const firstHundredPokemonPath = `${pokePath}${pokeQuery}`;

export default function App() {
  const [firstHundredPokemonDetails, setFirstHundredPokemonDetails] = useState([]);

  useEffect(() => {
    const fetchFirstHundredPokemons = async () => {
      const firstHundredPokemonIdsResponce = await fetch(firstHundredPokemonPath);
      const firstHundredPokemonIdsBody = await firstHundredPokemonIdsResponce.json();

      const firstHundredPokemonDetails = await Promise.all(
        firstHundredPokemonIdsBody.results.map(async (p) => {
        const pDetails = await fetch(p.url);
        return await pDetails.json();
        })
        );
      console.log(firstHundredPokemonDetails);
      setFirstHundredPokemonDetails(firstHundredPokemonDetails);
    };

    fetchFirstHundredPokemons();
  }, []);

  return (
    <View style={styles.container}>
      {firstHundredPokemonDetails.map((p) => (
        <Text>{p.name}</Text>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
