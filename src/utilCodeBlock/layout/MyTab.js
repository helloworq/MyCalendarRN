import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    FlatList,
    Image,
} from "react-native";
import VideoPlayer from 'react-native-media-console';
import Orientation from 'react-native-orientation-locker';

const MyTab = () => {
    const [rightComp, setRightComp] = useState()
    const [selectTab, setSelectTab] = useState(true)
    const portraitHeight = 300
    const fullScreenHeight = '100%'
    const [isFullscreen, setIsFullScreen] = useState(false)
    const data = [
        {
            "name": "1测试测试测试测试测试测试试测试测试测试",
        },
        {
            "name": "2测试测试测试测试测试测试测试测试测试测试测试测试测试",
        },
        {
            "name": "3测试测试测试测试试测试测试测试测试测试测试测试",
        },
        {
            "name": "4测试测试测试测试测测试测试测试测试测试测试测试测试",
        },
        {
            "name": "5测试测试测试测试测试测试测试测试测试测试测试测试",
        },
        {
            "name": "6测试测试测试测试测试测测试测试测试测试测试测试",
        },
        {
            "name": "7测试测试测试测试测试测试试测试测试测试测试测试测试",
        },
        {
            "name": "8测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
        },
    ]

    return (
        <>
            <View style={{ flex: 1 }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: '5%',
                }}>
                    <TouchableOpacity onPress={() => setSelectTab(!selectTab)}>
                        <View style={{
                            borderLeftWidth: 1,
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            //borderRightWidth: 1,
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            width: 100,
                            backgroundColor: selectTab ? 'white' : 'gray'
                        }}>
                            <Text style={{ textAlign: 'center' }}>视频</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setSelectTab(!selectTab)}>
                        <View style={{
                            borderRightWidth: 1,
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            borderLeftWidth: 1,
                            borderTopRightRadius: 5,
                            borderBottomRightRadius: 5,
                            width: 100,
                            backgroundColor: selectTab ? 'gray' : 'white'
                        }}>
                            <Text style={{ textAlign: 'center' }}>音乐</Text>
                        </View>
                    </TouchableOpacity>
                </View >
                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        width: '20%',
                        marginLeft: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        height: '96%'
                    }} >

                        <FlatList
                            renderItem={(row) => {
                                const e = <Text>{row.item.name}</Text>
                                let element = <>
                                    <View style={{ marginBottom: 10 }}>
                                        <Button onPress={() => setRightComp(e)} title={row.item.name} style={{ borderRadius: 10 }} />
                                    </View>
                                </>
                                return element
                            }}
                            keyExtractor={(item, index) => {
                                return item.path + index
                            }}

                            data={data}
                            horizontal={false}
                            numColumns={1}
                        />
                    </View>

                    <View style={{
                        width: '73%',
                        marginLeft: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        borderWidth: 1,
                        height: '96%'
                    }} >
                        {/* {rightComp} */}

                        <FlatList
                            renderItem={(row) => {
                                return (
                                    <>
                                        <View style={{ margin: 10 }} >
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image source={require('../../../img/a.jpg')} style={{
                                                    width: 30,
                                                    height: 30,
                                                    borderRadius: 15,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }} />
                                                <Text style={{ color: 'black', fontSize: 15, marginLeft: 5 }}>测试用户</Text>
                                            </View>
                                            <View>
                                                <VideoPlayer
                                                    source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                                                    //isFullscreen={true}
                                                    //toggleResizeModeOnFullscreen={true}  //画面是否伸缩
                                                    navigator={() => { }}
                                                    onBack={() => { }}
                                                    paused={true}
                                                    pan={{ horizontal: false, inverted: true }}
                                                    onPlay={() => console.log('播放')}
                                                    onPause={() => {
                                                        //const initial = Orientation.getInitialOrientation();
                                                    }}
                                                    showOnStart={false}
                                                    onEnterFullscreen={() => {
                                                        setIsFullScreen(true)
                                                        Orientation.lockToLandscape()
                                                    }}
                                                    onExitFullscreen={() => {
                                                        setIsFullScreen(false)
                                                        Orientation.lockToPortrait()
                                                    }}
                                                    containerStyle={{
                                                        width: '100%',
                                                        height: isFullscreen ? fullScreenHeight : portraitHeight,
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </>
                                )
                            }}
                            keyExtractor={(item, index) => {
                                return item.path + index
                            }}

                            data={[{},{},{},{},{}]}
                            horizontal={false}
                            numColumns={1}
                        />

                    </View>
                </View>
            </View >
        </>
    );
};




export default MyTab
