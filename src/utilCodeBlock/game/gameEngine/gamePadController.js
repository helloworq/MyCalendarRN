import React, { useRef } from "react";
import { Animated, View, TouchableOpacity, PanResponder, Text } from "react-native";

const width = 150
const height = 150
const padSize = 55

//rn自带的动画实现gamepad，三方库虽然也可以性能也好，但是线程过多复杂，引入更多问题
const GamePadController = ({ engine }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      useNativeDriver: true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        engine.current.dispatch({ "action": 'move-player', "going": true, })
      },
      onPanResponderMove: (evt, gestureState) => {
        let moveX = gestureState.dx
        let moveY = gestureState.dy

        const distance = Math.sqrt(Math.pow(moveX, 2) + Math.pow(moveY, 2))
        //console.log(pan.x, pan.y, distance, gestureState.dx, gestureState.dy)
        if (distance > padSize) {
          //小于100则可以圈内自由移动
          //大于100则只能在圈边移动,需要计算倾角(根据边的关系计算)
          //2-集成到game里，先只考虑圈边情况
          moveX = padSize * (moveX / distance)
          moveY = padSize * (moveY / distance)
        }
        engine.current.dispatch({ "action": 'move-player-rotate', "x": moveX, "y": moveY, })
        pan.x.setValue(moveX)
        pan.y.setValue(moveY)
        return Animated.event([null, {
          dx: new Animated.Value(moveX),//奇葩了，非得set然后再new才能work
          dy: new Animated.Value(moveY),
        }], { useNativeDriver: false },)(evt, gestureState)
      },
      onPanResponderRelease: () => {
        engine.current.dispatch({ "action": 'move-player', "going": false, })
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
      }
    })
  ).current;

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
        width: width,
        borderWidth: 10,
        borderRadius: 100,
        borderColor: 'black',
        backgroundColor: 'white',
      }}>
        <Animated.View
          style={{
            transform: [{ translateX: pan.x }, { translateY: pan.y }]
          }}
          {...panResponder.panHandlers}
        >
          <View style={{
            height: 30,
            width: 30,
            backgroundColor: 'black',
            borderRadius: 50,
            cursor: 'grab',
          }} />
        </Animated.View>
      </View>

      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end', marginRight: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity>
            <View style={{
              height: 70,
              width: 70,
              backgroundColor: 'black',
              borderRadius: 50,
              cursor: 'grab',
              alignItems: 'flex-start',
              justifyContent: 'flex-end'
            }}></View>
          </TouchableOpacity>
          <View style={{
            height: 70,
            width: 70,
            backgroundColor: 'white',
            borderRadius: 50,
            cursor: 'grab',
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
          }}></View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{
            height: 70,
            width: 70,
            backgroundColor: 'white',
            borderRadius: 50,
            cursor: 'grab',
            alignItems: 'flex-start',
            justifyContent: 'flex-end'
          }}></View>
          <TouchableOpacity onPress={() => engine.current.dispatch({ "action": 'shoot', })}>
            <View style={{
              height: 70,
              width: 70,
              backgroundColor: 'black',
              borderRadius: 50,
              cursor: 'grab',
              alignItems: 'flex-start',
              justifyContent: 'flex-start'
            }}></View>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}


export default GamePadController;