import React, { PureComponent } from "react";
import { StyleSheet, View, Image } from "react-native";

const RADIUS = 20;

const Player = ({position, rotate}) => {
  const x = position[0] - RADIUS / 2;
  const y = position[1] - RADIUS / 2;
  return (
    <Image
      source={require('../../../../img/a.jpg')}
      style={[styles.player, { left: x, top: y, transform: [{ rotate: rotate }] }]}
      resizeMode={'stretch'}
    />
  );

}

const styles = StyleSheet.create({
  player: {
    borderColor: "#fff",
    borderWidth: 0,
    //borderRadius: RADIUS * 2,
    width: 40,
    height: 70,
    backgroundColor: "black",
    position: "absolute"
  }
});

export default Player