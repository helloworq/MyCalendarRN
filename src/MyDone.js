import React, { useContext, useState, useEffect } from "react";
import {
    Dimensions,
    View,
    Text,
    ImageBackground,
    ScrollView,
} from 'react-native'
import { PreferencesContext } from "./MyPreferencesContext";
import dayjs from "dayjs";
import { Chip, } from "react-native-paper";
import { getTodayTagByStroage, } from './storage/MhkvStroge';
import ImgStroage from "./storage/ImgStroage";

const MyDone = ({ navigation }) => {
    const { mode, setMode, theme, bgImg, setBgImg } = useContext(PreferencesContext)
    const screenHeight = Dimensions.get("window").height - 20
    const screenWidth = Dimensions.get("window").width
    const split = 10;
    const borderRadius = 20
    const fullBlockLength = screenWidth - 2 * split
    const [todayTags, setTodayTags] = useState([])

    useEffect(() => {
        setTodayTags(getTodayTagByStroage())
    }, [])

    function renderTag() {
        const tags = todayTags
        const eleTag = tags.map(t =>
            <Chip
                icon={t[1]}
                mode={t[2] ? 'flat' : 'outlined'}
                textStyle={{ color: theme.colors.fontColor, }}
                style={{
                    marginBottom: 10,
                    marginRight: 10,
                    backgroundColor: theme.colors.bgColor,
                }}
                onPress={() => { }}
            >{t[0]}</Chip>
        )
        return eleTag
    }

    return (
        <>
            <ImageBackground
                source={ImgStroage[bgImg]}
                resizeMode='stretch'
                style={{ flex: 1, backgroundColor: theme.colors.totalOpacityBgColor }}
            >
                <ScrollView style={{ flex: 1, flexDirection: 'column', }}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{
                            width: fullBlockLength,
                            borderRadius: borderRadius,
                            height: 200,
                            marginTop: split,
                            width: '95%',
                            backgroundColor: theme.colors.bgColor,
                        }}>
                            <View style={{ padding: 10, }}>
                                <Text style={{
                                    color: theme.colors.fontColor,
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                }}>What You Have Done Today {dayjs().format('MM-DD')}</Text>
                                <ScrollView style={{ flexDirection: 'column', height: 160, marginTop: 10 }}>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 5 }}>
                                        {renderTag()}
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground >
        </>
    )
};

export default MyDone