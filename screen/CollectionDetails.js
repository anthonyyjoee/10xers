import React from "react";
import { View, Text, ScrollView, StyleSheet, StatusBar, Dimensions, FlatList, Image, ImageBackground, RecyclerViewBackedScrollViewComponent } from "react-native";
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
import axios from "axios";
import { useEffect, useState } from "react";
import CollectionsCard from "../component/CollectionsCard";
import Header from "../component/Header";

const CollectionDetails = ({ route }) => {
  const { collectionId, tokenOwned } = route.params
  const [collectionChartData, setCollectionChartData] = useState()
  const [collectionChartDate, setCollectionChartDate] = useState()
  const [collection, setCollection] = useState()
  const [tokens, setTokens] = useState()


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
        if (i == 0 || i % 2 == 0) {
          date.push(`${new Date(el.timestamp).getDate()}`)
        } else {
          date.push('')
        }
      })

      setCollectionChartData(floorPrice)
      setCollectionChartDate(date)
      console.log(date);


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

      setTokens(collectionTokens.data)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchCollectionDetail()
    fetchCollectionChartById()
    fetchTokens()
  }, [])

  return (
    <>
      {collection && (<Header collection={collection} tokenOwned={tokenOwned} />)}
      {
        tokens && (
            <FlatList
              style={{ width: "100%", paddingHorizontal: 5 }}
              contentContainerStyle={{ alignItems: "center" }}
              ListHeaderComponent={(
                <>
                  {
                    collectionChartDate && (
                      <View style={{ width: Dimensions.get("window").width - 30, backgroundColor: "white", alignItems: "center", paddingTop: 4, borderRadius: 8 }}>
                        <LineChart
                          data={{
                            labels: collectionChartDate,
                            datasets: [{ data: collectionChartData }]
                          }}
                          width={Dimensions.get("window").width - 40}
                          height={220}
                          yAxisSuffix=" ETH"
                          yAxisInterval={1}
                          chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#ffffff",
                            backgroundGradientTo: "#ffffff",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: { borderRadius: 16 },
                            propsForDots: { r: "3" }
                          }}
                          bezier
                          style={{
                            borderRadius: 10,
                          }}
                        />
                      </View>
                    )
                  }
                </>
              )}
              numColumns={2}
              data={tokens}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <View style={styles.image}>
                    <ImageBackground source={{ uri: item.image_url }} style={styles.image}>
                      <Text>
                        {item.name}
                      </Text>
                    </ImageBackground>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
        )
      }
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'space-between',
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    height: 180,
    width: 180,
    backgroundColor: '#fff',
  },
  image: {
    height: 160,
    width: 160,
    borderRadius: 7,
    overflow: "hidden",
  },
  detailButton: {
    backgroundColor: "gray",
    width: "100%",
    height: 30,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
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