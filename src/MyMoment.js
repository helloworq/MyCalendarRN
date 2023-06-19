import React, { useState } from 'react'
import ImageViewer from 'react-native-image-zoom-viewer';

import {
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Image,
    Modal
} from 'react-native'

const datas = [
    {
        url: 'https://t7.baidu.com/it/u=3631608752,3069876728&fm=193&f=GIF',
    },
    {
        url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
    },
    {
        url: 'https://t7.baidu.com/it/u=3988344443,4282949406&fm=193&f=GIF',
    },
    {
        url: 'https://t7.baidu.com/it/u=3713375227,571533122&fm=193&f=GIF',
    },
    {
        url: 'https://t7.baidu.com/it/u=3631608752,3069876728&fm=193&f=GIF',
    },
    {
        url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
    },
    {
        url: 'https://t7.baidu.com/it/u=3988344443,4282949406&fm=193&f=GIF',
    },
    {
        url: 'https://t7.baidu.com/it/u=3713375227,571533122&fm=193&f=GIF',
    },
    {
        url: 'https://t7.baidu.com/it/u=3713375227,571533122&fm=193&f=GIF',
    },
    {
        url: 'https://t7.baidu.com/it/u=3988344443,4282949406&fm=193&f=GIF',
    },
    {
        url: 'https://t7.baidu.com/it/u=3713375227,571533122&fm=193&f=GIF',
    },
    {
        url: 'https://t7.baidu.com/it/u=3631608752,3069876728&fm=193&f=GIF',
    },
    {
        url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
    },
    {
        url: 'https://t7.baidu.com/it/u=3988344443,4282949406&fm=193&f=GIF',
    },
    {
        url: 'https://t7.baidu.com/it/u=3713375227,571533122&fm=193&f=GIF',
    },
    {
        url: 'https://t7.baidu.com/it/u=3713375227,571533122&fm=193&f=GIF',
    },
]
const screenW = Dimensions.get('window').width;

// 一些常量设置
const cols = 3; // 列数
const left = 10; // 左右边距
const top = 10; // 上下边距
const ImageWH = (screenW - (cols + 1) * left) / cols; // 图片大小

const keyExtractor = (item, index) => {
    return item.uri + index
}

const MyMomentView = () => {
    const [title, setTitle] = useState()
    const [data, setData] = useState(datas)
    const [block, setBlock] = useState()
    const [index, setIndex] = useState(0)
    const [currImg, setCurrImg] = useState(null)
    const [close, setClose] = useState(false)

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
                        setCurrImg(rowData.item.url)
                    }}
                    onLongPress={() => {
                        data.splice(rowData.index, 1)
                        let newData = data.slice()//解决数据更新，页面不刷新的问题
                        setData(newData)
                    }}
                    activeOpacity={0.8}>
                    <View style={styles.innerViewStyle}>
                        <Image source={{ uri: rowData.item.url }} style={styles.iconStyle} />
                    </View>
                </TouchableOpacity>
            </>
        )
    }

    return (
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