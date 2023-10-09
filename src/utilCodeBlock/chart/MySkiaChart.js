import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Button,
    Dimensions,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import { Canvas, Path, Skia, DashPathEffect, Circle, Line, vec, Points, useValue, Selector, useSpring, useTiming } from "@shopify/react-native-skia";
import {
    useDerivedValue,
    useSharedValue,
    withRepeat,
    withSpring,
    withTiming,
} from "react-native-reanimated";


const MySkiaChart = () => {
    const size = 2
    const [points, setPoints] = useState([])
    const screenWidth = Dimensions.get("window").width
    const [refresh, setRefresh] = useState(false)

    const y1 = useSharedValue(0)
    const y2 = useSharedValue(25)




    // function _onPress() {
    //     let _points = []
    //     for (let i = 0; i < size; i++) {
    //         r.value = withSpring(Math.floor(Math.random() * 300), { duration: 5000 })
    //         const y = Math.floor(Math.random() * 300)
    //         const x = i * (screenWidth / size) + 5
    //         _points.push(vec(x, r.value))
    //     }
    //     //setPoints(_points)
    // }
    const position = useTiming(refresh ? Math.floor(Math.random() * 300) : Math.floor(Math.random() * 300)
        , { duration: 2000 });
    const yy = useValue(vec(60, position))

    return (
        <>
            {/* <Button title='rerender' onPress={() => setRefresh(!refresh)} /> */}
            <Button title='rerender' onPress={() => {
                //y1.value = withSpring(Math.floor(Math.random() * 300), { duration: 5000 })
                //yy.current = Math.floor(Math.random() * 300)
                setRefresh(!refresh)
            }} />
            <Canvas style={{ flex: 1 }}>
                {/* <Circle cx={150} cy={150} r={position} color="lightblue" /> */}
                <Points
                    points={[vec(50, Selector(position, (p) => p.current).value.current), vec(100, position.current)]}
                    strokeJoin={'round'}
                    mode="polygon"
                    color="lightblue"
                    style="stroke"
                    strokeWidth={3}
                />
            </Canvas>
        </>
    )
}

export default MySkiaChart