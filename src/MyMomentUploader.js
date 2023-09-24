import React, { useState, useEffect, useContext } from 'react'
import { Chip } from 'react-native-paper';
import { PreferencesContext } from "./MyPreferencesContext";
import storage, { getTagsByStroage } from './storage/MhkvStroge';
import { saveMoment } from './storage/repository/MomentDao'
import { execInitSql } from './storage/repository/BaseDao';
import ImgStroage from "./storage/ImgStroage";
import ImageView from 'react-native-image-viewing'
import {
    TextInput,
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Image,
    Text,
    ToastAndroid,
    ImageBackground,
    ScrollView
} from 'react-native'
import { findAllTag, saveTag } from "./storage/repository/TagDao";

const screenW = Dimensions.get('window').width;

// 一些常量设置
const cols = 3; // 列数
const left = 10; // 左右边距
const top = 10; // 上下边距
const ImageWH = (screenW - (cols + 1) * left) / cols; // 图片大小


const keyExtractor = (item, index) => {
    return item.path + index
}

const MyMomentUploader = ({ route, navigation }) => {
    const { datas } = route.params
    const { mode, setMode, theme, bgImg, setBgImg } = useContext(PreferencesContext)
    const [text, onChangeText] = useState()
    const [tags, setTags] = useState([{}])
    const [data, setData] = useState(datas)
    const [index, setIndex] = useState(0)
    const [currImg, setCurrImg] = useState(null)
    const [close, setClose] = useState(false)
    const [selectTag, setSelectTag] = useState([])

    useEffect(() => {
        findAllTag((e) => setTags(e))
    }, [])

    function renderTag() {
        return tags.map(t =>
            <Chip
                icon={selectTag.some(e => e['ID'] === t['ID']) ? 'check-bold' : t['ICON_CODE']}
                textStyle={{ color: theme.colors.fontColor, }}
                selected={true}
                selectedColor={'black'}
                style={{
                    marginBottom: 10,
                    marginRight: 10,
                    backgroundColor: theme.colors.bgColor
                }}
                onPress={() => {
                    const news = selectTag.filter(e => e['ID'] === t['ID'])
                    if (news === null || news === undefined || news.length === 0) {
                        selectTag.push(t)
                        let newSelectTag = JSON.parse(JSON.stringify(selectTag))
                        setSelectTag(newSelectTag)
                    } else {
                        setSelectTag(selectTag.filter(e => e['ID'] != t['ID']))
                    }
                }}
            >{t['NAME']}</Chip>
        )
    }

    function renderRow(rowData) {

        return (
            <>
                <ImageView
                    images={[{ uri: currImg }]}
                    visible={close}
                    onRequestClose={() => setClose(false)}
                />

                <TouchableOpacity
                    onPress={() => {
                        setClose(true)
                        setIndex(rowData.index)
                        setCurrImg(rowData.item.path)
                    }}
                    onLongPress={() => {
                        data.splice(rowData.index, 1)
                        let newData = data.slice()//解决数据更新，页面不刷新的问题
                        setData(newData)
                    }}
                    activeOpacity={0.8}>
                    <View style={styles.innerViewStyle}>
                        <Image source={{ uri: rowData.item.path }} style={styles.iconStyle} />
                    </View>
                </TouchableOpacity>
            </>
        )
    }

    return (
        <>
            <ImageBackground
                source={ImgStroage[bgImg]}
                resizeMode='stretch'
                style={{ flex: 1, padding: 10, flexDirection: 'column', backgroundColor: theme.colors.totalOpacityBgColor }}>

                <View>
                    <TextInput
                        maxLength={400}
                        multiline={true}
                        onChangeText={text => onChangeText(text)}
                        placeholder={'不错呀，又来打卡啦'}
                        value={text}
                        placeholderTextColor={theme.colors.fontColor}
                        style={{
                            color: theme.colors.fontColor,
                            backgroundColor: theme.colors.bgColor,
                            borderRadius: 10,
                            marginBottom: 10,
                        }}
                    />
                </View>
                <ScrollView style={{ flex: 1, marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {renderTag()}
                    </View>
                    <FlatList
                        renderItem={renderRow}
                        data={data}
                        keyExtractor={keyExtractor}
                        numColumns={cols}
                        horizontal={false}
                    />
                </ScrollView>
                <View>
                    <TouchableOpacity onPress={() => {
                        //uploadMomentByStroage(text, data, _tags)
                        saveMoment(text, data, selectTag)
                        //execInitSql()
                        //selectCurUserMoment()
                        ToastAndroid.show('已上传', ToastAndroid.SHORT);
                    }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', height: 50, backgroundColor: theme.colors.bgColor, borderRadius: 20 }} >
                            <Text style={{ color: theme.colors.fontColor, fontSize: 20 }} >发表</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerViewStyle: {
        width: ImageWH,
        height: ImageWH * 0.8,
        marginTop: top,
        marginLeft: 5,
        // 文字内容居中对齐
        alignItems: 'center'
    },
    iconStyle: {
        width: ImageWH,
        height: ImageWH * 0.8,
    },
});

export default MyMomentUploader