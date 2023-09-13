import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    useAnimatedReaction,
    runOnJS,
} from 'react-native-reanimated';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ScaleCompoment = ({ pullDownFunc, pullUpFunc }) => {
    const screenWidth = Dimensions.get("window").width
    const screenHeight = Dimensions.get("window").height - 20
    const pullDownThreshold = 40
    const pullSlowDownSpeed = 10

    const pressed = useSharedValue(false);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const [pullDownLength, setPullDownLength] = useState(0)

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
        },
        circle: {
            height: screenHeight,
            width: screenWidth,
            backgroundColor: '#b58df1',
            borderRadius: 10,
            cursor: 'grab',
        },
    });

    pullDownFunc = pullDownFunc === undefined ? () => { } : pullDownFunc
    pullUpFunc = pullUpFunc === undefined ? () => { } : pullUpFunc

    //下拉刷新
    const pullDownRefresh = (<>
        <View style={{
            position: 'absolute',
            top: 10,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{
                    transform: [
                        { scaleY: pullDownLength >= pullDownThreshold ? -1 : 1 }
                    ]
                }}>
                    <MaterialCommunityIcons name='arrow-down' size={20} />
                </View>
                <Text>{pullDownLength > pullDownThreshold ? '松开刷新' : '继续下拉'}</Text>
            </View>
        </View>
    </>)

    //上拉加载
    const pullUpLoad = (<>
        <View style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 10,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name={pullDownLength <= -pullDownThreshold ? 'refresh' : 'arrow-up'} size={20} />
                <Text>{pullDownLength <= -pullDownThreshold ? '松开加载' : '继续上拉'}</Text>
            </View>
        </View>
    </>)


    const pan = Gesture.Pan()
        .onBegin(() => {
            pressed.value = true;
        })
        .onChange((event) => {
            offsetX.value = event.translationX;
            offsetY.value = event.translationY;
        })
        .onFinalize(() => {
            if (offsetY.value >= pullDownThreshold) {
                runOnJS(pullDownFunc)()
            }
            if (offsetY.value <= -pullDownThreshold) {
                runOnJS(pullUpFunc)()
            }


            offsetX.value = withSpring(0);
            offsetY.value = withSpring(0);
            pressed.value = false;
        });

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            // { translateX: offsetX.value },
            { translateY: offsetY.value / pullSlowDownSpeed },//除10体现更好的组件滑动的速度效果
            // { scaleX: withTiming(pressed.value ? 2 : 1) },
            // { scaleY: withTiming(pressed.value ? 2 : 1) },
        ],
        backgroundColor: pressed.value ? '#FFE04B' : '#b58df1',
    }));

    useAnimatedReaction(
        () => {
            return offsetY.value;
        },
        (currentValue, previousValue) => {
            runOnJS(setPullDownLength)(parseInt(currentValue / pullSlowDownSpeed))
        }
    );

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                {pullDownRefresh}
                {pullUpLoad}
                <GestureDetector gesture={pan}>
                    <Animated.View style={[styles.circle, animatedStyles]} />
                </GestureDetector>

            </View>
        </GestureHandlerRootView>
    );
}

export default ScaleCompoment