import React, { useEffect, useState } from "react";
import { Text } from "react-native-elements";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Card } from "react-native-paper";

import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";

import moment from "moment";
import "moment/locale/fr";

function ScoreNewParty(props) {
  const [reservationTableau, setReservationTableau] = useState([]);
  useEffect(() => {
    async function ReservationFromBdd() {
      var rawResponse = await fetch(
        `https://calm-bastion-61741.herokuapp.com/getReservation/${props.userInfo.user.token}/`
      );
      var response = await rawResponse.json();
      setReservationTableau(response.reservation);
    }
    ReservationFromBdd();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titreDiv}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("ScorePageStart")}
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../../assets/previous.png")}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Séléctionner une partie
        </Text>
      </View>
      {ReservedPartyTab(reservationTableau, props)}
    </View>
  );
}

function ReservedPartyTab(tableauRéservation, props) {
  var photo = [require("../../assets/joueur8.jpeg"),require("../../assets/joueur10.jpeg"),require("../../assets/joueur12.jpeg"),require("../../assets/joueur13.jpeg")]
  var gallery = tableauRéservation.map((element, index) => {
    var dateFormat = moment(element.dateReservation).format("L");

    for (const a of element.golfId.parcours) {
      if (a.nomParcours === element.nomParcours) {
        var l = a.parcoursTrou.length;
        var t = a.parcoursTrou;
      }
    }

    return (
      <TouchableOpacity
        key={index}
        style={styles.card}
        onPress={() => {
          props.navigation.navigate("ScorePageScreen", {
            parcours: {
              nomParcours: element.nomParcours,
              typeParcours: l,
              parcoursTrou: t,
            },
          });
        }}
      >
        <Card>
          <Card.Cover
            source={photo[index]}
            style={{ height: 100 }}
          />
          <View style={styles.overlay}>
            <View style={{ flex: 1, height: "100%" }}>
              <Text style={styles.titreImage}>{element.nomParcours}</Text>
            </View>
            <View style={{ flex: 1, height: "40%" }}>
              <Text style={styles.subTitreImage}>
                {element.idJoueur.length}{" "}
                <FontAwesome name="user" size={14} color={"white"} />
              </Text>
              <Text style={styles.subTitreImage}>{l + " trous"}</Text>
            </View>
          </View>
          <Card.Content
            style={{
              height: 70,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.titreCard}>{dateFormat}</Text>
            <Text style={styles.titreCard}>{element.heureReservation}</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  });
  return (
    <ScrollView contentContainerStyle={styles.scroll}>{gallery}</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  titreDiv: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  scroll: {
    marginTop:"3%",
    width: "100%",
    flexDirection:"row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  card: {
    width: "45%",
    margin: "2.5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  overlay: {
    flex: 1,
    borderRadius: 5,
    position: "absolute",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: 100,
    backgroundColor: "#00000080",
  },
  titreImage: {
    fontSize: 13,
    fontWeight: "700",
    color: "white",
    margin: 10,
    width:"90%", 
    height:"100%",
  },
  titreCard: {
    fontSize: 12,
    fontWeight: "700",
    color: "black",
    textAlign: "justify",
    marginTop: 6,
  },
  subTitreImage: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    margin: 1,
    marginRight: 10,
    textAlign: "right",
  },
});

function mapStateToProps(state) {
  return { userInfo: state.userActiveInfo };
}

export default connect(mapStateToProps, null)(ScoreNewParty);
