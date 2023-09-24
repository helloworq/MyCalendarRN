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
import ImgStroage from "./storage/ImgStroage";
import { findAllTag, saveTag } from "./storage/repository/TagDao";

const MyAddTags = () => {
    //text icon disable暂不提供自增tag的功能，因为缺少图标对应
    const [text, setText] = useState()
    const [data, setData] = useState([])
    const { mode, setMode, theme, bgImg, setBgImg } = useContext(PreferencesContext)

    useEffect(() => findAllTag((e) => setData(e)), [])

    function renderTag() {
        return data.map(t =>
            <Chip
                key={t['NAME']}
                icon={t['ICON_CODE']}
                mode={'flat'}
                elevation={3}
                style={{
                    marginBottom: 10,
                    marginRight: 10,
                }}
                onPress={() => { }}
                onLongPress={() => {
                    const cal = data.filter(e => e['NAME'] != t['NAME'])
                    let newData = JSON.parse(JSON.stringify(cal))
                    setData(newData)
                }}
            >{t['NAME']}</Chip>
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
                                const curTag = { 'NAME': text, 'ICON_CODE': 'tag', 'NICK': '' }
                                let newData = JSON.parse(JSON.stringify(data))
                                newData.push(curTag)

                                setData(newData)
                            }} />
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ color: theme.colors.fontColor, fontSize: 25 }} >已存标签</Text>
                    </View>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {renderTag()}
                    </View>

                    <TouchableOpacity onPress={() => {
                        saveTag(data)
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