import React, { useState, useEffect, useRef } from 'react';
import {
    Button,
    Dimensions,
} from 'react-native'
import Animated, {
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import Svg, {
    Line,
} from 'react-native-svg';


const AnimatedLine = Animated.createAnimatedComponent(Line)
const AnimatedLineEle = ({ px1, py1, px2, py2 }) => {
    const x1 = useSharedValue(0)
    const y1 = useSharedValue(0)
    const x2 = useSharedValue(0)
    const y2 = useSharedValue(0)

    useEffect(() => {
        console.log(px1, py1, px2, py2, x1, y1, x2, y2)
        x1.value = withTiming(px1, { duration: 1000 }),
            y1.value = withTiming(py1, { duration: 2000 }),
            x2.value = withTiming(px2, { duration: 2000 }),
            y2.value = withTiming(py2, { duration: 2000 })
    }, [px1, py1, px2, py2])

    return (
        <>
            <AnimatedLine x1={x1} y1={y1} x2={x2} y2={y2} stroke="red" strokeWidth="2" />
        </>
    )
}

const MySkiaChartReanimated = () => {
    const screenWidth = Dimensions.get("window").width
    const split = screenWidth / 31
    const [press, setPress] = useState(true)
    const [block, setBlock] = useState()
    const first = [95, 7, 146, 37, 126, 53, 85, 25, 79, 167, 171, 130, 40, 151, 84, 172, 136, 32, 101, 143, 17, 15, 166, 72, 43, 134, 179, 61, 49, 129, 154]
    const second = [138, 13, 69, 144, 129, 71, 79, 136, 114, 91, 118, 173, 145, 51, 36, 95, 47, 117, 145, 150, 161, 82, 178, 136, 164, 168, 33, 184, 182, 142, 119]


    return (<>
        <Svg height="400" width="600">
            {block}
        </Svg>
        <Button title='click' onPress={() => {
            let b = []
            const arr = press ? first : second
            for (let i = 0; i < arr.length - 1; i++) {
                const cur = arr[i]
                const later = arr[i + 1]
                b.push(<AnimatedLineEle px1={i * split} py1={cur} px2={(i + 1) * split} py2={later} />)
            }
            setBlock(b)
            setPress(!press)
        }} />
    </>
    );
}

export default MySkiaChartReanimated