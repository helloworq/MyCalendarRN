import React, { PureComponent, useRef } from "react";
import { AppRegistry, StyleSheet, StatusBar, View, } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Player from "./renderers";
import { MovePlayer } from "./systems"
import GamePadController from "./GamePadController";

const BestGameEver = () => {
  const engine = useRef(null);

  return (<>
    <GameEngine
      ref={engine}
      style={styles.container}
      systems={[MovePlayer]}
      entities={{
        0: { position: [40, 200], rotate: '0deg', renderer: <Player />, going: false }, //-- Notice that each entity has a unique id (required)
        //1: { position: [30, 650], rotate: '0deg', renderer: <MyGamePad /> }
        // 1: { position: [100, 200], renderer: <Finger />, rotate: Math.PI / 6 }, //-- and a renderer property (optional). If no renderer
        // 2: { position: [160, 200], renderer: <Finger />, rotate: 2 * Math.PI / 6 }, //-- is supplied with the entity - it won't get displayed.
        // 3: { position: [220, 200], renderer: <Finger />, rotate: 3 * Math.PI / 6 },
        // 4: { position: [280, 200], renderer: <Finger />, rotate: 4 * Math.PI / 6 },
        // 5: { position: [280, 200], renderer: <Finger />, rotate: 5 * Math.PI / 6 },
        // 6: { position: [280, 200], renderer: <Finger />, rotate: 6 * Math.PI / 6 },
        // 7: { position: [280, 200], renderer: <Finger />, rotate: 7 * Math.PI / 6 },
        // 8: { position: [280, 200], renderer: <Finger />, rotate: 8 * Math.PI / 6 },
        // 9: { position: [280, 200], renderer: <Finger />, rotate: 9 * Math.PI / 6 },
        // 10: { position: [280, 200], renderer: <Finger />, rotate: 10 * Math.PI / 6 },
        // 11: { position: [280, 200], renderer: <Finger />, rotate: 11 * Math.PI / 6 },
        // 12: { position: [280, 200], renderer: <Finger />, rotate: 12 * Math.PI / 6 },
        //13: { position: [320, 200], renderer: <GamepadController />, rotate: 12 * Math.PI / 6 },
      }}
      running={true}
    >
    </GameEngine>

    <View>
      <GamePadController engine={engine} />
    </View>
    {/* <View style={styles.controlContainer}>
      <View style={styles.controllerRow}>
        <TouchableOpacity onPress={() => engine.current.dispatch("move-up")}>
          <View style={styles.controlBtn} />
        </TouchableOpacity>
      </View>
      <View style={styles.controllerRow}>
        <TouchableOpacity
          onPress={() => engine.current.dispatch("move-left")}
        >
          <View style={styles.controlBtn} />
        </TouchableOpacity>
        <View style={[styles.controlBtn, { backgroundColor: null }]} />
        <TouchableOpacity
          onPress={() => engine.current.dispatch("move-right")}
        >
          <View style={styles.controlBtn} />
        </TouchableOpacity>
      </View>
      <View style={styles.controllerRow}>
        <TouchableOpacity
          onPress={() => engine.current.dispatch("move-down")}
        >
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
    backgroundColor: "gray",
    width: 50,
    height: 50,
  },

});


export default BestGameEver