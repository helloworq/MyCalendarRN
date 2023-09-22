import React, { useState, useEffect, useContext, } from 'react';
import {
    View,
    Button,
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Text,

} from "react-native";
import { Svg, SvgXml, Path, Circle, Rect, TextPath, TSpan } from 'react-native-svg';
//const patten = /<path(\b([\s\S]*?))\/>/g
import { selectProvinceList, selectSubRegion, selectParentRegion, selectParentCode } from '../../storage/repository/RegionDao';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
    PanGestureHandler,
    PinchGestureHandler,
} from 'react-native-gesture-handler';

const MySvgChina = () => {
    const screenWidth = Dimensions.get("window").width
    const screenHeight = Dimensions.get("window").height
    const [select, setSelect] = useState()

    const [curRegion, setCurRegion] = useState([])
    const [curLevel, setCurLevel] = useState(0)
    const [curCode, setCurCode] = useState()
    const [scale, setScale] = useState(1)

    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);

    const pan = Gesture.Pan()
        .maxPointers(1)
        .onChange((event) => {
            offsetX.value += event.changeX;
            offsetY.value += event.changeY;
        })
        .onFinalize(() => {
            offsetX.value = withSpring(offsetX.value);
            offsetY.value = withSpring(offsetY.value);
        });
    const [zoom, setZoom] = useState(1);
    const pinchGesture = Gesture.Pinch()
        .onChange((e) => {
            const { scale } = e;
            console.log(scale)
            if (scale < 0.8) {
                return;
            }
            if (scale > 4) {
                return;
            }
            //curScale.value = scale;
            runOnJS(setZoom)(scale)
        })
        .onFinalize((e) => {
            const { scale } = e;
            console.log(scale)
            if (scale < 0.8) {
                //curScale.value = withTiming(1);
                // runOnJS(setZoom)(1)
            }
        })

    const composed = Gesture.Simultaneous(pinchGesture, pan);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: offsetX.value },
            { translateY: offsetY.value },
        ],
    }));

    useEffect(() => {
        selectProvinceList((e) => setCurRegion(e))
        setScale(1)
    }, [])

    return (
        <>
            <GestureHandlerRootView style={{
                flex: 1,
            }}>
                <View style={{
                    flex: 1,
                }}>

                    <Animated.View style={[{ backgroundColor: 'skyblue' }, animatedStyles]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Button title='加载全国地图' onPress={() => {
                                selectProvinceList((e) => setCurRegion(e))
                                setScale(1)
                            }} />
                            <Button title='上一级' onPress={() => {
                                setScale(scale - 1)
                                selectParentCode(curCode, (e) => setCurCode(e))
                                selectParentRegion(curCode, (e) => setCurRegion(e))
                            }} />
                        </View>
                        <GestureDetector gesture={composed}>
                            <Svg
                                title='1111'
                                width={'100%'}
                                height={'100%'}
                                viewBox={'0 0 ' + 1000 / zoom + ' ' + 1000 / zoom}

                            >
                                {
                                    curRegion.map(e => {
                                        const id = e['NAME']
                                        const parentCode = e['PARENT_CODE']
                                        const regionCode = e['REGION_CODE']
                                        return <Path
                                            id={id}
                                            fill={select === id ? "green" : "green"}
                                            fillOpacity={0.5}
                                            fillRule={'evenodd'}
                                            stroke="#333"
                                            strokeOpacity={1}
                                            strokeWidth={1}
                                            strokeLinecap={'square'}
                                            strokeLinejoin={'miter'}
                                            strokeDasharray={1}
                                            d={e['PATH']}
                                            onPress={(e) => {
                                                setScale(scale + 1)
                                                setCurCode(regionCode)
                                                selectSubRegion(regionCode, (e) => setCurRegion(e))
                                            }}
                                        />
                                    })
                                }
                            </Svg>
                        </GestureDetector>
                    </Animated.View>


                </View>
            </GestureHandlerRootView >
        </>
    )
}

export default MySvgChina