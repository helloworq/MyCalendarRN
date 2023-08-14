import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Button,
    ImageBackground,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";

const MyShadow = () => {


    return (
        <>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View style={{
                    width: 200,
                    height: 200,
                    borderRadius: 20,
                    elevation: 10,
                    backgroundColor: 'white',
                }}></View>
            </View>
        </>
    )
}

export default MyShadow