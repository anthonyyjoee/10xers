import React from "react";
import { View, Text, Image, ImageBackground } from "react-native";

const Header = ({ collection, tokenOwned }) => {
  return (
    <View style={{ width: "100%", height: "30%" }}>
      <View style={{ width: "100%", height: "80%" }}>
        <ImageBackground source={{ uri: collection.banner_image_url }} resizeMode="cover" style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
          <View style={{ padding: 5, backgroundColor: 'white', borderRadius: 12 }}>
            <Image source={{ uri: collection.image_url }} style={{ width: 100, height: 100, borderRadius: 8 }} />
          </View>
        </ImageBackground>

        <View style={{ paddingHorizontal: 10, width: '100%', height: '35%', marginTop: -30 }}>
          <View style={{ backgroundColor: 'white', height: '100%', width: '100%', borderRadius: 12, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <View style={{ width: "32%", height: "100%", marginHorizontal: 2, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 12, fontWeight: "500", marginTop: 5, color: "black" }}>
                Tokens
              </Text>

              <Text style={{ fontSize: 15, fontWeight: "500", color: "black" }}>
                {tokenOwned}
              </Text>
            </View>

            <View style={{ backgroundColor: "gray", height: "80%", borderWidth: 0.5 }}></View>

            <View style={{ width: "32%", height: "100%", marginHorizontal: 2, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 12, fontWeight: "500", marginTop: 5, color: "black" }}>
                Total Volume
              </Text>

              <Text style={{ fontSize: 15, fontWeight: "500", color: "black" }}>
                {parseFloat(collection.total_volume).toFixed(2)}
              </Text>
            </View>

            <View style={{ backgroundColor: "gray", height: "80%", borderWidth: 0.5 }}></View>

            <View style={{ width: "32%", height: "100%", marginHorizontal: 2, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 12, fontWeight: "500", marginTop: 5, color: "black" }}>
                One Day Change
              </Text>

              <Text style={{ fontSize: 15, fontWeight: "500", color: "black" }}>
                {parseFloat(collection.one_day_change).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Header