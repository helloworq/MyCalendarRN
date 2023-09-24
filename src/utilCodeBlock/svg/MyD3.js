import React, { useState, useEffect, useContext, useRef } from 'react';
import {
    View,
    Button,
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Text,
} from "react-native";
import * as d3 from "d3";


const MyD3 = () => {
    const width = 640
    const height = 400
    const marginTop = 20
    const marginRight = 20
    const marginBottom = 30

    const gx = useRef();
    const gy = useRef();
    return (
        <>
            <View>
                <svg width={width} height={height}>
                    <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
                </svg>
            </View>
        </>
    )
}

export default MyD3