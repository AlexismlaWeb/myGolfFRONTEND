import { Text, Button, Input } from "react-native-elements";
import {
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CalendarPicker from "react-native-calendar-picker";
import RNPickerSelect from "react-native-picker-select";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function DisponibilitesScreen(props) {
  const [dateSelect, setDateSelect] = useState(null);
  const [hourSelect, setHourSelect] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [nbJoueur, setNbJoueur] = useState(0);
  const [emailJoueurs, setEmailJoueurs] = useState([]);
  const [textInputEmail, setTextInputEmail] = useState("");
  var hours = ["9h15", "10h15", "11h30", "12h45", "14h30", "15h45", "16h30"];

  var height = windowHeight - windowHeight / 3.5;
  if (
    !props.route.params.checkedBuddiesOnly &&
    !props.route.params.checkedOpenToBuddies
  ) {
    var height = windowHeight - windowHeight / 3.5;
  }

  var golfSelectInfo = props.golfInDb.filter(
    (golf) => golf.golfName === props.golfName
  );

  const minDate = new Date(); // Today
  const maxDate = new Date(2023, 6, 3);

  console.log("navigate", props.route.params);

  const ButtonHours = hours.map((hours, i) => {
    const [colorButton, setColorButton] = useState("#b3edbf");
    const [colorTextBtn, setColorTextBtn] = useState("black");

    var buttonChangeColor = () => {
      if (colorButton === "#b3edbf") {
        setColorButton("#3AB795");
        setColorTextBtn("white");
      } else {
        setColorButton("#b3edbf");
        setColorTextBtn("black");
        hours = "";
      }
    };
    return (
      <TouchableWithoutFeedback key={Math.random()}>
        <View style={{ marginVertical: 4, marginHorizontal: "10%" }}>
          <Button
            buttonStyle={{
              backgroundColor: colorButton,
              height: windowHeight - windowHeight / 1.05,
            }}
            title={hours}
            containerStyle={{
              borderRadius: 10,
              width: "100%",
            }}
            titleStyle={{ color: colorTextBtn }}
            onPress={() => {
              setColorButton(buttonChangeColor);
              setHourSelect(hours);
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  });

  console.log("dispo", props.route.params);
  var handlePress = (date, hour) => {
    if (date && hour) {
      props.navigation.navigate("Recap", {
        dateSelect: date,
        hourSelect: hour,
        NombreTrous: props.route.params.NombreTrous,
        checkedBuddiesOnly: props.route.params.checkedBuddiesOnly,
        checkedOpenToBuddies: props.route.params.checkedOpenToBuddies,
        typeReservation: props.route.params.typeReservation,
      });
    } else if (!date) {
      setErrorMessage("Sélectionne une date");
    } else if (!hour) {
      setErrorMessage("Sélectionne une heure");
    }
  };

  let temp = [];

  var handleSubmit = (inputText) => {
    setEmailJoueurs((prevState) => [...prevState, inputText]);
  };

  if (emailJoueurs.length < nbJoueur) {
    console.log("oui", emailJoueurs);
  } else {
    console.log("PLUS DE PLACE");
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ededed",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          position: "absolute",
          left: windowWidth - windowWidth / 0.99,
          top: windowHeight - windowHeight / 1.037,
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 10,
        }}
      >
        <Entypo
          name="chevron-left"
          size={40}
          color="#3AB795"
          onPress={() => props.navigation.navigate("Reserv")}
        />
      </TouchableOpacity>
      <View
        style={{
          alignItems: "center",
          marginTop: windowHeight - windowHeight / 1.05,
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            width: windowWidth - windowWidth / 6,
            marginBottom: windowHeight - windowHeight / 1.02,
          }}
        >
          <Text style={{ fontSize: 30 }}>{golfSelectInfo[0].golfName}</Text>
        </View>

        <View
          style={{
            width: windowWidth - windowWidth / 15,
            height: height,
            marginBottom: windowHeight - windowHeight / 1.01,
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
            {/*Calendrier*/}
            <CalendarPicker
              minDate={minDate}
              maxDate={maxDate}
              onDateChange={(date) => {
                setDateSelect(date);
                console.log(date);
              }}
              selectedDayColor="#3AB795"
              weekdays={["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]}
              months={[
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
              ]}
            />

            <View
              style={{
                height: "45%",
              }}
            >
              <Text style={{ fontSize: 13, color: "grey" }}>
                {props.route.params.NombreTrous}
              </Text>
              {errorMessage.length > 1 ? (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errorMessage}
                </Text>
              ) : null}
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 20,
                  marginVertical: "2%",
                }}
              >
                Départ :{" "}
              </Text>
              {/*Heure de départ*/}
              {dateSelect !== null ? (
                <ScrollView
                  style={{
                    maxHeight: "90%",
                    marginBottom: windowHeight - windowHeight / 1.01,
                  }}
                >
                  {ButtonHours}
                </ScrollView>
              ) : (
                <Text style={{ color: "grey", fontSize: 15 }}>
                  Sélectionne une date
                </Text>
              )}
              {!props.route.params.checkedBuddiesOnly &&
              !props.route.params.checkedOpenToBuddies ? (
                <View
                  style={{
                    marginBottom: windowWidth - windowWidth / 1.01,
                    height: "20%",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "500",
                        marginBottom: windowWidth - windowWidth / 1.009,
                      }}
                    >
                      Nombre total de participant
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "90%",
                    }}
                  >
                    <RNPickerSelect
                      style={{
                        inputIOS: {
                          fontSize: 16,
                          paddingVertical: 12,
                          paddingHorizontal: 10,
                          borderWidth: 1,
                          borderColor: "gray",
                          borderRadius: 4,
                          color: "black",
                          paddingRight: 30, // to ensure the text is never behind the icon
                        },
                        inputAndroid: {
                          fontSize: 16,
                          paddingVertical: 12,
                          paddingHorizontal: 10,
                          borderWidth: 1,
                          borderColor: "gray",
                          borderRadius: 4,
                          color: "black",
                          paddingRight: 30, // to ensure the text is never behind the icon
                        },
                      }}
                      placeholder={{
                        label: "Selectionne le nombre de joueur...",
                        value: null,
                        color: "grey",
                      }}
                      onValueChange={(value) => setNbJoueur(value)}
                      items={[
                        { label: "1 joueur", value: 1 },
                        { label: "2 joueurs", value: 2 },
                        { label: "3 joueurs", value: 3 },
                        { label: "4 joueurs", value: 4 },
                      ]}
                    />
                  </View>
                  {nbJoueur > 1 ? (
                    <View
                      style={{
                        width: "100%",
                        marginTop: windowHeight - windowHeight / 1.01,
                      }}
                    >
                      <Input
                        onChangeText={(value) => setTextInputEmail(value)}
                        onSubmitEditing={() => {
                          handleSubmit(textInputEmail);
                        }}
                        placeholder="Email du joueur"
                        leftIcon={
                          <AntDesign name="adduser" size={24} color="#3AB795" />
                        }
                      />
                    </View>
                  ) : null}
                </View>
              ) : null}
            </View>
          </View>
        </View>
        <View
          style={{
            width: windowWidth - windowWidth / 15,
            height: windowHeight - windowHeight / 1.1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            buttonStyle={{
              backgroundColor: "#3AB795",
              height: windowHeight - windowHeight / 1.06,
            }}
            title="Réserver"
            containerStyle={{
              borderRadius: 10,
              width: "100%",
            }}
            onPress={() => handlePress(dateSelect, hourSelect)}
          />
        </View>
      </View>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    golfInDb: state.golf[0].result,
    golfName: state.nameGolfSelect,
  };
}

export default connect(mapStateToProps, null)(DisponibilitesScreen);
