import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Image} from 'react-native';

const pokePath = "https://pokeapi.co/api/v2/";
const pokeQuery = "pokemon?limit=100&offset=0";
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

  const renderPokemon = ({ item }) => {
    return (
      <View style={styles.pokemonContainer}>
        <Text style={styles.pokemonTitle}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <Image
          style={styles.pokemonSprite}
          source={{
            uri: item.sprites.front_default,
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>First Gen Pokemons</Text>
      <FlatList data={firstHundredPokemonDetails} renderItem={renderPokemon} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 60,
  },
  title: {
    fontSize: 38,
    alignSelf: "center",
    marginBottom: 20,
  },
  pokemonContainer: { backgroundColor: "lightgrey", marginTop: 10 },
  pokemonTitle: {
    fontSize: 32,
    alignSelf: "center",
    marginTop: 10,
  },
  pokemonSprite: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
});
