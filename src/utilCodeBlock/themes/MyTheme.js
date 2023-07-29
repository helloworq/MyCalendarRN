import React, { useState, useContext, createContext } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MyThemeFirst from "./MyThemeFirst";
import MyThemeSecond from "./MyThemeSecond";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PreferencesContext } from "./PreferencesContext ";

const MyTheme = () => {
    const Stack = createNativeStackNavigator()

    const darkMode = {
        dark: false,
        colors: {
            primary: 'rgb(0, 0, 0)',
            background: 'rgb(255, 255, 0)',
            card: 'rgb(255, 255, 0)',
            text: 'rgb(255, 255, 0)',
            border: 'rgb(255, 0, 0)',
            notification: 'rgb(255, 0, 0)',
        },
    };

    const lightMode = {
        dark: false,
        colors: {
            primary: 'rgb(255, 220, 255)',
            background: 'rgb(255, 255,250)',
            card: 'rgb(255, 255,255)',
            text: 'rgb(255, 255, 255)',
            border: 'rgb(255, 255, 255)',
            notification: 'rgb(255, 250, 255)',
        },
    }

    const [mode, setMode] = useState('light')
    let theme = mode === 'light' ? darkMode : lightMode;

    return (
        <>
            <PreferencesContext.Provider value={{ mode, setMode, theme }}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="MyThemeFirst" component={MyThemeFirst} options={{ headerShown: false }} />
                        <Stack.Screen name="MyThemeSecond" component={MyThemeSecond} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PreferencesContext.Provider>
        </>
    )
}

export default MyTheme