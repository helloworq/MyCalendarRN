// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import Animated, {
//     runOnJS,
//     useAnimatedStyle,
//     useSharedValue,
//     withSpring,
//     withTiming,
// } from 'react-native-reanimated';
// import {
//     Gesture,
//     GestureDetector,
//     GestureHandlerRootView,
// } from 'react-native-gesture-handler';

// const width = 150
// const height = 150
// const padSize = 55

// //性能更好的组件
// //先注释掉 npm install react-native-reanimated react-native-gesture-handler
// const MyGamePad = ({ engine }) => {
//     const pressed = useSharedValue(false);
//     const offsetX = useSharedValue(0);
//     const offsetY = useSharedValue(0);


//     const pan = Gesture.Pan()
//         .onBegin(() => {
//             pressed.value = true;
//         })
//         .onChange((event) => {
//             //根据指定的宽高计算，不允许超过圆圈范围
//             const moveX = event.translationX
//             const moveY = event.translationY
//             const distance = Math.sqrt(Math.pow(moveX, 2) + Math.pow(moveY, 2))
//             if (distance < padSize) {
//                 //小于100则可以圈内自由移动
//                 offsetX.value = moveX;
//                 offsetY.value = moveY;
//             } else {
//                 //大于100则只能在圈边移动,需要计算倾角(根据边的关系计算)
//                 //2-集成到game里，先只考虑圈边情况
//                 offsetX.value = padSize * (moveX / distance)
//                 offsetY.value = padSize * (moveY / distance)
//                 runOnJS(() => engine.current.dispatch("move-player"))
//             }

//         })
//         .onFinalize(() => {
//             offsetX.value = withSpring(0);
//             offsetY.value = withSpring(0);
//             pressed.value = false;
//         });

//     const animatedStyles = useAnimatedStyle(() => ({
//         transform: [
//             { translateX: offsetX.value },
//             { translateY: offsetY.value },
//         ],
//     }));

//     return (
//         <>
//             <View style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 height: height,
//                 width: width,
//                 borderWidth: 10,
//                 borderRadius: 100,
//                 borderColor: 'black',
//                 backgroundColor: 'white',
//                 // left: 30,
//                 // top: 650,
//             }}>
//                 <GestureHandlerRootView >
//                     <GestureDetector gesture={pan}>
//                         <Animated.View style={[styles.circle, animatedStyles]} />
//                     </GestureDetector>
//                 </GestureHandlerRootView>
//             </View>
//         </>
//     );
// }

// const styles = StyleSheet.create({
//     circle: {
//         height: 30,
//         width: 30,
//         backgroundColor: 'black',
//         borderRadius: 50,
//         cursor: 'grab',
//     },
// });


// export default MyGamePad