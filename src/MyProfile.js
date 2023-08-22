import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Button,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";
import { PreferencesContext } from "./MyPreferencesContext";
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ImgStroage from "./storage/ImgStroage";
import storage, { getTagsByStroage, getTodayTagByStroage, statisticsByStroage } from './storage/MhkvStroge';
import { BlurView } from "@react-native-community/blur";

const MyProfile = ({ navigation }) => {
    const { mode, setMode, theme, bgImg, setBgImg } = useContext(PreferencesContext)

    return (
        <>
            <ImageBackground
                source={ImgStroage[bgImg]}
                resizeMode='stretch'
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: theme.colors.totalOpacityBgColor,
                }}
            >
                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Image resizeMode='stretch' source={require('../img/a.jpg')} style={{ width: 200, height: 200, borderRadius: 100 }} />
                        <Text style={{ color: theme.colors.fontColor, fontSize: 40 }}>李白</Text>
                    </View>
                    
                    <View>
                        <FlatList
                            keyExtractor={(item, index) => {
                                return item.path + index
                            }}
                            numColumns={2}
                            horizontal={false}
                            columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                            data={[
                                <TouchableOpacity onPress={() => navigation.navigate('MySkin')}>
                                    <View style={{ flexDirection: 'row' }}>
                                        < AntDesign name="skin" size={50} color={theme.colors.iconColor} />
                                        <Text style={{ fontSize: 30, color: theme.colors.fontColor }}>皮肤</Text>
                                    </View>
                                </TouchableOpacity>,
                                <TouchableOpacity onPress={() => {
                                    setMode(mode === 'dark' ? 'light' : 'dark')
                                    storage.set('theme', mode === 'dark' ? 'light' : 'dark')
                                }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        < MaterialCommunityIcons name="theme-light-dark" size={50} color={theme.colors.iconColor} />
                                        <Text style={{ fontSize: 30, color: theme.colors.fontColor }}>夜间</Text>
                                    </View>
                                </TouchableOpacity>,
                                <TouchableOpacity onPress={() => navigation.navigate('MyAddTags')}>
                                    <View style={{ flexDirection: 'row' }}>
                                        < MaterialIcons name="tag" size={50} color={theme.colors.iconColor} />
                                        <Text style={{ fontSize: 30, color: theme.colors.fontColor }}>标签</Text>
                                    </View>
                                </TouchableOpacity>,
                                <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
                                    <View style={{ flexDirection: 'row' }}>
                                        < MaterialCommunityIcons name="calendar-month" size={50} color={theme.colors.iconColor} />
                                        <Text style={{ fontSize: 30, color: theme.colors.fontColor }}>日历</Text>
                                    </View>
                                </TouchableOpacity>
                            ]}
                            renderItem={(item) => {
                                return <View
                                    style={{
                                        marginBottom: 5,
                                        marginTop: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >{item.item}</View>
                            }}
                        />
                    </View>
                </View>

            </ImageBackground>
        </>
    )
}

export default MyProfile