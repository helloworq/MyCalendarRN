import React, { useState } from 'react'
import ImageViewer from 'react-native-image-zoom-viewer';
import RNFS from 'react-native-fs'

import {
    TextInput,
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Image,
    Modal,
    Button
} from 'react-native'

// const datas = [
//     {
//         url: 'https://t7.baidu.com/it/u=3631608752,3069876728&fm=193&f=GIF',
//     },
//     {
//         url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
//     },
//     {
//         url: 'https://t7.baidu.com/it/u=3988344443,4282949406&fm=193&f=GIF',
//     },
//     {
//         url: 'https://t7.baidu.com/it/u=3713375227,571533122&fm=193&f=GIF',
//     },
//     {
//         url: 'https://t7.baidu.com/it/u=3631608752,3069876728&fm=193&f=GIF',
//     },
//     {
//         url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
//     },
//     {
//         url: 'https://t7.baidu.com/it/u=3988344443,4282949406&fm=193&f=GIF',
//     },
//     {
//         url: 'https://t7.baidu.com/it/u=3713375227,571533122&fm=193&f=GIF',
//     },
//     {
//         url: 'https://t7.baidu.com/it/u=3713375227,571533122&fm=193&f=GIF',
//     },
//     {
//         url: 'https://t7.baidu.com/it/u=3988344443,4282949406&fm=193&f=GIF',
//     },
//     {
//         url: 'https://t7.baidu.com/it/u=3713375227,571533122&fm=193&f=GIF',
//     },
//     {
//         url: 'https://t7.baidu.com/it/u=3631608752,3069876728&fm=193&f=GIF',
//     },
//     {
//         url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
//     },
//     {
//         url: 'https://t7.baidu.com/it/u=3988344443,4282949406&fm=193&f=GIF',
//     },
//     {
//         url: 'https://t7.baidu.com/it/u=3713375227,571533122&fm=193&f=GIF',
//     },
//     {
//         url: 'https://t7.baidu.com/it/u=3713375227,571533122&fm=193&f=GIF',
//     },
// ]
const screenW = Dimensions.get('window').width;
// const datas = [
//     {
//         "height": 960,
//         "mime": "image/jpeg",
//         "modificationDate": "1687262405000",
//         "path": "file:///storage/emulated/0/DCIM/Camera/IMG_20230620_120004.jpg",
//         "size": 123267,
//         "width": 960
//     },
//     {
//         "height": 960,
//         "mime": "image/jpeg",
//         "modificationDate": "1687262401000",
//         "path": "file:///storage/emulated/0/DCIM/Camera/IMG_20230620_120000.jpg",
//         "size": 123267,
//         "width": 960
//     },
//     {
//         "height": 960,
//         "mime": "image/jpeg",
//         "modificationDate": "1687262402000",
//         "path": "file:///storage/emulated/0/DCIM/Camera/IMG_20230620_120001.jpg",
//         "size": 123267,
//         "width": 960
//     },
//     {
//         "height": 960,
//         "mime": "image/jpeg",
//         "modificationDate": "1687262405000",
//         "path": "file:///storage/emulated/0/DCIM/Camera/IMG_20230620_120002_1.jpg",
//         "size": 123267,
//         "width": 960
//     },
//     {
//         "height": 960,
//         "mime": "image/jpeg",
//         "modificationDate": "1687262955000",
//         "path": "file:///storage/emulated/0/DCIM/Camera/IMG_20230620_120914.jpg",
//         "size": 123254,
//         "width": 960
//     },
//     {
//         "height": 960,
//         "mime": "image/jpeg",
//         "modificationDate": "1687262390000",
//         "path": "file:///storage/emulated/0/DCIM/Camera/IMG_20230620_115948.jpg",
//         "size": 123159,
//         "width": 960
//     },
//     {
//         "height": 480,
//         "mime": "image/jpeg",
//         "modificationDate": "1687262981000",
//         "path": "file:///storage/emulated/0/DCIM/Camera/IMG_20230620_120941.jpg",
//         "size": 29685,
//         "width": 480
//     },
//     {
//         "height": 480,
//         "mime": "image/jpeg",
//         "modificationDate": "1687262979000",
//         "path": "file:///storage/emulated/0/DCIM/Camera/IMG_20230620_120939.jpg",
//         "size": 29739,
//         "width": 480
//     },
//     {
//         "height": 960,
//         "mime": "image/jpeg",
//         "modificationDate": "1687262404000",
//         "path": "file:///storage/emulated/0/DCIM/Camera/IMG_20230620_120002.jpg",
//         "size": 123267,
//         "width": 960
//     },
//     {
//         "height": 480,
//         "mime": "image/jpeg",
//         "modificationDate": "1687262980000",
//         "path": "file:///storage/emulated/0/DCIM/Camera/IMG_20230620_120940.jpg",
//         "size": 29392,
//         "width": 480
//     },
//     {
//         "height": 960,
//         "mime": "image/jpeg",
//         "modificationDate": "1687262421000",
//         "path": "file:///storage/emulated/0/DCIM/Camera/IMG_20230620_120020.jpg",
//         "size": 123337,
//         "width": 960
//     },
//     {
//         "height": 960,
//         "mime": "image/jpeg",
//         "modificationDate": "1687262970000",
//         "path": "file:///storage/emulated/0/DCIM/Camera/IMG_20230620_120929.jpg",
//         "size": 123282,
//         "width": 960
//     }
// ]

// 一些常量设置
const cols = 3; // 列数
const left = 10; // 左右边距
const top = 10; // 上下边距
const ImageWH = (screenW - (cols + 1) * left) / cols; // 图片大小

var path = RNFS.DocumentDirectoryPath + '/MyData/'

function getCurrentYMD() {
    const d = new Date();
    return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay()
}

function getCurrentTime() {
    const d = new Date();
    return d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds()
}

const keyExtractor = (item, index) => {
    return item.path + index
}

const MyMomentView = ({ route, navigation }) => {
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
                    folderYMD = getCurrentYMD()
                    folderTime = getCurrentTime()

                    RNFS.mkdir(path + folderYMD)
                    RNFS.mkdir(path + folderYMD + '/' + folderTime)
                    RNFS.writeFile(path + folderYMD + '/' + folderTime + '/data.json', text)

                    data.forEach(element => {
                        RNFS.copyFile(element.path,
                            'file://' + path + folderYMD
                            + '/' + folderTime + element.path.slice(element.path.lastIndexOf('/')))
                        console.log(element.path)
                        console.log(path + folderYMD
                            + '/' + folderTime + element.path.slice(element.path.lastIndexOf('/')))
                    });

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

export default MyMomentView