import { Text, Button } from "react-native-elements";
import { View, Dimensions, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Entypo } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function recapReservation(props) {
  var golfSelectInfo = props.golfInDb.filter(
    (golf) => golf.golfName === props.golfName
  );

  var NbTrousInt = parseInt(props.route.params.NombreTrous);
  //   console.log("userInfoREDUX=>", props.userInfo.user._id);
  // Je recupere les info du parcour selectionner
  var parcoursSelect = [];

  for (var i = 0; i < golfSelectInfo[0].parcours.length; i++) {
    if (golfSelectInfo[0].parcours[i].parcoursTrou.length == NbTrousInt) {
      parcoursSelect.push(golfSelectInfo[0].parcours[i]);
    }
  }

  var dayOfWeek = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const date = new Date(props.route.params.dateSelect);

  var day = dayOfWeek[date.getDay()];
  var month = monthNames[date.getMonth()];

  const [isModalVisible, setModalVisible] = useState(false);

  //   console.log("okok", parcoursSelect);
  //   console.log("navigate", props.route.params);
  const [recapFinalForBdd, setRecapFinalForBdd] = useState({});

  console.log("coucou", props.userInfo);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  var handleSubmit = async () => {
    var addReservation = await fetch(
      "https://calm-bastion-61741.herokuapp.com/reservation",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `heureReservation=${recapFinalForBdd.heureReservation}&date=${recapFinalForBdd.dateReservation}&type=${recapFinalForBdd.typeReservation}&idJoueur=${recapFinalForBdd.idJoueur}&golfId=${recapFinalForBdd.golfId}&nomParcours=${recapFinalForBdd.nomParcours}`,
      }
    );

    var response = await addReservation.json();

    var idReservation = response.result._id;
    console.log("non", response);
    if (idReservation) {
      var addReservationToUser = await fetch(
        `https://calm-bastion-61741.herokuapp.com/userReservation/${props.userInfo.user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `idReservationFromFront=${idReservation}`,
        }
      );
    }

    props.navigation.navigate("Map");
    toggleModal();
  };
  console.log("recap", recapFinalForBdd);

  var handlePress = () => {
    toggleModal();
    setRecapFinalForBdd({
      dateReservation: new Date(props.route.params.dateSelect),
      heureReservation: props.route.params.hourSelect,
      typeReservation: props.route.params.typeReservation,
      idJoueur: props.userInfo.user._id,
      golfId: golfSelectInfo[0]._id,
      nomParcours: parcoursSelect[0].nomParcours,
    });
  };
  //   console.log("recapReserva", recapFinalForBdd);
  if (
    props.route.params.checkedOpenToBuddies ||
    (!props.route.params.checkedOpenToBuddies &&
      !props.route.params.checkedBuddiesOnly)
  ) {
    return (
      <View
        style={{ flex: 1, backgroundColor: "#ededed", alignItems: "center" }}
      >
        <Modal
          isVisible={isModalVisible}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderRadius: 10,
              width: windowWidth - windowWidth / 9,
              height: windowHeight - windowHeight / 1.3,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                fontSize: 20,
                marginTop: windowHeight - windowHeight / 1.02,
              }}
            >
              Réservation validée !
            </Text>
            <Image
              style={{
                width: "20%",
                height: "42%",
                marginVertical: windowHeight - windowHeight / 1.02,
              }}
              source={require("../../assets/icons8-vérifié.gif")}
            />
            <View
              style={{
                width: "90%",
                marginBottom: windowHeight - windowHeight / 1.02,
              }}
            >
              <Button
                buttonStyle={{
                  backgroundColor: "#3AB795",
                  height: windowHeight - windowHeight / 1.05,
                }}
                containerStyle={{
                  borderRadius: 10,
                  width: "100%",
                }}
                title="Ok"
                onPress={() => handleSubmit()}
              />
            </View>
          </View>
        </Modal>
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
            onPress={() => props.navigation.navigate("Disponibilite")}
          />
        </TouchableOpacity>
        <View
          style={{
            marginTop: windowHeight - windowHeight / 1.11,
          }}
        >
          <View
            style={{
              alignItems: "center",
              width: windowWidth - windowWidth / 15,
              marginBottom: windowHeight - windowHeight / 1.1,
            }}
          >
            <Text style={{ fontSize: 30 }}>{golfSelectInfo[0].golfName}</Text>
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              marginVertical: windowHeight - windowHeight / 1.02,
              color: "grey",
            }}
          >
            Récapitulatif de la réservation
          </Text>
          <View
            style={{
              width: windowWidth - windowWidth / 15,
              height: windowHeight - windowHeight / 1.3,
              marginBottom: windowHeight - windowHeight / 2,
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <View
              style={{
                width: "90%",
                height: "100%",
              }}
            >
              <View
                style={{
                  height: "20%",
                  marginTop: windowHeight - windowHeight / 1.02,
                }}
              ></View>
              <View
                style={{
                  height: "80%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    height: "40%",
                    width: "100%",
                  }}
                >
                  <Image
                    style={{
                      height: "100%",
                      width: "40%",
                      marginRight: windowHeight - windowHeight / 1.01,
                      alignItems: "center",
                    }}
                    source={require("../../assets/paysage3.jpeg")}
                  />
                  <View
                    style={{
                      justifyContent: "center",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "500",
                          marginBottom: windowHeight - windowHeight / 1.01,
                        }}
                      >
                        {parcoursSelect[0].nomParcours}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ color: "grey" }}>
                        {props.route.params.NombreTrous} - {day}{" "}
                        {date.getDate()} {month} {props.route.params.hourSelect}
                      </Text>
                    </View>
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
                marginTop: windowWidth - windowWidth / 2.5,
              }}
            >
              <Button
                buttonStyle={{
                  backgroundColor: "#3AB795",
                  height: windowHeight - windowHeight / 1.06,
                }}
                title="Payer"
                containerStyle={{
                  borderRadius: 10,
                  width: "100%",
                }}
                onPress={() => {
                  handlePress();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  } else if (props.route.params.checkedBuddiesOnly) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>checkedBuddiesOnly</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    golfInDb: state.golf[0].result,
    golfName: state.nameGolfSelect,
    user: state.user,
    userInfo: state.userActiveInfo,
  };
}

export default connect(mapStateToProps, null)(recapReservation);
