import React, { useState, useRef } from 'react';
import {
    Button,
    View,
    Animated,
    TouchableOpacity,
    Text,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const MyAnimatedModal = () => {
    let radius = 100
    const animationDuration = 500
    const fadeAnim = useRef(new Animated.Value(0)).current
    const height = useRef(new Animated.Value(radius)).current
    const [open, setOpen] = useState(false)
    const [restCompoment, setRestCompoment] = useState()

    return (
        <>
            <View style={{ backgroundColor: 'black', flex: 1 }}>
                <View style={{ height: radius }} >
                    <Animated.View
                        style={{
                            width: radius,
                            height: height,
                            borderRadius: radius / 2,
                            opacity: height,
                            position: 'absolute',
                            backgroundColor: 'green',
                        }}
                    >
                        <View style={{
                            position: 'absolute',
                            //left: 0, top: 0, right: 0, bottom: 0, alignItems: 'center',justifyContent: 'center',
                            height: radius,
                            alignSelf: 'center'
                        }}>
                            <TouchableOpacity onPress={() => {
                                const doOpen = !open
                                setOpen(doOpen)
                                if (!doOpen) {
                                    //如果是关闭组件，则立即去掉额外组件
                                    setRestCompoment(<></>)
                                }
                                setTimeout(() => {
                                    //默认组件一定加载成功，将处理事件放在这里而不是.start()回调事件
                                    //加载完成事件判断是否需要设置剩余组件
                                    setRestCompoment(
                                        doOpen ? <>
                                            <TouchableOpacity onPress={() => {
                                                setRestCompoment(<></>)
                                                setOpen(false)
                                                Animated.spring(
                                                    height,
                                                    {
                                                        toValue: radius,
                                                        duration: animationDuration,
                                                        useNativeDriver: false,
                                                    },
                                                ).start();
                                            }} >
                                                <MaterialCommunityIcons
                                                    name='download'
                                                    size={radius}
                                                    color={'yellow'}
                                                />
                                            </TouchableOpacity>
                                        </> : <></>
                                    )
                                }, animationDuration / 2)
                                Animated.spring(
                                    height,
                                    {
                                        toValue: (doOpen ? 2 * radius : radius),
                                        duration: animationDuration,
                                        useNativeDriver: false,
                                    },
                                ).start();
                            }} >
                                <AntDesign
                                    name='plus'
                                    size={radius}
                                    color={'yellow'}
                                />
                                {restCompoment}
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>

            </View >
        </>
    );
}

export default MyAnimatedModal