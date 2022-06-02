import React, { useState } from "react";
import { Text, Input, ListItem } from "react-native-elements";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";

function ScoreNewParty(props) {
  var tableau = [
    {
      date: "19 mars 1996",
      heure: "9h30",
      nombreJoueur: 3,
      nomParcours: "Beau soleil",
      trou: 18,
      url: require("../../assets/practice.jpeg"),
    },
    {
      date: "19 mars 1996",
      heure: "9h30",
      nombreJoueur: 3,
      nomParcours: "Beau soleil",
      trou: 18,
      url: require("../../assets/practice.jpeg"),
    },
    {
      date: "19 mars 1996",
      heure: "9h30",
      nombreJoueur: 3,
      nomParcours: "Beau soleil",
      trou: 18,
      url: require("../../assets/practice.jpeg"),
    },
    {
      date: "19 mars 1996",
      heure: "9h30",
      nombreJoueur: 3,
      nomParcours: "Beau soleil",
      trou: 18,
      url: require("../../assets/practice.jpeg"),
    },
    {
      date: "19 mars 1996",
      heure: "9h30",
      nombreJoueur: 3,
      nomParcours: "Beau soleil",
      trou: 18,
      url: require("../../assets/practice.jpeg"),
    },
    {
      date: "19 mars 1996",
      heure: "9h30",
      nombreJoueur: 3,
      nomParcours: "Beau soleil",
      trou: 18,
      url: require("../../assets/practice.jpeg"),
    },
    {
      date: "19 mars 1996",
      heure: "9h30",
      nombreJoueur: 3,
      nomParcours: "Beau soleil",
      trou: 18,
      url: require("../../assets/practice.jpeg"),
    },
    {
      date: "19 mars 1996",
      heure: "9h30",
      nombreJoueur: 3,
      nomParcours: "Beau soleil",
      trou: 18,
      url: require("../../assets/practice.jpeg"),
    },
    {
      date: "19 mars 1996",
      heure: "9h30",
      nombreJoueur: 3,
      nomParcours: "Beau soleil",
      trou: 18,
      url: require("../../assets/practice.jpeg"),
    },
    {
      date: "19 mars 1996",
      heure: "9h30",
      nombreJoueur: 3,
      nomParcours: "Beau soleil",
      trou: 18,
      url: require("../../assets/practice.jpeg"),
    },
    {
      date: "19 mars 1996",
      heure: "9h30",
      nombreJoueur: 3,
      nomParcours: "Beau soleil",
      trou: 18,
      url: require("../../assets/practice.jpeg"),
    },
    {
      date: "19 mars 1996",
      heure: "9h30",
      nombreJoueur: 3,
      nomParcours: "Beau soleil",
      trou: 18,
      url: require("../../assets/practice.jpeg"),
    },
    {
      date: "19 mars 1996",
      heure: "9h30",
      nombreJoueur: 3,
      nomParcours: "Beau soleil",
      trou: 18,
      url: require("../../assets/practice.jpeg"),
    },
    {
      date: "19 mars 1996",
      heure: "9h30",
      nombreJoueur: 3,
      nomParcours: "Beau soleil",
      trou: 18,
      url: require("../../assets/practice.jpeg"),
    },
    {
      date: "19 mars 1996",
      heure: "9h30",
      nombreJoueur: 3,
      nomParcours: "Beau soleil",
      trou: 18,
      url: require("../../assets/practice.jpeg"),
    },
    {
      date: "19 mars 1996",
      heure: "9h30",
      nombreJoueur: 3,
      nomParcours: "Beau soleil",
      trou: 18,
      url: require("../../assets/practice.jpeg"),
    },
    {
      date: "19 mars 1996",
      heure: "9h30",
      nombreJoueur: 3,
      nomParcours: "Beau soleil",
      trou: 18,
      url: require("../../assets/practice.jpeg"),
    },
    {
      date: "19 mars 1996",
      heure: "9h30",
      nombreJoueur: 3,
      nomParcours: "Beau soleil",
      trou: 18,
      url: require("../../assets/practice.jpeg"),
    },
  ];
  const [value, setValue] = useState("");
  const [tousLesParcours, setTousLesParcours] = useState([]);

  var allGolfs = props.golfInDb[0].result;
  var allParcours = [];

  for (var golf of allGolfs) {
    for (var parcours of golf.parcours) {
      allParcours.push({
        parcoursName: parcours.nomParcours,
        nombreTrous: parcours.parcoursTrou.length,
      });
    }
  }

  var parcoursSearched = () => {
    var filteredParcours = allParcours.filter(
      (elt) => elt.parcoursName == value
    );
    if (filteredParcours.length > 0) {
      setTousLesParcours(filteredParcours);
    } else {
      setTousLesParcours([]);
    }
  };

  var parcoursAAfficher = [];

  if (tousLesParcours.length > 0) {
    parcoursAAfficher = tousLesParcours;
  } else {
    parcoursAAfficher = allParcours;
  }

  var golfList = parcoursAAfficher.map((element, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => props.navigation.navigate("ScorePageScreen")}
      >
        <ListItem
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#3AB795",
            width: "100%",
          }}
        >
          <Image
            source={require("../../assets/golfLogo.png")}
            style={{
              borderRadius: 100,
              width: 25,
              height: 25,
            }}
          />
          <ListItem.Content>
            <ListItem.Title>{element.parcoursName}</ListItem.Title>
            <ListItem.Subtitle>{element.nombreTrous} trous</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    );
  });

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
          Chercher un parcours
        </Text>
      </View>
      <View style={{ alignItems: "center", width: "100%" }}>
        <Input
          containerStyle={{
            marginTop: "5%",
            width: "90%",
            backgroundColor: "white",
            borderRadius: 10,
            height: 50,
          }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          inputStyle={{ marginLeft: 10 }}
          placeholder="Nom parcours"
          leftIcon={<Icon name="search" size={24} color="#3AB795" />}
          onChangeText={(val) => setValue(val)}
          onSubmitEditing={() => parcoursSearched()}
        />
        <View style={{ width: "100%" }}>
          <ScrollView style={{ marginTop: 10, height: "83%" }}>
            {golfList}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: "#ededed",
  },
  titreDiv: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

function mapStateToProps(state) {
  return { golfInDb: state.golf };
}

export default connect(mapStateToProps, null)(ScoreNewParty);
