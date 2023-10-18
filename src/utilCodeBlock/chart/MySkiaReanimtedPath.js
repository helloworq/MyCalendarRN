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
    Points,
    Path
} from "@shopify/react-native-skia";


const MySkiaReanimatedPath = () => {

    return (
        <Canvas style={{ flex: 1 }}>
            {/* <Path
                path="M200,300 L400,50 L600,300 L800,550 L1000,300"
                color="green"
            /> */}
            <Path
                path="M200,300 Q400,50 600,300 T1000,300"
                color="SKYBLUE"
            />
            {/* <Path
                path="M100,200 C100,100 250,100 250,200 S400,300 400,200 Z"
                color="lightblue"
            /> */}
        </Canvas>
    );
}

export default MySkiaReanimatedPath