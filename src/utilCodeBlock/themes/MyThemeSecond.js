import React, { useState, useEffect, useContext } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, useColorScheme, Appearance } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { PreferencesContext } from "./PreferencesContext "


const MyThemeSecond = ({ navigation }) => {
    const { mode, setMode, theme } = useContext(PreferencesContext)

    return (
        <>
            <TouchableOpacity onPress={() => {
                setMode(mode === 'dark' ? 'light' : 'dark')
            }}>
                <MaterialCommunityIcons
                    name={"theme-light-dark"}
                    color={theme.colors.primary}
                    size={50}
                />
            </TouchableOpacity>

            <View style={{ flex: 1, }}>
                <View style={{
                    backgroundColor: theme?.colors?.primary,
                    margin: 20,
                    borderRadius: 20,
                    width: 200,
                    height: 200,
                    flexDirection: 'row',
                }}>
                </View>

                <TouchableOpacity onPress={() => {
                    navigation.navigate('MyThemeFirst')
                }}>
                    <MaterialCommunityIcons
                        name={"arrow-left"}
                        color={theme.colors.primary}
                        size={50}
                    />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default MyThemeSecond