import React, { useState, useEffect, useRef } from 'react';
import {
    Button,
    Dimensions,
} from 'react-native'
import Animated, {
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Svg, {
    Line,
    Text,
    TSpan,
    Circle,
} from 'react-native-svg';



const AnimatedLineEle = ({ px1, py1, px2, py2 }) => {
    const AnimatedLine = Animated.createAnimatedComponent(Line)
    const duration = 500
    const x1 = useSharedValue(0)
    const y1 = useSharedValue(0)
    const x2 = useSharedValue(0)
    const y2 = useSharedValue(0)

    useEffect(() => {
        x1.value = withTiming(px1, { duration: duration })
        y1.value = withTiming(py1, { duration: duration })
        x2.value = withTiming(px2, { duration: duration })
        y2.value = withTiming(py2, { duration: duration })
    }, [px1, py1, px2, py2])

    return (
        <>
            <AnimatedLine x1={x1} y1={y1} x2={x2} y2={y2} stroke="skyblue" strokeWidth="2" />
        </>
    )
}


const MySkiaChartReanimated = () => {
    const size = 31
    const poolSize = 10
    const margin = 20
    const maxHeight = 100
    const screenWidth = Dimensions.get("window").width
    const split = screenWidth / size
    const [press, setPress] = useState(true)
    const [block, setBlock] = useState()
    const [xAsix, setXAsix] = useState()
    const offsetX = useSharedValue(0)
    const offsetY = useSharedValue(0)
    const [points, setPoints] = useState({})
    const curIndex = useSharedValue(0)
    const pool = useSharedValue(size)
    const AnimatedCircle = Animated.createAnimatedComponent(Circle)

    const pan = Gesture.Pan()
        .onChange((event) => {
            if (pool.value === poolSize) {
                pool.value = pool.value - 1
                if (event.changeX > 0) {
                    curIndex.value = (curIndex.value > 25 ? 25 : curIndex.value) + 1
                    offsetX.value = points[curIndex.value]['x']
                    offsetY.value = points[curIndex.value]['y']
                } else {
                    curIndex.value = (curIndex.value < 3 ? 3 : curIndex.value) - 1
                    offsetX.value = points[curIndex.value]['x']
                    offsetY.value = points[curIndex.value]['y']
                }
            } else {
                pool.value = pool.value === 0 ? poolSize : (pool.value - 1)
            }
        })

    return (<>
        <GestureHandlerRootView style={{
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <GestureDetector gesture={pan}>
                <Svg height={maxHeight + margin * 3} width={screenWidth}>
                    {block}
                    <Text y={maxHeight + margin * 2} fontSize={8}>
                        {xAsix}
                    </Text>
                    <AnimatedCircle
                        cx={offsetX}
                        cy={offsetY}
                        r="5"
                        strokeWidth="2.5"
                        fill="skyblue"
                    />
                </Svg>
            </GestureDetector>
        </GestureHandlerRootView >

        <Button title='初始化' onPress={() => {
            let b = []
            let xA = []

            let data = []
            let pointData = {}
            for (let i = 0; i < size; i++) {
                const randomValue = Math.random() * maxHeight + margin
                const temp = { x: (i * split), y: randomValue }
                pointData[i] = temp
                data.push(randomValue)
            }
            setPoints(pointData)

            for (let i = 1; i < data.length; i++) {
                const cur = data[i]
                const later = data[i + 1]
                if (i < (size - 1)) {
                    b.push(<AnimatedLineEle px1={i * split} py1={cur} px2={(i + 1) * split} py2={later} />)
                }
                xA.push(
                    <TSpan x={i * split}>
                        {i}
                    </TSpan>
                )
            }
            setBlock(b)
            setPress(!press)
            setXAsix(xA)
        }} />
    </>
    );
}

export default MySkiaChartReanimated