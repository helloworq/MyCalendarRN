import React, { PureComponent } from "react";
import { StyleSheet, View, Image } from "react-native";

const RADIUS = 20;

const Finger = ({position, rotate}) => {
  const x = position[0] - RADIUS / 2;
  const y = position[1] - RADIUS / 2;
  return (
    <Image
      source={require('../../../../img/poker/red_joker.png')}
      style={[styles.finger, { left: x, top: y, transform: [{ rotate: rotate }] }]}
      resizeMode={'stretch'}
    />
  );

}

const styles = StyleSheet.create({
  finger: {
    borderColor: "#fff",
    borderWidth: 0,
    //borderRadius: RADIUS * 2,
    width: 40,
    height: 70,
    backgroundColor: "black",
    position: "absolute"
  }
});

export default Finger