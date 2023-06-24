import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AnimatedCircularProgress,Circle } from 'react-native-circular-progress';

const MyProgressBar = () => {
    return <AnimatedCircularProgress
    size={120}
    width={15}
    fill={100}
    tintColor="#00e0ff"
    backgroundColor="#3d5875"
    padding={10}
    renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="10" fill="blue" />}
    />
}

export default MyProgressBar