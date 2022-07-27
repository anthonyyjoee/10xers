import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from 'react';

const CollectionCard = ({ collection, navigation }) => {
  const { image_url, ownedToken, name, id, external_id } = collection

  return (
    <View style={styles.card}>
      <Image source={{ uri: image_url }} style={styles.image} />
      <Text style={{ fontSize: 18, fontWeight: "800", marginTop: 5, color: "black" }}>
        {name}
      </Text>

      <Text style={{ fontSize: 12, fontWeight: "400", marginTop: 5, color: "black" }}>
        Token Owned
      </Text>

      <Text style={{ fontSize: 15, fontWeight: "500", marginTop: -2, color: "black" }}>
        {ownedToken}
      </Text>

      <TouchableOpacity style={styles.detailButton} onPress={() => navigation.navigate("CollectionDetails", {collectionId: id, tokenOwned: ownedToken, external_id: external_id})}>
        <Text style={{ fontSize: 14, fontWeight: "500", marginTop: 5, color: "white", marginHorizontal: "auto" }}>
          See Detail
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'space-between',
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: '#fff',
  },
  image: {
    height: 160,
    width: 160,
    justifyContent: "center",
    borderRadius: 10,
  },
  detailButton: {
    backgroundColor: "#2588D3",
    width: "100%",
    height: 30,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  }
})

export default CollectionCard