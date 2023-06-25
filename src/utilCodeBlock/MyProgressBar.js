import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const MyProgressBar = () => {
    const [fill, setFill] = useState(0)
    const [color, setColor] = useState(0)

    const ColorMap = {
        20: 'red',
        40: 'orange',
        60: 'yellow',
        80: 'blue',
        100: 'green'
    }

    function atRange(value) {
        let range = Object.keys(ColorMap);
        for (let i = 0; i < range.length; i++) {
            if (value < range[i]) {
                return ColorMap[range[i]];
            }
        }
        return ColorMap[range[range.length - 1]];
    }

    return (
        <>
            <Button title="Cilck Add" onPress={() => {
                const newValue = fill + 10
                setFill(newValue)
                console.log(atRange(newValue), newValue)
            }} />
            <Button title="Cilck Substract" onPress={() => {
                const newValue = fill - 10
                setFill(newValue)
                console.log(atRange(newValue), newValue)
            }} />
            <Button title="Cilck Check" onPress={() => {
                console.log(fill)
            }} />
            <AnimatedCircularProgress
                size={120}
                width={10}
                fill={fill}
                tintColor={atRange(fill)}
                rotation={0}
                backgroundColor="#c2c2d6"
                tintTransparency={true}
                padding={10}
                children={(num) => <Text>{num}</Text>}
            />
        </>
    )
}

export default MyProgressBar