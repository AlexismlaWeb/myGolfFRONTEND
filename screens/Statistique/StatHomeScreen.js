import { Text } from "react-native-elements";
import { StyleSheet, View,TouchableOpacity,Image, ScrollView} from "react-native";
import {Card } from 'react-native-paper';
import cartouche from "../components/menuCartouche"
import { FontAwesome } from "@expo/vector-icons";
export default function StatHomeScreen(props) {
  var tableau = [{ date: "19 mars 1996", heure: "9h30", nombreJoueur: 3, nomParcours: 'Beau soleil', trou: 18, url: require("../../assets/practice.jpeg") }, { date: "19 mars 1996", heure: "9h30", nombreJoueur: 3, nomParcours: 'Beau soleil', trou: 18, url: require("../../assets/practice.jpeg") }, { date: "19 mars 1996", heure: "9h30", nombreJoueur: 3, nomParcours: 'Beau soleil', trou: 18, url: require("../../assets/practice.jpeg") }, { date: "19 mars 1996", heure: "9h30", nombreJoueur: 3, nomParcours: 'Beau soleil', trou: 18, url: require("../../assets/practice.jpeg") }, { date: "19 mars 1996", heure: "9h30", nombreJoueur: 3, nomParcours: 'Beau soleil', trou: 18, url: require("../../assets/practice.jpeg") }, { date: "19 mars 1996", heure: "9h30", nombreJoueur: 3, nomParcours: 'Beau soleil', trou: 18, url: require("../../assets/practice.jpeg") }, { date: "19 mars 1996", heure: "9h30", nombreJoueur: 3, nomParcours: 'Beau soleil', trou: 18, url: require("../../assets/practice.jpeg") }, { date: "19 mars 1996", heure: "9h30", nombreJoueur: 3, nomParcours: 'Beau soleil', trou: 18, url: require("../../assets/practice.jpeg") }, { date: "19 mars 1996", heure: "9h30", nombreJoueur: 3, nomParcours: 'Beau soleil', trou: 18, url: require("../../assets/practice.jpeg") }]

  return (
    <View style={styles.container}>
      <View style={styles.titreDiv}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
          <Image style={{ width: 40, height: 40 }} source={require("../../assets/previous.png")} />
        </TouchableOpacity>
        <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: 'center', marginBottom: 10 }}>Stat Home</Text>
      </View>
      {cartouche(props, "Statistique générale", require("../../assets/closeBall1.jpeg"), "StatistiqueUser")}
      <Text style={{fontSize:18, fontWeight:"600", textAlign:"center", margin:5}}>Statistique par parcours effectués</Text>
      {ReservedPartyTab(tableau, props)}
    </View>
  );
}

function ReservedPartyTab(tableauRéservation, props) {
  var gallery = tableauRéservation.map((element, index) => {
    return (
      <TouchableOpacity key={index} style={styles.card} onPress={() => { props.navigation.navigate('') }}>
        <Card>
          <Card.Cover source={element.url} style={{ height: 100 }} />
          <View style={styles.overlay}>
            <View style={{ flex: 1, height: "100%" }}>
              <Text style={styles.titreImage}>{element.nomParcours}</Text>
            </View>
            <View style={{ flex: 1, height: "40%" }}>
              <Text style={styles.subTitreImage}>{element.nombreJoueur} <FontAwesome name="user" size={14} color={"white"} /></Text>
              <Text style={styles.subTitreImage}>{element.trou + " trous"}</Text>
            </View>
          </View>
          <Card.Content style={{ height: 70, justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.titreCard}>{element.date}</Text>
            <Text style={styles.titreCard}>{element.heure}</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>)
  })
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      {gallery}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  titreDiv: {
    flexDirection: 'column',
    justifyContent: "space-between",
  },
  scroll: {
    flexGrow: 1,
    width: '100%',
    alignItems: "center",
    flexWrap: "wrap",
    height: 1000,
  },
  card: {
    width: '45%',
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
    position: 'absolute',
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: 100,
    backgroundColor: "#00000080",
  },
  titreImage: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    margin: 10,
  },
  titreCard: {
    fontSize: 18,
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
    textAlign: "right"
  }
})
