import { Input, Badge, Text, ListItem, Slider } from "react-native-elements";
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Dimensions,
  Button,
} from "react-native";
import SwipeUpDown from "react-native-swipe-up-down";
import { Entypo } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import * as Location from "expo-location";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function SwipeUpDownGolf(props) {
  const swipeUpDownRef = useRef();
  const [research, setResearch] = useState("");
  const [bgColorFilter1, setBgColorFilter1] = useState("#b3edbf");
  const [bgColorFilter2, setBgColorFilter2] = useState("#b3edbf");
  const [bgColorFilter3, setBgColorFilter3] = useState("#b3edbf");
  const [bgColorFilter4, setBgColorFilter4] = useState("#b3edbf");
  const [colorTextBtn1, setColorTextBtn1] = useState("white");
  const [colorTextBtn2, setColorTextBtn2] = useState("white");
  const [colorTextBtn3, setColorTextBtn3] = useState("white");
  const [colorTextBtn4, setColorTextBtn4] = useState("white");

  const [filter9trous, setFilter9trous] = useState(false);
  const [filter18trous, setFilter18trous] = useState(false);
  const [filterPractice, setFilterPractice] = useState(false);
  const [filterRestauration, setFilterRestauration] = useState(false);
  const [valueKm, setValueKm] = useState(40);
  const [city, setCity] = useState("");

  if (city == "") {
    var userLongitude = props.userLocalisation.longitude;
    var userLatitude = props.userLocalisation.latitude;
  } else {
    var userLongitude = city.longitude;
    var userLatitude = city.latitude;
  }

  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;

  let favoriteGolfsdistance = [
    { longitude: 2, latitude: 43, name: "Coucou" },
    { longitude: 1, latitude: 44, name: "Mon beau soleil" },
    { longitude: 6, latitude: 41, name: "Le golf" },
  ];

  //calcul distance entre user et golf
  var favoriteGolfs = favoriteGolfsdistance.map((l, i) => {
    var golfLatitude = l.latitude;
    var golfLongitude = l.longitude;

    var a =
      0.5 -
      c((userLatitude - golfLatitude) * p) / 2 +
      (c(golfLatitude * p) *
        c(userLatitude * p) *
        (1 - c((userLongitude - golfLongitude) * p))) /
        2;

    var distances = parseInt(12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km

    return (
      <TouchableWithoutFeedback key={Math.random()}>
        <View
          style={{
            marginHorizontal: windowWidth - windowWidth / 1.02,
            padding: windowHeight - windowHeight / 1.009,
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/golfLogo.png")}
            style={{
              borderRadius: 100,
              width: windowWidth / 8,
              height: windowHeight / 18,
              marginVertical: windowHeight - windowHeight / 1.006,
            }}
          />
          <Text style={{ color: "black", fontSize: 14, fontWeight: "500" }}>
            {l.name}
          </Text>
          <Text style={{ color: "grey", fontSize: 11, fontWeight: "300" }}>
            {distances} km
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  });

  var citySearched = async () => {
    var city = await Location.geocodeAsync(research);
    if (city.length > 0) {
      setCity(city[0]);
    } else {
      setCity("");
    }
    props.transferCityToMapscreen(city);
  };

  var inputSearchGolf = (
    <Input
      containerStyle={{
        marginTop: windowHeight - windowHeight / 1.01,
        width: "90%",
        backgroundColor: "white",
        borderRadius: 10,
        height: 50,
      }}
      inputContainerStyle={{ borderBottomWidth: 0 }}
      inputStyle={{ marginLeft: 10 }}
      placeholder="Recherche de golf"
      leftIcon={<Icon name="search" size={24} color="#3AB795" />}
      onPressIn={() => {
        swipeUpDownRef.current.showFull();
      }}
      onChangeText={(val) => setResearch(val)}
      onSubmitEditing={() => {
        citySearched();
        swipeUpDownRef.current.showMini();
      }}
    />
  );

  var filteredGolfs = props.golfInDb[0].result;

  var userLongitude = props.userLocalisation.longitude;
  var userLatitude = props.userLocalisation.latitude;
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;

  //calcul distance geolocalisation vers golf

  for (var golf of filteredGolfs) {
    var golfLatitude = golf.golfAddress.golfLatitude;
    var golfLongitude = golf.golfAddress.golfLongitude;

    var a =
      0.5 -
      c((userLatitude - golfLatitude) * p) / 2 +
      (c(golfLatitude * p) *
        c(userLatitude * p) *
        (1 - c((userLongitude - golfLongitude) * p))) /
        2;

    var distances = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km

    golf.distance = parseInt(distances);
  }

  if (filter9trous) {
    filteredGolfs = filteredGolfs.filter((golf) => golf.neufTrous > 0);
  }

  if (filter18trous) {
    filteredGolfs = filteredGolfs.filter((golf) => golf.dixhuitTrous > 0);
  }

  if (filterPractice) {
    filteredGolfs = filteredGolfs.filter((golf) => golf.practice == true);
  }

  if (filterRestauration) {
    filteredGolfs = filteredGolfs.filter((golf) => golf.restauration == true);
  }

  filteredGolfs = filteredGolfs.filter((golf) => golf.distance <= valueKm);

  var golfList = filteredGolfs.map((l, i) => {
    return (
      <TouchableWithoutFeedback>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("GolfInfo");
            props.onPressList(l.golfName);
          }}
        >
          <ListItem
            key={Math.random()}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#3AB795",
            }}
          >
            <Image
              source={require("../../assets/golfLogo.png")}
              style={{
                borderRadius: 100,
                width: windowWidth / 10,
                height: windowHeight / 22,
              }}
            />
            <ListItem.Content>
              <ListItem.Title style={{ marginBottom: "2%", fontWeight: "500" }}>
                {l.golfName}
              </ListItem.Title>
              <ListItem.Subtitle style={{ color: "grey" }}>
                {l.distance} km
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      </TouchableWithoutFeedback>
    );
  });

  var changeColor1 = () => {
    if (bgColorFilter1 == "#3AB795") {
      setBgColorFilter1("#b3edbf");
      setColorTextBtn1("white");
      setFilter9trous(false);
    } else {
      setBgColorFilter1("#3AB795");
      setColorTextBtn1("black");
      setFilter9trous(true);
    }
  };

  var changeColor2 = () => {
    if (bgColorFilter2 == "#3AB795") {
      setBgColorFilter2("#b3edbf");
      setColorTextBtn2("white");
      setFilter18trous(false);
    } else {
      setBgColorFilter2("#3AB795");
      setColorTextBtn2("black");
      setFilter18trous(true);
    }
  };

  var changeColor3 = () => {
    if (bgColorFilter3 == "#3AB795") {
      setBgColorFilter3("#b3edbf");
      setColorTextBtn3("white");
      setFilterPractice(false);
    } else {
      setFilterPractice(true);
      setColorTextBtn3("black");
      setBgColorFilter3("#3AB795");
    }
  };

  var changeColor4 = () => {
    if (bgColorFilter4 == "#3AB795") {
      setBgColorFilter4("#b3edbf");
      setColorTextBtn4("white");
      setFilterRestauration(false);
    } else {
      setFilterRestauration(true);
      setColorTextBtn4("black");
      setBgColorFilter4("#3AB795");
    }
  };

  return (
    <SwipeUpDown
      style={{
        backgroundColor: "#ededed",
        borderTopWidth: 3,
        borderColor: "lightgrey",
        position: "absolute",
        zIndex: 1,
      }}
      ref={swipeUpDownRef}
      itemMini={() => (
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Entypo
            name="chevron-thin-up"
            size={24}
            color="#3AB795"
            style={{ paddingTop: windowHeight - windowHeight / 1.01 }}
          />
          {inputSearchGolf}
        </View>
      )}
      itemFull={() => (
        <View style={styles.container}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Entypo
              name="chevron-thin-down"
              size={24}
              color="#3AB795"
              style={{ paddingTop: windowHeight - windowHeight / 1.01 }}
            />
          </View>
          <View style={{ display: "flex", alignItems: "center" }}>
            {inputSearchGolf}
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "90%",
                backgroundColor: "white",
                borderRadius: 10,
                marginVertical: windowHeight - windowHeight / 1.02,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "95%",
                  margin: windowWidth - windowWidth / 1.03,
                }}
              >
                <View style={styles.filters}>
                  <Badge
                    onPress={() => changeColor1()}
                    status="success"
                    value="9 trous"
                    badgeStyle={{
                      height: windowHeight / 25,
                      width: windowWidth / 6,
                      backgroundColor: bgColorFilter1,
                    }}
                    textStyle={{ color: colorTextBtn1 }}
                  />
                  <Badge
                    onPress={() => changeColor2()}
                    status="success"
                    value="18 trous"
                    badgeStyle={{
                      height: windowHeight / 25,
                      width: windowWidth / 6,
                      backgroundColor: bgColorFilter2,
                    }}
                    textStyle={{ color: colorTextBtn2 }}
                  />
                  <Badge
                    onPress={() => changeColor3()}
                    status="success"
                    value="Practice"
                    badgeStyle={{
                      height: windowHeight / 25,
                      width: windowWidth / 6,
                      backgroundColor: bgColorFilter3,
                    }}
                    textStyle={{ color: colorTextBtn3 }}
                  />
                  <Badge
                    onPress={() => changeColor4()}
                    status="success"
                    value="Restauration"
                    badgeStyle={{
                      height: windowHeight / 25,
                      width: windowWidth / 5,
                      backgroundColor: bgColorFilter4,
                    }}
                    textStyle={{ color: colorTextBtn4 }}
                  />
                </View>
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      marginTop: windowHeight - windowHeight / 1.01,
                      color: "grey",
                    }}
                  >
                    Distance : {valueKm} km
                  </Text>
                  <Slider
                    value={valueKm}
                    onValueChange={setValueKm}
                    maximumValue={200}
                    minimumValue={0}
                    step={20}
                    allowTouchTrack
                    trackStyle={{ height: 5, backgroundColor: "transparent" }}
                    minimumTrackTintColor="#3AB795"
                    maximumTrackTintColor="#b3edbf"
                    thumbStyle={{
                      height: 20,
                      width: 20,
                      backgroundColor: "transparent",
                    }}
                    thumbProps={{
                      children: (
                        <Icon
                          name="circle"
                          type="font-awesome"
                          size={20}
                          reverse
                          containerStyle={{ bottom: 20, right: 20 }}
                          color="#3AB795"
                        />
                      ),
                    }}
                  />
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              marginLeft: windowWidth / 17,
              marginBottom: windowHeight - windowHeight / 1.01,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "grey",
              }}
            >
              Favoris
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              height: "70%",
            }}
          >
            <View
              style={{
                height: "18%",
                marginBottom: windowHeight - windowHeight / 1.03,
              }}
            >
              <ScrollView
                horizontal={true}
                style={{
                  width: "90%",
                  height: "12%",
                  backgroundColor: "white",
                  borderRadius: 10,
                }}
                contentContainerStyle={{
                  alignItems: "center",
                }}
              >
                {favoriteGolfs}
                <TouchableWithoutFeedback>
                  <View
                    style={{
                      marginHorizontal: windowWidth - windowWidth / 1.02,
                      padding: windowHeight - windowHeight / 1.009,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../../assets/ajouterFav.png")}
                      style={{
                        borderRadius: 100,
                        width: windowWidth / 8,
                        height: windowHeight / 18,
                        marginVertical: windowHeight - windowHeight / 1.006,
                      }}
                    />
                    <Text
                      style={{
                        color: "black",
                        fontSize: 14,
                        fontWeight: "500",
                      }}
                    >
                      Ajouter
                    </Text>
                    <Text
                      style={{ color: "grey", fontSize: 11, fontWeight: "300" }}
                    >
                      {"  "}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </View>
            <View
              style={{
                height: "57%",
                width: "100%",
                alignItems: "center",
              }}
            >
              <ScrollView
                style={{
                  borderRadius: 10,
                  width: "93%",
                }}
              >
                {golfList}
              </ScrollView>
            </View>
          </View>
        </View>
      )}
      extraMarginTop={windowHeight - windowHeight / 1.04}
      disableSwipeIcon={true}
      disablePressToShow={true} // Press item mini to show full
      swipeHeight={180}
      animation="spring"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: windowWidth - windowWidth / 1.01,
    width: "100%",
  },
});

function mapStateToProps(state) {
  return { golfInDb: state.golf, userLocalisation: state.localisation };
}

function mapDispatchToProps(dispatch) {
  return {
    onPressList: function (golfName) {
      dispatch({ type: "AddGolfName", name: golfName });
    },
    transferCityToMapscreen: function (cityGolf) {
      dispatch({ type: "transferCity", cityGolf });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SwipeUpDownGolf);
