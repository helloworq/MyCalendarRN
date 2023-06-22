import React, { useState } from 'react'
import ImageViewer from 'react-native-image-zoom-viewer';
import { uploadMoment } from './util/FileUtil'

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

    const [text, onChangeText] = useState("666")
    const [data, setData] = useState(datas)
    const [index, setIndex] = useState(0)
    const [currImg, setCurrImg] = useState(null)
    const [close, setClose] = useState(false)

    function renderRow(rowData) {
        console.log(rowData)

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
                    value={text}
                    style={{
                        marginTop: 20,
                        marginLeft: 10,
                        marginRight: 10,
                        borderColor: '#1e343f',
                        borderWidth: 0.5,
                    }}
                />
            </View>
            <View style={styles.container}>
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
                    uploadMoment(text, data)
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