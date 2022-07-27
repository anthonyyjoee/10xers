import { View, StyleSheet, Dimensions, FlatList, SafeAreaView } from "react-native";
import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import CollectionCard from "../component/CollectionCard";

const Home = ({ navigation }) => {
  const [collections, setCollections] = useState()

  const fetchCollections = async () => {
    try {
      const collectionTokens = await axios({
        method: 'GET',
        url: 'https://api-generator.retool.com/jlEsLB/wallet_content'
      })

      const _collectionTokens = collectionTokens.data.map(el => {
        el.collection_json = JSON.parse(el.collection_json)
        return el.collection_json.external_id
      })

      const collectionItems = await axios({
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
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          data={collections}
          renderItem={({ item }) => <CollectionCard navigation={navigation} collection={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: "#F6F6F5",
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 15
  }
})

export default Home 