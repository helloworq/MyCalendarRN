import React, { PureComponent, useRef } from "react";
import { AppRegistry, StyleSheet, StatusBar, View, } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Player from "./renderers";
import { MovePlayer } from "./systems"
import GamePadController from "./GamePadController";
import Bullet from "../bullet/index";
import { MoveBullet } from "../bullet/systems";

const BestGameEver = () => {
  const engine = useRef(null);

  return (<>
    <GameEngine
      ref={engine}
      style={styles.container}
      systems={[MovePlayer, MoveBullet]}
      entities={{
        'player': {
          position: [40, 200],
          rotate: '0deg',
          renderer: <Player />,
          going: false
        },
        'bullet': {
          position: {},
          renderer: <Bullet />
        }

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