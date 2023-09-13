import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';

export default function Move() {
    const pressed = useSharedValue(false);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);

    const pan = Gesture.Pan()
        .onBegin(() => {
            pressed.value = true;
        })
        .onChange((event) => {
            offsetX.value = event.translationX;
            offsetY.value = event.translationY;
        })
        .onFinalize(() => {
            offsetX.value = withSpring(0);
            offsetY.value = withSpring(0);
            pressed.value = false;
        });

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: offsetX.value },
            { translateY: offsetY.value },
            { scale: withTiming(pressed.value ? 2 : 1) },
        ],
        backgroundColor: pressed.value ? '#FFE04B' : '#b58df1',
    }));

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                <GestureDetector gesture={pan}>
                    <Animated.View style={[styles.circle, animatedStyles]} />
                </GestureDetector>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    circle: {
        height: 400,
        width: 400,
        backgroundColor: '#b58df1',
        borderRadius: 500,
        cursor: 'grab',
    },
});