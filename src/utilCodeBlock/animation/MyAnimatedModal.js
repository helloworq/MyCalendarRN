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
                                setOpen(!open)
                                if (!open) {
                                    setRestCompoment(<></>)
                                }
                                Animated.spring(
                                    height,
                                    {
                                        toValue: (open ? 2 * radius : radius),
                                        duration: 1000,
                                        useNativeDriver: false,
                                    },
                                ).start(e => {
                                    //加载完成才显示剩余组件
                                    if (e.finished) {
                                        setRestCompoment(
                                            open ? <>
                                                <TouchableOpacity onPress={() => {
                                                }} >
                                                    <MaterialCommunityIcons
                                                        name='download'
                                                        size={radius}
                                                        color={'yellow'}
                                                    />
                                                </TouchableOpacity>
                                            </> : <></>
                                        )
                                    }
                                });
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