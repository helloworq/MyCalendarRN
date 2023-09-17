import React, { useRef, useState } from "react";
import { Animated, View, StyleSheet, PanResponder, Text, FlatList, Dimensions, runOnJS, Button } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const MyPullDownNative = ({ pullDownFunc, pullUpFunc, mylist }) => {
    const pan = useRef(new Animated.ValueXY()).current;
    const screenWidth = Dimensions.get("window").width
    const screenHeight = Dimensions.get("window").height - 20
    const pullDownThreshold = 40
    const pullSlowDownSpeed = 1
    const offsetHeight = 100
    const [pullDownLength, setPullDownLength] = useState(0)
    const [scrollable, setScrollable] = useState(false)
    const [initNum, setInitNum] = useState(0)

    pullDownFunc = pullDownFunc === undefined ? () => { } : pullDownFunc
    pullUpFunc = pullUpFunc === undefined ? () => { } : pullUpFunc

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                let moveX = gestureState.dx / pullSlowDownSpeed
                let moveY = gestureState.dy / pullSlowDownSpeed

                setPullDownLength(parseInt(moveY))

                pan.x.setValue(moveX)
                pan.y.setValue(moveY)
                return Animated.event([null, {
                    dx: new Animated.Value(moveX),//奇葩了，非得set然后再new才能work
                    dy: new Animated.Value(moveY),
                }], { useNativeDriver: false })(evt, gestureState)
            },
            onPanResponderRelease: (e, gestureState) => {
                let moveY = gestureState.dy / pullSlowDownSpeed
                if (moveY >= pullDownThreshold) {
                    pullDownFunc()
                }
                if (moveY <= -pullDownThreshold) {
                    pullUpFunc()
                }

                setPullDownLength(0)
                Animated.spring(pan, { toValue: { x: 0, y: 0, useNativeDriver: false } }).start();
            }
        })
    ).current;

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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        },
        titleText: {
            fontSize: 14,
            lineHeight: 24,
            fontWeight: "bold"
        },

    });


    return (<>
        <Button title="Click" onPress={() => {
            pan.y.setValue(50)
        }} />
        <View style={styles.container}>
            {pullDownRefresh}
            {pullUpLoad}
            <Animated.View
                style={{
                    transform: [{ translateY: pan.y }]
                }}
                {...panResponder.panHandlers}
            >
                <FlatList
                    data={[
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
                    ]}
                    onTouchMove={(e) => {
                        console.log(e.nativeEvent.touches)
                        
                        // console.log(scrollable, initNum)
                        if (initNum === 0) {
                            //setInitNum(e.nativeEvent.pageY)
                            //setScrollable(false)
                        } else {
                            if (e.nativeEvent.pageY - initNum > 0) {
                                setScrollable(false)
                                // setInitNum(0)
                            } else {
                                setScrollable(true)
                                //  setInitNum(0)
                            }
                        }
                        //console.log(e.nativeEvent.pageY)
                    }}
                    //onTouchMove={() => console.log(11111)}
                    scrollEnabled={scrollable}
                    onScroll={(event) => {
                        //console.log("!!!!!!!!!", event.nativeEvent)
                        let cur = event.nativeEvent.contentOffset.y / pullSlowDownSpeed
                        console.log(cur)
                        if (cur === 0) {
                            //setReachTop(false)
                            setScrollable(false)
                        } else {
                            setScrollable(true)
                        }
                    }}

                    renderItem={(row) => {
                        return (
                            <>
                                <View style={{ alignItems: 'center', borderRadius: 20 }} >
                                    <View style={{ height: 100, width: 400, backgroundColor: 'gray', margin: 5 }} >
                                        <Text style={{ fontSize: 30, textAlign: 'center', verticalAlign: 'middle' }} >{row.item}</Text>
                                    </View>
                                </View>
                            </>
                        )
                    }}
                    numColumns={1}
                    horizontal={false}
                />
            </Animated.View>
        </View>
    </>
    );
}


export default MyPullDownNative;