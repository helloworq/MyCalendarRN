import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, Text, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Animated, { useSharedValue } from 'react-native-reanimated';

const ScaleCompoment = ({ pullDownFunc, pullUpFunc }) => {
    const flat = useRef(null)
    const screenWidth = Dimensions.get("window").width
    const screenHeight = Dimensions.get("window").height - 20
    const pullDownThreshold = 30
    const [pullDownLength, setPullDownLength] = useState(0)
    const [pullUpLength, setPullUpLength] = useState(0)

    pullDownFunc = pullDownFunc === undefined ? () => { } : pullDownFunc
    pullUpFunc = pullUpFunc === undefined ? () => { } : pullUpFunc

    //下拉刷新
    const pullDownRefresh = (<>
        <View style={{
            position: 'absolute',
            top: 10,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <View style={{
                    transform: [
                        { scaleY: pullDownLength >= pullDownThreshold ? -1 : 1 }
                    ],
                }}>
                    <MaterialCommunityIcons name='arrow-down' size={20} />
                </View>
                <Text>{pullDownLength > pullDownThreshold ? '松开刷新' : '继续下拉'}</Text>
            </View>
        </View>
    </>)

    //上拉加载
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

    return (
        <View style={{
            alignItems: 'center',
            //justifyContent: 'center',
            height: screenHeight,
            flex:1
        }}>
            {pullDownRefresh}
            {pullUpLoad}
            <FlatList
                ref={flat}
                data={[
                    1, 2, 3
                ]}
                ListHeaderComponent={() => <View style={{ height: 50, width: 400, backgroundColor: 'rgba(255,255,255,0)', margin: 5 }} />}
                ListFooterComponent={() => <View style={{ height: 50, width: 400, backgroundColor: 'rgba(255,255,255,0)', margin: 5 }} />}

                onScroll={(event) => {
                    const y = event.nativeEvent.contentOffset.y
                    if (y < 50) {
                        setPullDownLength( 50 - y)
                        //offsetY.value = 50 - y
                    }
                }}
                
                style={{ width: 400,flex:1 }}
                onScrollToIndexFailed={{ animated: true, index: 0 }}
                initialScrollIndex={1}
                onScrollEndDrag={(event) => {
                    const y = event.nativeEvent.contentOffset.y
                    if (y < 50) {
                        //offsetY.value = 1
                        setPullDownLength(1)
                        flat.current.scrollToOffset({ offset: 55, animated: true, });
                    }
                }}
                
                onMomentumScrollEnd={(event) => {
                    const y = event.nativeEvent.contentOffset.y
                    if (y < 50) {
                        setPullDownLength(1)
                        flat.current.scrollToOffset({ offset: 55, animated: true, });
                    }
                }}
                renderItem={(row) =>
                    <View style={{ alignItems: 'center', borderRadius: 20, backgroundColor: 'white' }} >
                        <View style={{ height: 100, width: 400, backgroundColor: 'gray', margin: 5 }} >
                            <Text style={{ fontSize: 30, textAlign: 'center', verticalAlign: 'middle' }} >{row.item}</Text>
                        </View>
                    </View>
                }
                numColumns={1}
                horizontal={false}
            />
        </View >
    );
}

export default ScaleCompoment