import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Animated, Image, } from "react-native";
import PokerList from "./PokerList";

const Pocker = ({ poker }) => {
    const defaultPoker = 'backface'
    const height = 90
    const width = 50
    const [showPoker, setShowPoker] = useState(defaultPoker)

    const turnOver = useRef(new Animated.Value(-1)).current;
    turnOver.addListener((r) => {
        if (r.value > 0) {
            setShowPoker(poker ?? defaultPoker)
        }
    })

    return (
        <>
            <View style={{ alignItems: 'center', backgroundColor: 'rgba(255,255,255,0)', height: height, width: width }}>
                <TouchableOpacity
                    onPress={() => {
                        Animated.timing(
                            turnOver,
                            {
                                toValue: 1,
                                duration: 1000,
                                useNativeDriver: true
                            },

                        ).start((r) => { })
                    }}>
                    <Animated.View style={{
                        transform: [
                            { scaleX: turnOver },
                        ]
                    }}>
                        <Image
                            source={PokerList[showPoker] ?? PokerList[defaultPoker]}
                            resizeMode={'stretch'}
                            style={{
                                height: height,
                                width: width,
                            }}
                        />
                    </Animated.View>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Pocker