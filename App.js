import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';

const pokePath = "https://pokeapi.co/api/v2/";
const pokeQuery = "pokemon?limit=100&offset=0";
const firstHundredPokemonPath = `${pokePath}${pokeQuery}`;

export default function App() {
  const [firstHundredPokemonDetails, setFirstHundredPokemonDetails] = useState([]);

  /*
    Here i tried to add pagination but it didnt work...(
  
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=0=${this.state.page}`).
    then(response=>response.json())
    .then(responseJson=>{
    this.setState({
    setPokemonData: this.state.page === 1 ? responseJson.results : [...this.state.setPokemonData, ...responseJson.results]
    })
    }) 
    LoadPokemonData = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=0=${this.state.page}`).
    then(response => response.json())
    .then(responseJson => {
    this.setState({
    setPokemonData: this.state.page === 1 ? responseJson.results : [...this.state.setPokemonData, ...responseJson.results]
    })
    }).catch(error => {
    console.log('Error with data: ' + error)
    })
    }*/

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
      <Text style={styles.title}>Pokemon App</Text>
      <SafeAreaView>
      <FlatList numColumns={2} data={firstHundredPokemonDetails} renderItem={renderPokemon} />
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  title: {
    fontSize: 38,
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 50,
  },
  pokemonContainer: {
  padding:4,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  marginTop: 8,
  marginHorizontal: 5,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
},
  pokemonTitle: {
    fontSize: 32,
    alignSelf: "center",  
    marginTop: 10,
  },
  pokemonSprite: {
    width: 100,
    height: 100,
  },
});
