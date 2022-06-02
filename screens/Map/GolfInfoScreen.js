import React, { useState } from "react";
import { Text, Button } from "react-native-elements";
import { View, Dimensions, Image, TouchableOpacity } from "react-native";
import { Link } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { connect } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
function GolfInfoScreen(props) {
  var golfSelectInfo = props.golfInDb.filter(
    (golf) => golf.golfName === props.golfName
  );

  var Reserver = () => {
    if (props.token) {
      props.navigation.navigate("Reserv");
    } else {
      props.navigation.navigate("Login");
    }
  };

  const [golfRating, setGolfRating] = useState(4)

  var tabGolfRating = [];
  for (var i = 0; i < 5; i++) {
    var starColor = "star-o";
    if (i < golfRating) {
      starColor = "star";
    }
    let count = i + 1;
    tabGolfRating.push(
      <FontAwesome
        onPress={() => setGolfRating(count)}
        name={starColor}
        size={24}
        color="#f1c40f"
      />
    );
  }
  

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ededed",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          height: "38%",
          width: windowWidth,
          marginBottom: windowHeight - windowHeight / 1.02,
        }}
        source={require("../../assets/paysage3.jpeg")}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          position: "absolute",
          left: windowWidth - windowWidth / 1.01,
          top: windowHeight - windowHeight / 1.038,
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 10,
        }}
      >
        <Entypo
          name="chevron-left"
          size={40}
          color="#3AB795"
          onPress={() => props.navigation.navigate("Map")}
        />
      </TouchableOpacity>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: windowWidth - windowWidth / 15,
            marginVertical: windowHeight - windowHeight / 1.01,
          }}
        >
          <Text style={{ fontSize: 20, width: "70%" }}>
            {golfSelectInfo[0].golfName} -{" "}
            {golfSelectInfo[0].golfAddress.golfCity}
          </Text>
          <Button
            buttonStyle={{
              backgroundColor: "#3AB795",
            }}
            title="Reserver"
            containerStyle={{
              borderRadius: 10,
              width: "30%",
            }}
            onPress={() => Reserver()}
          />
        </View>
        <View
          style={{
            width: windowWidth - windowWidth / 15,
            height: windowHeight - windowHeight / 1.03,
          }}
        >
          <Text
            style={{
              marginBottom: windowHeight - windowHeight / 1.01,
              color: "grey",
            }}
          >
            Détails
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            width: windowWidth - windowWidth / 15,
            height: windowHeight - windowHeight / 1.4,
            marginBottom: windowHeight - windowHeight / 1.05,
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              width: "95%",
              height: "95%",
              justifyContent: "space-around",
            }}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#3AB795",
                height: "30%",
              }}
            >
              <Text style={{ color: "#939393", marginVertical: "4%" }}>
                Télephone
              </Text>
              <Text style={{ color: "#0000FF" }}>+33 1 51 80 39 67</Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#3AB795",
                height: "30%",
              }}
            >
              <Text style={{ color: "#939393", marginVertical: "4%" }}>
                Site Web
              </Text>
              <Link style={{ color: "#0000FF" }}>golfweb.com</Link>
            </View>
            <View
              style={{
                justifyContent: "space-around",
                height: "40%",
              }}
            >
              <View>
                <Text style={{ color: "#939393" }}>Adresse</Text>
              </View>
              <View>
                <Text>{golfSelectInfo[0].golfAddress.golfAddressName}</Text>
                <Text>
                  {golfSelectInfo[0].golfAddress.golfPostCode}{" "}
                  {golfSelectInfo[0].golfAddress.golfCity}
                </Text>
                <Text>France</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            width: windowWidth - windowWidth / 15,
            height: windowHeight - windowHeight / 1.08,
            marginBottom: windowHeight - windowHeight / 1.05,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Text
            style={{
              color: "#939393",
            }}
          >
            Note du golf
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome name="star" size={24} color="#F1C40F" />
            <FontAwesome name="star" size={24} color="#F1C40F" />
            <FontAwesome name="star" size={24} color="#F1C40F" />
            <FontAwesome name="star" size={24} color="#F1C40F" />
            <FontAwesome name="star-o" size={24} color="#F1C40F" />
          </View>
        </View>
      </View>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    golfInDb: state.golf[0].result,
    golfName: state.nameGolfSelect,
    token: state.token,
  };
}

export default connect(mapStateToProps, null)(GolfInfoScreen);
