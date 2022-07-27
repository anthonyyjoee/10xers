import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const Chart = ({ collectionChartDate, collectionChartData }) => {
  return (
    <View style={[styles.chartContainer, styles.shadow]}>
      <LineChart
        width={Dimensions.get("window").width - 40}
        style={{ borderRadius: 10 }}
        height={220}
        yAxisSuffix=" Eth"
        yLabelsOffset={6}
        yAxisInterval={3}
        data={{
          labels: collectionChartDate,
          datasets: [{ data: collectionChartData }]
        }}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { paddingHorizontal: 5, borderRadius: 16 },
          propsForDots: { r: "3" }
        }}
        bezier
      />
    </View>
  )
}

const styles = StyleSheet.create({
  chartContainer: {
    width: Dimensions.get("window").width - 30,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 4,
    borderRadius: 8
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
})

export default Chart;