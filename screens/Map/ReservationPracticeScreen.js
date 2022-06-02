import { Text, Button, ButtonGroup, Switch } from "react-native-elements";
import { View, Dimensions, Image, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function ReservationPracticeScreen(props) {
  useEffect(() => {
    async function UserActiveFromBdd() {
      AsyncStorage.getItem("info User", async function (error, data) {
        var userData = JSON.parse(data);
        console.log("useEffectUserData", userData);
        if (userData.token) {
          var rawResponse = await fetch(
            `https://calm-bastion-61741.herokuapp.com/getUserByToken/${userData.token}/`
          );
          var response = await rawResponse.json();
          console.log("useEffectRes", response);
          props.onPressVoirDispo(response);
        }
      });
    }
    UserActiveFromBdd();
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [checkedOpenToBuddies, setCheckedOpenToBuddies] = useState(false);
  const [checkedBuddiesOnly, setCheckedBuddiesOnly] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.log("optionNbTrou", selectedIndex);
  console.log("Switch Buddies", checkedBuddiesOnly);
  console.log("Switch Open Session To Buddies", checkedOpenToBuddies);

  var golfSelectInfo = props.golfInDb.filter(
    (golf) => golf.golfName === props.golfName
  );
  var handlePress = (NbTrous, OpenToBuddies, BuddiesOnly) => {
    var trous = "";
    if (NbTrous == 0) {
      trous = "18 trous";
    } else if (NbTrous == 1) {
      trous = "9 trous";
    }

    var typeReservation = "";
    if (OpenToBuddies & !BuddiesOnly) {
      typeReservation = "ouvertBuddy";
    } else if (!OpenToBuddies && !BuddiesOnly) {
      typeReservation = "reservationClassique";
    }
    if (
      trous &&
      ((OpenToBuddies == true && BuddiesOnly == false) ||
        (OpenToBuddies == false && BuddiesOnly == true) ||
        (!OpenToBuddies && !BuddiesOnly))
    ) {
      props.navigation.navigate("Disponibilite", {
        NombreTrous: trous,
        checkedBuddiesOnly: BuddiesOnly,
        checkedOpenToBuddies: OpenToBuddies,
        typeReservation: typeReservation,
      });
    } else if (OpenToBuddies && BuddiesOnly) {
      setErrorMessage("Selectionne une seul option");
    }
  };
  console.log("reservPractice");
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
        source={require("../../assets/paysage2.jpeg")}
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
          onPress={() => props.navigation.navigate("GolfInfo")}
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
            alignItems: "center",
            width: windowWidth - windowWidth / 15,
            marginBottom: windowHeight - windowHeight / 1.02,
          }}
        >
          <Text style={{ fontSize: 30 }}>{golfSelectInfo[0].golfName}</Text>
        </View>
        <View
          style={{
            width: windowWidth - windowWidth / 15,
            height: windowHeight - windowHeight / 1.5,
            marginBottom: windowHeight - windowHeight / 1.05,
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              width: "90%",
              height: "95%",
            }}
          >
            <View
              style={{
                height: "30%",
                justifyContent: "center",
              }}
            >
              {/*SELECTION NOMBRE DE TROUS*/}
              <ButtonGroup
                buttons={["18 trous", "9 trous"]}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                  setSelectedIndex(value);
                }}
                containerStyle={{
                  borderRadius: 10,
                  backgroundColor: "#b3edbf",
                  borderColor: "white",
                }}
                selectedButtonStyle={{ backgroundColor: "#3AB795" }}
              />
              {errorMessage.length > 1 ? (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errorMessage}
                </Text>
              ) : null}
            </View>
            <View
              style={{
                height: "70%",
              }}
            >
              {/*Radio Seulement créneaux ouverts aux buddies*/}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "50%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "70%",
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: "400" }}>
                    Seulement créneaux ouverts aux buddies
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    alignItems: "center",
                  }}
                >
                  <Switch
                    value={checkedBuddiesOnly}
                    onValueChange={(value) => setCheckedBuddiesOnly(value)}
                    color="#3AB795"
                  />
                </View>
              </View>
              {/*Radio Proposer mon créneau aux buddies*/}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "50%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "70%",
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: "400" }}>
                    Proposer mon créneau aux buddies
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    alignItems: "center",
                  }}
                >
                  <Switch
                    value={checkedOpenToBuddies}
                    onValueChange={(value) => setCheckedOpenToBuddies(value)}
                    color="#3AB795"
                  />
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              width: windowWidth - windowWidth / 15,
              height: windowHeight - windowHeight / 1.1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: windowWidth - windowWidth / 1.15,
            }}
          >
            <Button
              buttonStyle={{
                backgroundColor: "#3AB795",
                height: windowHeight - windowHeight / 1.06,
              }}
              title="Voir les disponibilités"
              containerStyle={{
                borderRadius: 10,
                width: "100%",
              }}
              onPress={() => {
                handlePress(
                  selectedIndex,
                  checkedOpenToBuddies,
                  checkedBuddiesOnly
                );
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

function mapStateToProps(state) {
  return { golfInDb: state.golf[0].result, golfName: state.nameGolfSelect };
}

export default connect(mapStateToProps, null)(ReservationPracticeScreen);
