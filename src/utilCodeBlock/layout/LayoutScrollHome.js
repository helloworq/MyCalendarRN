import React, { useRef, useState } from "react";
import {
    Dimensions,
    View,
    TouchableOpacity,
    ScrollView,
    Text,
    ImageBackground,
    Animated,
    PanResponder,
    StyleSheet,
    Image
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ProgressChart } from 'react-native-chart-kit';
import { ProgressBar, MD3Colors } from 'react-native-paper';

const AppBlock = (props) => {
    const screenWidth = Dimensions.get("window").width
    const split = 10;
    const borderRadius = 20
    const fullBlockLength = screenWidth - 2 * split
    const blockLength = (screenWidth - 8 * split) / 3
    //const blockLenghtNumber = (screenWidth - 7 * split) / 2
    const blockLenghtNumber = 100
    const iconSize = 50
    const iconColor = 'black'
    // each value represents a goal ring in Progress chart
    const data = {
        labels: ["本年", "本月", "本周"], // optional
        data: [0.7, 0.3, 0.8]
    };

    return (
        <>
            <View style={{ flex: 1 }}>
                <TouchableOpacity>
                    <View style={{
                        borderRadius: borderRadius,
                        width: fullBlockLength,
                        height: 130,
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        margin: split,
                        backgroundColor: 'rgba(255,255,255,0.5)'
                    }}>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ backgroundColor: 'black', borderRadius: 20, }}>
                                <ProgressChart
                                    data={data}
                                    width={fullBlockLength}
                                    height={130}
                                    strokeWidth={8}
                                    radius={30}
                                    absolute={100}

                                    chartConfig={{
                                        backgroundGradientFromOpacity: 0,
                                        backgroundGradientToOpacity: 0,
                                        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                                        strokeWidth: 2, // optional, default 3
                                        barPercentage: 0.5,
                                        useShadowColorFromDataset: false // optional
                                    }}

                                    hideLegend={false}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 3, width: fullBlockLength, }}>
                    <View style={{
                        width: fullBlockLength,
                        borderRadius: borderRadius,
                        height: 450,
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        margin: split,
                        backgroundColor: 'rgba(255,255,255,0.5)',
                    }}>
                        <View style={{ padding: 20, }}>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Image source={require('./bg.jpeg')} style={{ width: 50, height: 50 }} />
                                <Text style={{ marginLeft: 10,marginRight:40 }}>危楼高百尺，手可摘星辰,不敢高声语，恐惊天上人。</Text>
                            </View>
                        </View>
                    </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ justifyContent: 'flex-end' }}>
                    < TouchableOpacity >
                        <View style={{
                            borderRadius: borderRadius,
                            width: blockLength,
                            height: blockLength,
                            flexDirection: 'column',
                            backgroundColor: 'white',
                            margin: split,
                            backgroundColor: 'rgba(255,255,255,0.5)'
                        }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>相册</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <FontAwesome name={"photo"} size={iconSize} color={iconColor} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity >
                </View>


                <View style={{ justifyContent: 'flex-end' }}>
                    < TouchableOpacity >
                        <View style={{
                            borderRadius: borderRadius,
                            width: blockLength,
                            height: blockLength,
                            flexDirection: 'column',
                            backgroundColor: 'white',
                            margin: split,
                            backgroundColor: 'rgba(255,255,255,0.5)'
                        }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>拍照</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <FontAwesome name={"camera"} size={iconSize} color={iconColor} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity >
                </View>

                <View style={{ justifyContent: 'flex-end' }}>
                    <View>
                        < TouchableOpacity >
                            <View style={{
                                borderRadius: borderRadius,
                                width: blockLenghtNumber,
                                height: blockLenghtNumber / 2 - 5,
                                flexDirection: 'column',
                                backgroundColor: 'white',
                                marginLeft: split,
                                marginBottom: split,
                                marginRight: split,
                                backgroundColor: 'rgba(255,255,255,0.5)'
                            }}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <FontAwesome name={"tags"} size={20} color={iconColor} />
                                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>拍照</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity >
                    </View>

                    <View>
                        < TouchableOpacity >
                            <View style={{
                                borderRadius: borderRadius,
                                width: blockLenghtNumber,
                                height: blockLenghtNumber / 2 - 10,
                                flexDirection: 'column',
                                backgroundColor: 'white',
                                marginLeft: split,
                                marginBottom: split,
                                marginRight: split,
                                backgroundColor: 'rgba(255,255,255,0.5)'
                            }}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome name={"calendar"} size={20} color={iconColor} />
                                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>日历</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity >
                    </View>
                </View>
            </View>
        </>
    )
}

const LayoutScrollHome = () => {
    const screenWidth = Dimensions.get("window").width
    const screenHeight = Dimensions.get("window").height - 20
    const split = 20;
    const blockLenghtNumber = (screenWidth - 7 * split) / 2

    return (
        <>
            <View style={{ flex: 1, }} >
                <ImageBackground
                    source={require('./bg.jpeg')}
                    resizeMode='stretch'
                    style={{ flex: 1, }}>


                    <View style={{ height: screenHeight, flexDirection: 'column' }}>
                        {/* <View style={{
                            height: '100%',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }} > */}
                        <AppBlock />
                        {/* </View> */}
                    </View>

                </ImageBackground>
            </View>
        </>
    )
};

export default LayoutScrollHome