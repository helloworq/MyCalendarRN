//创建tag标签界面
import React, { useState, useEffect } from "react";
import { TextInput, View, Button, ScrollView, ToastAndroid } from "react-native";
import { Chip } from 'react-native-paper';
import { writeTags, loadTags } from './util/FileUtil'

const MyAddTags = () => {
    //text icon disable暂不提供自增tag的功能，因为缺少图标对应
    const [text, setText] = useState()
    const [data, setData] = useState([])

    useEffect(() => {
        loadTags().then((r) => {
            if (r != null) {
                setData(JSON.parse(r))
            }
        })
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
                }}
                onPress={() => { }}
                onLongPress={() => {
                    data.splice(t,1)
                    let newData = JSON.parse(JSON.stringify(data))
                    setData(newData)
                }}
            >{data[t][0]}</Chip>
        )
    }

    return (
        <>
            <ScrollView>
                <View style={{
                    borderBottomWidth: 1,
                    marginLeft: 5,
                    marginBottom: 10,
                    borderBottomColor: '#bebebe',
                    flexDirection: 'row',
                }}>
                    <TextInput
                        placeholder="新增Tag"
                        style={{ flex: 1 }}
                        maxLength={20}
                        multiline={true}
                        onChangeText={text => setText(text)}
                        value={text}
                    />
                    <Button title="Add" style={{ flex: 1 }} onPress={() => {
                        let maxIndex = 1;
                        if (data.length != 0) {
                            maxIndex = Number(Math.max(...Object.keys(data).map(Number)))
                        }
                        data[maxIndex + 1] = ['#' + text, 'compass-outline', false]
                        let newData = JSON.parse(JSON.stringify(data))
                        newData = newData.filter((e) => e != null || e != undefined)
                        setData(newData)
                    }} />
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 5 }}>
                    {renderTag()}
                </View>
                <View style={{ marginLeft: 100, marginRight: 100 }} >
                    <Button title="保存" onPress={() => writeTags(data).then(() => ToastAndroid.show('已保存', ToastAndroid.SHORT))} />
                </View>
            </ScrollView>
        </>
    )

}

export default MyAddTags