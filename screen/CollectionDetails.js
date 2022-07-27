import React from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, ImageBackground, Image, TouchableOpacity, SafeAreaView } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../component/Header";
import Chart from "../component/Chart";

const CollectionDetails = ({ route, navigation }) => {
  const { collectionId, tokenOwned, external_id } = route.params
  const [collectionChartData, setCollectionChartData] = useState()
  const [collectionChartDate, setCollectionChartDate] = useState()
  const [collection, setCollection] = useState()
  const [tokens, setTokens] = useState()
  const [isLoading, setIsloading] = useState(true)


  const fetchCollectionDetail = async () => {
    try {
      const collectionsDetails = await axios({
        method: 'GET',
        url: `https://api-generator.retool.com/j3Iz08/collections/${collectionId}`
      })

      setCollection(collectionsDetails.data)
    } catch (err) {
      console.log(err);
    }
  }

  const fetchCollectionChartById = async () => {
    try {
      const _collectionChart = await axios({
        method: 'GET',
        url: `https://api-generator.retool.com/ELI42D/collection_stats?collection_id=${collectionId}`
      })

      const x = _collectionChart.data.sort((a, b) => {
        const bandA = new Date(a.timestamp)
        const bandB = new Date(b.timestamp)
        let comparison = 0

        if (+bandA > +bandB) comparison = 1
        else if (+bandA < +bandB) comparison = -1
        return comparison;
      })

      const floorPrice = []
      const date = []

      x.forEach((el, i) => {
        floorPrice.push(+el.floor_price_eth)
        if (i == 0 || i % 2 == 0) date.push(`${new Date(el.timestamp).getDate()}`)
        else date.push('')
      })

      setCollectionChartData(floorPrice)
      setCollectionChartDate(date)
    } catch (err) {
      console.log(err);
    }
  }

  const fetchTokens = async () => {
    try {
      const collectionTokens = await axios({
        method: 'GET',
        url: 'https://api-generator.retool.com/jlEsLB/wallet_content'
      })

      const _collectionTokens = collectionTokens.data.filter(el => {
        el.collection_json = JSON.parse(el.collection_json)
        const elCollectionId = el.collection_json.external_id
        const collectionExternallId = external_id

        if (elCollectionId == collectionExternallId) return el
      })

      setTokens(_collectionTokens)
    } catch (err) {
      console.log(err);
    }
  }

  const fetchData = async () => {
    await fetchCollectionDetail()
    await fetchCollectionChartById()
    await fetchTokens()
    setIsloading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <SafeAreaView>
      {
        isLoading ? (
          <View style={[styles.container, { alignItems: "center" }]}>
            <Image source={require('../assets/Loading.gif')} style={{ width: 300, height: 300, marginHorizontal: 'auto' }} />
          </View>
        ) : (
          <>
            <Header collection={collection} tokenOwned={tokenOwned} navigation={navigation} />
            
            <FlatList
              keyExtractor={(item) => item.id}
              numColumns={2}
              style={{ height: "70%" }}
              data={tokens}
              ListHeaderComponent={(
                <>
                  <View style={{ width: "100%", alignItems: "center" }}>
                    <Chart collectionChartDate={collectionChartDate} collectionChartData={collectionChartData} />
                  </View>
                  <Text style={{ fontSize: 25, fontWeight: "bold", color: "#000000", marginTop: 10, marginLeft: 20 }}>
                    Tokens
                  </Text>
                </>
              )}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <View style={styles.image}>
                    <ImageBackground source={{ uri: item.image_url }} style={styles.image}>

                    </ImageBackground>
                  </View>
                  <Text style={{ marginTop: 5 }}>{item.name}</Text>
                </View>
              )}
            />
          </>
        )
      }
    </SafeAreaView>
  )
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
  },
  card: {
    borderRadius: 10,
    margin: 10,
    marginHorizontal: 13,
    padding: 10,
    height: 200,
    width: 180,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    height: 160,
    width: 160,
    borderRadius: 7,
    overflow: "hidden",
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  }
})

export default CollectionDetails