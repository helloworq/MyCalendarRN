import React, { useState, useEffect } from 'react'
import ImageViewer from 'react-native-image-zoom-viewer';
import { uploadMoment, loadTags } from './util/FileUtil'
import { Chip } from 'react-native-paper';

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
    ToastAndroid
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

    const [text, onChangeText] = useState()
    const [tags, setTags] = useState([{}])
    const [data, setData] = useState(datas)
    const [index, setIndex] = useState(0)
    const [currImg, setCurrImg] = useState(null)
    const [close, setClose] = useState(false)

    useEffect(() => {
        loadTags().then((r) => { setTags(JSON.parse(r)) })
    }, [])

    function renderTag() {
        return Object.keys(tags).map(t =>
            <Chip
                icon={tags[t][1]}
                mode={tags[t][2] ? 'flat' : 'outlined'}
                style={{
                    padding: 2,
                    marginBottom: 10,
                    marginRight: 10,
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
                    //onShow={() => { console.log("load image -> " + currImg) }}
                    onRequestClose={() => {
                        setClose(false)
                    }}
                >
                    {/* <ImageViewer imageUrls={data} index={index} useNativeDriver={true} /> */}
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
            <View>
                <TextInput
                    maxLength={400}
                    multiline={true}
                    onChangeText={text => onChangeText(text)}
                    placeholder={'不错呀，又来打卡啦'}
                    value={text}
                    style={{
                        marginTop: 20,
                        marginLeft: 10,
                        marginRight: 10,
                        marginBottom: 10,
                        borderBottomColor: '#bebebe',
                        borderBottomWidth: 1
                    }}
                />
            </View>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 5 }}>
                    {renderTag()}
                </View>
                <FlatList
                    renderItem={renderRow}
                    data={data}
                    keyExtractor={keyExtractor}
                    numColumns={cols}
                    columnWrapperStyle={styles.columnStyle}
                    horizontal={false}
                />
            </View>
            <View>
                <Button onPress={() => {
                    const _tags = Object.values(tags).filter((e) => e[2] === true)
                    uploadMoment(text, data, _tags)
                    ToastAndroid.show('已上传', ToastAndroid.SHORT);
                }} title='发表' />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    columnStyle: {
        // marginLeft: 10,
        // marginRight: 10
    },
    innerViewStyle: {
        width: ImageWH,
        height: ImageWH * 0.8,
        marginLeft: left,
        marginTop: top,
        // 文字内容居中对齐
        alignItems: 'center'
    },
    iconStyle: {
        width: ImageWH,
        height: ImageWH * 0.8,
    },
});

export default MyMomentUploader