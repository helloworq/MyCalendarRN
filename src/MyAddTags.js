//创建tag标签界面
import React, { useState, useEffect, useContext } from "react";
import { TextInput, View, Button, ScrollView, ToastAndroid, ImageBackground } from "react-native";
import { Chip } from 'react-native-paper';
import { writeTags, loadTags } from './util/FileUtil'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { PreferencesContext } from "./MyPreferencesContext";
import storage from './storage/MhkvStroge';

const MyAddTags = () => {
    //text icon disable暂不提供自增tag的功能，因为缺少图标对应
    const [text, setText] = useState()
    const [data, setData] = useState([])
    const { mode, setMode, theme } = useContext(PreferencesContext)

    useEffect(() => {
        const tags = storage.getString('tags')
        console.log('>>>>>', tags, tags?.length)
        if (tags != null && tags != undefined) {
            setData(JSON.parse(tags))
        }
    }, [])

    function renderTag() {
        return Object.keys(data).map(t =>
            <Chip
                key={t}
                icon={data[t][1]}
                mode={data[t][2] ? 'flat' : 'outlined'}
                style={{
                    padding: 2,
                    marginBottom: 10,
                    marginRight: 10,
                    backgroundColor: theme.colors.bgColor
                }}
                onPress={() => { }}
                onLongPress={() => {
                    data.splice(t, 1)
                    let newData = JSON.parse(JSON.stringify(data))
                    setData(newData)
                }}
            >{data[t][0]}</Chip>
        )
    }

    return (
        <>
            <ImageBackground
                source={require('./utilCodeBlock/layout/bg.jpeg')}
                resizeMode='stretch'
                style={{ flex: 1, padding: 10, flexDirection: 'column' }}>
                <ScrollView>
                    <View style={{
                        marginBottom: 10,
                        flexDirection: 'row',
                        borderRadius: 10,
                        backgroundColor: theme.colors.bgColor,
                    }}>
                        <TextInput
                            placeholder="新增tag  (长按tag可删除)"
                            style={{ flex: 1 }}
                            maxLength={20}
                            multiline={true}
                            onChangeText={text => setText(text)}
                            value={text}
                        />
                        <MaterialIcons name={"add-circle"} color={theme.colors.bgColor} size={50}
                            onPress={() => {
                                let maxIndex = 1;
                                if (data.length != 0) {
                                    maxIndex = Number(Math.max(...Object.keys(data).map(Number)))
                                }
                                data[maxIndex + 1] = ['#' + text, 'tag', false]
                                let newData = JSON.parse(JSON.stringify(data))
                                newData = newData.filter((e) => e != null || e != undefined)
                                setData(newData)
                            }} />
                    </View>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {renderTag()}
                    </View>
                    <View style={{}} >
                        <Button title="保存" onPress={() => {
                            storage.set('tags', JSON.stringify(data))
                            ToastAndroid.show('已保存', ToastAndroid.SHORT)
                        }} />
                    </View>
                </ScrollView>
            </ImageBackground>
        </>
    )

}

export default MyAddTags