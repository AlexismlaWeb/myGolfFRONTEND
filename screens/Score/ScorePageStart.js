import { Text } from "react-native-elements";
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity } from "react-native";
import cartouche from "../components/menuCartouche"
import {connect} from 'react-redux'

export function ScorePageStart(props) {

  var partieLogin

  if (props.token) {
     partieLogin = cartouche(props, "Partie réservée", require("../../assets/closeBall1.jpeg"), "ScoreReservedParty")
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, fontWeight: "bold", margin: 20 }}>Nouvelle Partie</Text>
      {partieLogin}
      {cartouche(props, "Sans réservation", require("../../assets/joueur3.jpeg"), "ScoreNewParty")}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: "center",
  },
})

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(ScorePageStart);
