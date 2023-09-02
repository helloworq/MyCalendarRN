import React, { useState, useRef } from 'react';
import {
    Button,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Animated,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const MyAnimation = () => {
    const radius = 100
    const fadeAnim = useRef(new Animated.Value(0)).current
    const height = useRef(new Animated.Value(radius)).current
    const [pressed, setPressed] = useState(false)


    let compomentBase = (
        <Animated.View>
            <TouchableOpacity onPress={() => {
                setPressed(!pressed)
                console.log(pressed)
                Animated.spring(
                    height,
                    {
                        toValue: (pressed ? radius : 2 * radius),
                        duration: 500,
                        useNativeDriver: true,
                    },
                ).start();
            }}>
                <FontAwesome color={pressed ? 'red' : 'green'} name={'warning'} size={50} />
            </TouchableOpacity>
        </Animated.View>
    )

    const compomentSecond = (
        <Animated.View>
            <TouchableOpacity onPress={() => {
                setPressed(!pressed)
                Animated.spring(
                    height,
                    {
                        useNativeDriver: true,
                        toValue: (pressed ? radius : 2 * radius),
                        duration: 500,
                    }
                ).start();
            }}>
                <FontAwesome color={pressed ? 'red' : 'green'} name={'warning'} size={50} />
            </TouchableOpacity>
        </Animated.View>
    )
    const [compoments, setCompoments] = useState([compomentBase])

    return (
        <>
            <View style={{ flex: 1, }}>
                {
                    <AnimatedCircularProgress
                        size={50}
                        width={5}
                        fill={80}
                        rotation={0}
                        tintColor="green"
                        //onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="white"
                    >
                        {() => <Text>下载</Text>}
                    </AnimatedCircularProgress>
                }
            </View>
        </>
    );
}

export default MyAnimation