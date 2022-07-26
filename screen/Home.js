import { View, Text, ScrollView, StyleSheet, StatusBar, Dimensions, FlatList } from "react-native";
import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import CollectionsCard from "../component/CollectionsCard";

const Home = ({ navigation }) => {
  const [collections, setCollections] = useState()

  const fetchCollections = async () => {
    try {
      const collectionTokens =  await axios({
        method: 'GET',
        url: 'https://api-generator.retool.com/jlEsLB/wallet_content'
      })

      const _collectionTokens = collectionTokens.data.map(el => {
        el.collection_json = JSON.parse(el.collection_json)
        return el.collection_json.external_id
      })

      const collectionItems =  await axios({
        method: 'GET',
        url: 'https://api-generator.retool.com/j3Iz08/collections'
      })

      const b = collectionItems.data.map(collection => {
        const temp = _collectionTokens.filter(externalId => externalId === collection.external_id)
        collection.ownedToken = temp.length
        return collection
      })

      setCollections(b)

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchCollections()
  }, [])

  return (
    <View style={styles.container}>
     <FlatList
        numColumns={2}
        data={collections}
        renderItem={({item}) => <CollectionsCard navigation={ navigation } collection={item}/>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 15
  },
  card: {
    height: 180,
    width: 180,
    justifyContent:'space-between',
    marginHorizontal: 10,
    backgroundColor: "red",
    borderRadius: 10,
    marginBottom: 10
  }
})

export default Home 