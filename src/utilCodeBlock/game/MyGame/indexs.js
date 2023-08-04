import React, { PureComponent, useEffect, useRef, useState } from "react";
import { AppRegistry, StyleSheet, StatusBar, View, Text, TouchableOpacity, Animated } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Finger } from "./renderers";
import { MoveFinger } from "./systems"
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const BestGameEver = () => {
  const engine = useRef(null)
  const [icon, setIcon] = useState('bicycle')
  const turnOver = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(
      turnOver,
      {
        toValue: -1,
        duration: 1000,
      }
    ).start((r) => setIcon('car'))
  }, [turnOver])

  // {rotateX: '180deg'}, //horizontally
  // {rotateY: '180deg'} //vertically
  // {scaleX: -1} //horizontally
  // {scaleY: -1} //vertically

  return (<>
    <FontAwesome name={"bicycle"} size={50} />

    <View style={{ alignItems: 'center' }}>
      <Animated.View style={{
        transform: [
          { scaleX: turnOver },
        ]
      }}>
        <FontAwesome name={icon} size={50} />
      </Animated.View>
    </View>

    <FontAwesome name={"bicycle"} size={50} style={{
      transform: [
        { scaleY: -1 },
      ]
    }} />

    <FontAwesome name={"bicycle"} size={50} style={{
      transform: [
        { rotateX: '180deg' },
      ]
    }} />

    <FontAwesome name={"bicycle"} size={50} style={{
      transform: [
        { rotateY: '180deg' },
      ]
    }} />

    {/* <View style={styles.controlContainer}>
      <View style={styles.controllerRow}>
        <TouchableOpacity onPress={() => { engine.current.dispatch('move-up') }}>
          <View style={styles.controlBtn} />
        </TouchableOpacity>
      </View>
      <View style={styles.controllerRow}>
        <TouchableOpacity onPress={() => { engine.current.dispatch('move-left') }}>
          <View style={styles.controlBtn} />
        </TouchableOpacity>
        <View style={[styles.controlBtn,]} />
        <TouchableOpacity onPress={() => {engine.current.dispatch('move-right')  }}>
          <View style={styles.controlBtn} />
        </TouchableOpacity>
      </View>
      <View style={styles.controllerRow}>
        <TouchableOpacity onPress={() => { engine.current.dispatch('move-down') }}  >
          <View style={styles.controlBtn} />
        </TouchableOpacity>
      </View>
    </View> */}



    <StatusBar hidden={false} />
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  canvas: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  controlContainer: {
    marginTop: 10,
  },
  controllerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  controlBtn: {
    backgroundColor: "yellow",
    width: 100,
    height: 100,
  },

});

export default BestGameEver