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
import {
    Canvas,
    Line,
    vec,
    useValue,
    Points
} from "@shopify/react-native-skia";


const MySkiaReanimatedPoints = () => {
    const [randomPoints,setRandomPoints] = useState([])
    const basePosition = useSharedValue(255)
    const newPosition = useDerivedValue(() => {
        basePosition.value
        return randomPoints
        // return points.map(e => {
        //     return {
        //         x: e.x,
        //         y: e.y + basePosition.value
        //     }
        // })
    }, [randomPoints])

    return (
        <>
            <Canvas style={{ flex: 1 }}>
                <Points
                    points={newPosition}
                    mode="polygon"
                    color="lightblue"
                    style="stroke"
                    strokeWidth={4}
                />
            </Canvas>
            <Button title="Move it" onPress={() => {
                basePosition.value = withTiming(Math.random() * 200, { duration: 1000 })

                let data = []
                for (let i = 0; i < 31; i++) {
                    let temp = { x: i * 10, y: Math.random() * 200 }
                    data.push(temp)
                }
                setRandomPoints(data)
            }} />
        </>
    );
}

export default MySkiaReanimatedPoints