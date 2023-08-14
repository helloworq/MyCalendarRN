import React, { useState, useEffect, useContext } from 'react'
import ImageViewer from 'react-native-image-zoom-viewer';
import { Chip } from 'react-native-paper';
import { PreferencesContext } from "./MyPreferencesContext";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import storage,{ uploadMomentByStroage, getTagsByStroage } from './storage/MhkvStroge';
import ImgStroage from "./storage/ImgStroage";

import {
    TextInput,
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Image,
    Modal,
    Button,
    ToastAndroid,
    ImageBackground
} from 'react-native'

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
    const bgImg = storage.getString('bgImg') ? 'a' : 'a'
    const { mode, setMode, theme } = useContext(PreferencesContext)
    const [text, onChangeText] = useState()
    const [tags, setTags] = useState([{}])
    const [data, setData] = useState(datas)
    const [index, setIndex] = useState(0)
    const [currImg, setCurrImg] = useState(null)
    const [close, setClose] = useState(false)

    useEffect(() => {
        const tags = getTagsByStroage()
        setTags(tags)
    }, [])

    function renderTag() {
        return Object.keys(tags).map(t =>
            <Chip
                icon={tags[t][2] ? 'check-bold' : tags[t][1]}
                textStyle={{ color: theme.colors.fontColor, }}
                selected={true}
                selectedColor={'black'}
                style={{
                    marginBottom: 10,
                    marginRight: 10,
                    backgroundColor: theme.colors.bgColor
                }}
                onPress={() => {
                    tags[t][2] = !tags[t][2]
                    let newData = JSON.parse(JSON.stringify(tags))
                    setTags(newData)
                }}
            >{tags[t][0]}</Chip>
        )
    }

    function renderRow(rowData) {

        return (
            <>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={close}
                    onRequestClose={() => {
                        setClose(false)
                    }}
                >
                    <ImageViewer imageUrls={[{ url: currImg }]} useNativeDriver={true} />
                </Modal>
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
                <View style={{ flex: 1 }}>
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
                </View>
                <View>
                    <Button onPress={() => {
                        const _tags = Object.values(tags).filter((e) => e[2] === true)
                        uploadMomentByStroage(text, data, _tags)
                        ToastAndroid.show('已上传', ToastAndroid.SHORT);
                    }} title='发表' />
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