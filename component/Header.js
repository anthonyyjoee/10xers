import React from "react"
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'

const Header = ({ collection, tokenOwned, navigation }) => {
  return (
    <View style={{ width: '100%', height: '30%' }}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ fontSize: 18, color: "black" }}>Back</Text>
      </TouchableOpacity>
      <View style={{ width: '100%', height: '80%' }}>
        <ImageBackground source={{ uri: collection.banner_image_url }} resizeMode="cover" style={styles.imageBackground}>
          <View style={{ padding: 5, backgroundColor: 'white', borderRadius: 12, marginTop: -10 }}>
            <Image source={{ uri: collection.image_url }} style={{ width: 100, height: 100, borderRadius: 8 }} />
          </View>
          <Text style={{ fontSize: 19, fontWeight: "500", color: "black", backgroundColor: "white", marginTop: 5, paddingHorizontal: 10, borderRadius: 10 }}>
            {collection.name}
          </Text>
        </ImageBackground>

        <View style={styles.barInfoContainer}>
          <View style={styles.barInfoContent}>
            <View style={styles.infoCard}>
              <Text style={styles.itemTitle}>Tokens</Text>
              <Text style={styles.itemValue}>{tokenOwned}</Text>
            </View>

            <View style={styles.divider}></View>

            <View style={styles.infoCard}>
              <Text style={styles.itemTitle}>Total Volume</Text>
              <Text style={styles.itemValue}>{parseFloat(collection.total_volume).toFixed(2)}</Text>
            </View>

            <View style={styles.divider}></View>

            <View style={styles.infoCard}>
              <Text style={styles.itemTitle}>One Day Change</Text>
              {
                collection.one_day_change.toString()[0] === '-' ? (
                  <Text style={[styles.itemValue, { color: 'red' }]}>
                    {parseFloat(collection.one_day_change).toFixed(2)}%
                  </Text>
                ) : (
                  <Text style={[styles.itemValue, { color: 'green' }]}>
                    {parseFloat(collection.one_day_change).toFixed(2)}%
                  </Text>
                )
              }
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barInfoContainer: {
    paddingHorizontal: 10,
    width: '100%',
    height: '30%',
    marginTop: -30,
  },
  barInfoContent: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  infoCard: {
    width: "32%",
    height: "100%",
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 5,
    color: "black"
  },
  itemValue: {
    fontSize: 15,
    fontWeight: "500",
    color: "black",
    fontWeight: "bold",
  },
  divider: {
    height: "80%",
    borderWidth: 0.5,
    borderColor: "#D6DFDC",
  },
  backButton: {
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: "absolute",
    zIndex: 20,
    margin: 8,
    backgroundColor: "white",
  },
})

export default Header