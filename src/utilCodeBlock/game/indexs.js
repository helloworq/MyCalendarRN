import React, { PureComponent } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { GameLoop } from "react-native-game-engine";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const RADIUS = 50;

export default class BestGameEver extends PureComponent {
  constructor() {
    super();
    this.state = {
      x: 200,
      y: 200,
      angle: 0,
    };
  }

  updateHandler = ({ touches, screen, layout, time }) => {
    let move = touches.find(x => x.type === "move");
    //if (move) {
    this.setState({
      x: this.state.x + 50 * Math.cos(this.state.angle),
      y: this.state.y + 50 * Math.sin(this.state.angle),
      angle: this.state.angle + 250 / 360,
    });
    //}
  };

  render() {
    return (
      <GameLoop style={styles.container} onUpdate={this.updateHandler}>

        <View style={[styles.player, { left: this.state.x, top: this.state.y }]} />

      </GameLoop>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  player: {
    position: "absolute",
    backgroundColor: "red",
    width: RADIUS,
    height: RADIUS,
    borderRadius: RADIUS
  }
});
