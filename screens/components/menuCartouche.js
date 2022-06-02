import { Text } from "react-native-elements";
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity } from "react-native";

export default function cartouche(props, titre, photo, chemin) {
  return (
      <TouchableOpacity style={styles.div} onPress={() =>  props.navigation.navigate(chemin) }>
        <ImageBackground source={photo} style={styles.image} imageStyle={{ borderRadius: 5 }}>
          <View style={styles.overlay}>
            <Text style={styles.titreImage}>{titre}</Text>
            <Image
              style={{ width: 40, height: 40, marginBottom: 5, tintColor: "white" }}
              source={require("../../assets/next.png")} />
          </View>
        </ImageBackground>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  div: {
    width: '95%',
    height: '12%',
    borderRadius: 5,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    height: '100%',
  },
  overlay: {
    flex: 1,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    backgroundColor: "#00000080"
  },
  titreImage: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    padding: 10,
  }
})
