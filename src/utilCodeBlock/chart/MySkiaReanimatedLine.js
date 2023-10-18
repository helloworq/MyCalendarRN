import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Button,
    Dimensions,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import Animated, {
    useSharedValue,
    useDerivedValue,
    withTiming,
} from "react-native-reanimated";
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { Canvas, Line, vec, useValue } from "@shopify/react-native-skia";


const MySkiaReanimatedLine = () => {
    const basePosition = useSharedValue(255)
    const newPosition = useDerivedValue(() => {
        return {
            x: 11,
            y: basePosition.value
        }
    }, [basePosition])


    return (
        <>
            <Canvas style={{ flex: 1 }}>
                <Line
                    p1={vec(0, 0)}
                    p2={newPosition}
                    color="lightblue"
                    style="stroke"
                    strokeWidth={4}
                />
            </Canvas>
            <Button title="Move it" onPress={() =>
                basePosition.value = withTiming(Math.random() * 200, { duration: 1000 })
            } />
        </>
    );
}

export default MySkiaReanimatedLine