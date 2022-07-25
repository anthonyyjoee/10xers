import { View, Text, ScrollView, StyleSheet, StatusBar, Dimensions, FlatList } from "react-native";
import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";

const Home = ({ navigation }) => {
  const [collections, setCollections] = useState()

  const fetchCollections = async () => {
    try {
      const _collections =  await axios({
        method: 'GET',
        url: 'https://api-generator.retool.com/j3Iz08/collections'
      })

      setCollections(_collections.data)
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
        renderItem={(item) => <View style={styles.card}></View>}
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