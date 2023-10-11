import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    Button,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Animated,
} from 'react-native'
import {
    useDerivedValue,
    useSharedValue,

    withRepeat,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
    SvgXml,
} from 'react-native-svg';

const AnimatedLine = Animated.createAnimatedComponent(Line)
const AnimatedLineEle = ({ px1, py1, px2, py2 }) => {
    const x1 = useRef(new Animated.Value(0)).current
    const y1 = useRef(new Animated.Value(0)).current
    const x2 = useRef(new Animated.Value(0)).current
    const y2 = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(x1, { toValue: px1, duration: 1000 }).start()
        Animated.timing(y1, { toValue: py1, duration: 1000 }).start()
        Animated.timing(x2, { toValue: px2, duration: 1000 }).start()
        Animated.timing(y2, { toValue: py2, duration: 1000 }).start()
    }, [px1, py1, px2, py2])


    return (
        <>
            <AnimatedLine x1={x1} y1={y1} x2={x2} y2={y2} stroke="red" strokeWidth="2" />
        </>
    )
}

const MySkiaChart = () => {
    const size = 256;
    const seq = [1, 2, 3, 4, 5, 6]
    const position = useRef(new Animated.Value(0)).current
    const [press, setPress] = useState(true)
    const AnimatedLine = Animated.createAnimatedComponent(Line)
    const [block, setBlock] = useState()
    const first = [95, 7, 146, 37, 126, 53, 85, 25, 79, 167, 171, 130, 40, 151, 84, 172, 136, 32, 101, 143, 17, 15, 166, 72, 43, 134, 179, 61, 49, 129, 154]
    const second = [138, 13, 69, 144, 129, 71, 79, 136, 114, 91, 118, 173, 145, 51, 36, 95, 47, 117, 145, 150, 161, 82, 178, 136, 164, 168, 33, 184, 182, 142, 119]


    return (<>
        {/* <Svg height="400" width="600">
            {
                block
            }
        </Svg> */}
        <Svg height="400" width="600">
            {block}
        </Svg>
        <Button title='click' onPress={() => {
            let b = []
            const arr = press ? first : second
            for (let i = 0; i < arr.length - 1; i++) {
                const cur = arr[i]
                const later = arr[i + 1]
                b.push(
                    <AnimatedLineEle px1={i * 10} py1={cur} px2={(i + 1) * 10} py2={later} />
                )
            }
            setBlock(b)
            setPress(!press)
            // Animated.timing(position, {toValue: Math.random() * 100, duration: 1000 }).start()
        }} />
        {/* <Button title='click' onPress={() => {
            // Animated.timing(position, { toValue: Math.random() * 100, duration: 1000 }).start()
            setBlock(
                seq.map(e => {
                    <>
                        <AnimatedLineEle x1={0} y1={Math.random() * 100} x2={10} y2={Math.random() * 100} />
                        <AnimatedLineEle x1={10} y1={Math.random() * 100} x2={20} y2={Math.random() * 100} />
                        <AnimatedLineEle x1={20} y1={Math.random() * 100} x2={30} y2={Math.random() * 100} />
                        <AnimatedLineEle x1={30} y1={Math.random() * 100} x2={40} y2={Math.random() * 100} />
                        <AnimatedLineEle x1={40} y1={Math.random() * 100} x2={50} y2={Math.random() * 100} />
                    </>
                })
            )
        }} /> */}
    </>
    );
}

export default MySkiaChart