import React, { useState, useRef } from 'react';
import {
    View,
    Animated,
    TouchableOpacity,
    Text,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'

const HD = [
    "UHD",
    "1920x1200",
    "1920x1080",
    "1366x768",
    "1280x768",
    "1024x768",
    "800x600",
    "800x480",
    "768x1280",
    "720x1280",
    "640x480",
    "480x800",
    "400x240",
    "320x240",
    "240x320"
]

const MyAnimatedMenu = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current
    const [open, setOpen] = useState(false)
    const [restCompoment, setRestCompoment] = useState()
    const [showButton, setShowButton] = useState(<AntDesign name='plus' size={30} />)

    return (
        <>
            <View style={{
                position: 'absolute',
                right: 0,
                top: 50,
            }}>
                <TouchableOpacity onPress={() => {
                    let doOpen = !open
                    setOpen(doOpen)

                    if (doOpen) {
                        console.log(fadeAnim)
                        Animated.timing(
                            fadeAnim,
                            {
                                toValue: 1,
                                duration: 500,
                                useNativeDriver: true,
                            }
                        ).start();
                    } else {
                        fadeAnim.setValue(0)
                    }

                    setRestCompoment(
                        doOpen ? <View style={{
                            position: 'absolute',
                            right: 0,
                            top: 20,
                            backgroundColor: 'green',
                            zIndex:9999,
                        }}>
                            <Animated.View style={{
                                width: 100,
                                height: 600,
                                alignItems: 'center',
                                borderRadius: 20,
                                justifyContent: 'space-around',
                                opacity: fadeAnim,
                            }}>
                                {HD.map(e => <TouchableOpacity onPress={() => {
                                    setShowButton(<Text>{e}</Text>)
                                    setRestCompoment(<></>)
                                    setOpen(false)
                                }}><Text>{e}</Text></TouchableOpacity>)}
                            </Animated.View>
                        </View> : <></>
                    )
                }}>
                    {showButton}
                </TouchableOpacity>
            </View>
            {restCompoment}
        </>
    );
}

export default MyAnimatedMenu