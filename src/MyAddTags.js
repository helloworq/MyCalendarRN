//创建tag标签界面
import React, { useState, useEffect, useContext } from "react";
import {
    TextInput,
    Text,
    View,
    Button,
    ScrollView,
    ToastAndroid,
    ImageBackground,
    TouchableOpacity
} from "react-native";
import { Chip } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { PreferencesContext } from "./MyPreferencesContext";
import storage, { getTagsByStroage, setTagsByStroage } from './storage/MhkvStroge';
import ImgStroage from "./storage/ImgStroage";

const MyAddTags = () => {
    //text icon disable暂不提供自增tag的功能，因为缺少图标对应
    const [text, setText] = useState()
    const [data, setData] = useState([])
    const { mode, setMode, theme, bgImg, setBgImg } = useContext(PreferencesContext)

    useEffect(() => {
        const tags = getTagsByStroage()
        setData(tags)
    }, [])

    function renderTag() {
        return data.map(t =>
            <Chip
                key={t[0]}
                icon={t[1]}
                mode={'flat'}
                elevation={3}
                style={{
                    //padding: 2,
                    marginBottom: 10,
                    marginRight: 10,
                    //backgroundColor: theme.colors.bgColor,
                }}
                onPress={() => { }}
                onLongPress={() => {
                    const cal = data.filter(e => e[0] != t[0])
                    let newData = JSON.parse(JSON.stringify(cal))
                    setData(newData)
                }}
            >{t[0]}</Chip>
        )
    }

    return (
        <>
            <ImageBackground
                source={ImgStroage[bgImg]}
                resizeMode='stretch'
                style={{
                    flex: 1,
                    padding: 10,
                    flexDirection: 'column',
                    backgroundColor: theme.colors.totalOpacityBgColor
                }}>
                <ScrollView>
                    <View style={{
                        marginBottom: 10,
                        flexDirection: 'row',
                        borderRadius: 20,
                        //backgroundColor: theme.colors.bgColor,
                    }}>
                        <TextInput
                            placeholder="新增tag  (长按tag可删除)"
                            style={{ flex: 1, borderRadius: 10, padding: 10 }}
                            maxLength={400}
                            multiline={true}
                            onChangeText={text => setText(text)}
                            value={text}
                        />
                        <MaterialIcons name={"add-circle"} color={theme.colors.iconColor} size={50}
                            onPress={() => {
                                if (!data.some(e => e[0] === ('#' + text)) && text != '全部标签') {
                                    let maxIndex = 1;
                                    if (data.length != 0) {
                                        maxIndex = Number(Math.max(...Object.keys(data).map(Number)))
                                    }
                                    data[maxIndex + 1] = ['#' + text, 'tag', false]
                                    let newData = JSON.parse(JSON.stringify(data))
                                    newData = newData.filter((e) => e != null || e != undefined)

                                    setData(newData)
                                }
                            }} />
                    </View>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {renderTag()}
                    </View>

                    <TouchableOpacity onPress={() => {
                        setTagsByStroage(data)
                        ToastAndroid.show('已保存', ToastAndroid.SHORT)
                    }} >
                        <View style={{ alignItems: 'center', justifyContent: 'center', height: 40, backgroundColor: theme.colors.bgColor, borderRadius: 20 }} >
                            <Text style={{ color: theme.colors.fontColor, fontSize: 18 }} >保存</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        </>
    )

}

export default MyAddTags