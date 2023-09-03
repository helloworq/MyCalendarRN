import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Button,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity,
    ToastAndroid,
    Text,
    StyleSheet,
} from "react-native";
import { PreferencesContext } from "./MyPreferencesContext";
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ImgStroage from "./storage/ImgStroage";
import storage from './storage/MhkvStroge';

const MyProfile = ({ navigation }) => {
    const { mode, setMode, theme, bgImg, setBgImg } = useContext(PreferencesContext)
    // /chevron-right
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
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: '95%', marginTop: 10, }}>
                    <View style={{ marginRight: 10 }}>
                        <TouchableOpacity onPress={() => {
                            setMode(mode === 'dark' ? 'light' : 'dark')
                            storage.set('theme', mode === 'dark' ? 'light' : 'dark')
                        }}>
                            <MaterialCommunityIcons name="theme-light-dark" size={30} color={theme.colors.iconColor} />
                        </TouchableOpacity>
                    </View>
                    <View style={{}}>
                        <TouchableOpacity onPress={() => navigation.navigate('MySkin')}>
                            <AntDesign name="skin" size={30} color={theme.colors.iconColor} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ backgroundColor: theme.colors.bgColor, justifyContent: 'space-around', width: '95%', height: 200, marginTop: 10, borderRadius: 10, }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image resizeMode='stretch' source={require('../img/a.jpg')} style={{ width: 80, height: 80, borderRadius: 100 }} />
                                <View>
                                    <Text style={{ color: theme.colors.fontColor, fontSize: 30, marginLeft: 10, fontWeight: 'bold' }}>李白</Text>
                                    <Text style={{ color: theme.colors.fontColor, fontSize: 15, marginLeft: 10 }}>危楼高百尺，手可摘星辰</Text>
                                </View>
                            </View>
                            <FontAwesome name='chevron-right' size={30} color={theme.colors.iconColor} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontSize: 25, color: theme.colors.fontColor, fontWeight: 'bold' }}>25</Text>
                                <Text style={{ color: theme.colors.fontColor }}>动态</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontSize: 25, color: theme.colors.fontColor, fontWeight: 'bold' }}>25</Text>
                                <Text style={{ color: theme.colors.fontColor }}>动态</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontSize: 25, color: theme.colors.fontColor, fontWeight: 'bold' }}>25</Text>
                                <Text style={{ color: theme.colors.fontColor }}>动态</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontSize: 25, color: theme.colors.fontColor, fontWeight: 'bold' }}>25</Text>
                                <Text style={{ color: theme.colors.fontColor }}>动态</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ backgroundColor: theme.colors.bgColor, justifyContent: 'space-around', width: '95%', height: 200, marginTop: 10, borderRadius: 10, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => navigation.navigate('MyAddTags')}>
                                    <FontAwesome name="tag" size={50} color={theme.colors.iconColor} />
                                </TouchableOpacity>
                                <Text style={{ color: theme.colors.fontColor }}>标签</Text>
                            </View>
                            <View style={{ alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
                                    <FontAwesome name="calendar" size={50} color={theme.colors.iconColor} />
                                </TouchableOpacity>
                                <Text style={{ color: theme.colors.fontColor }}>日历</Text>
                            </View>
                            <View style={{ alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => navigation.navigate('MyLocation')}>
                                    <FontAwesome name="location-arrow" size={50} color={theme.colors.iconColor} />
                                </TouchableOpacity>
                                <Text style={{ color: theme.colors.fontColor }}>地址</Text>
                            </View>
                            <View style={{ alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => navigation.navigate('MyTab')}>
                                    <FontAwesome name="github-alt" size={50} color={theme.colors.iconColor} />
                                </TouchableOpacity>
                                <Text style={{ color: theme.colors.fontColor }}>视频</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => navigation.navigate('MyFindOtherAppData')}>
                                    <FontAwesome name="video-camera" size={50} color={theme.colors.iconColor} />
                                </TouchableOpacity>
                                <Text style={{ color: theme.colors.fontColor }}>转码</Text>
                            </View>
                            <View style={{ alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => ToastAndroid.show('待开发', ToastAndroid.SHORT)}>
                                    <FontAwesome name="google" size={50} color={theme.colors.iconColor} />
                                </TouchableOpacity>
                                <Text style={{ color: theme.colors.fontColor }}>待开发</Text>
                            </View>
                            <View style={{ alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => ToastAndroid.show('待开发', ToastAndroid.SHORT)}>
                                    <FontAwesome name="gitlab" size={50} color={theme.colors.iconColor} />
                                </TouchableOpacity>
                                <Text style={{ color: theme.colors.fontColor }}>待开发</Text>
                            </View>
                            <View style={{ alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => ToastAndroid.show('待开发', ToastAndroid.SHORT)}>
                                    <FontAwesome name="slack" size={50} color={theme.colors.iconColor} />
                                </TouchableOpacity>
                                <Text style={{ color: theme.colors.fontColor }}>待开发</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </>
    )
}

export default MyProfile