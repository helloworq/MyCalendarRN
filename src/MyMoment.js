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
        url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
    },
    {
        url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
    },
    {
        url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
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

const Pops = (funcs) => {
    const [close, setClose] = useState(true)

    return (
        <>
            <Modal
                onRequestClose={() => {
                    setClose(!close)
                    funcs(true)
                }}
                transparent={true}
                visible={close}
            >
                <ImageViewer imageUrls={datas} />
            </Modal>
        </>
    )
}
const MyMomentView = () => {
    const [title, setTitle] = useState()
    const [data, setData] = useState(datas)
    const [block, setBlock] = useState()
    const [flag, setFlag] = useState(true)


    function renderRow(rowData) {
        return (
            <>
                <TouchableOpacity
                    onPress={() => {
                        setFlag(!flag)
                    }}
                    activeOpacity={0.8}>
                    <View style={styles.innerViewStyle}>
                        <Image source={{ uri: rowData.item.url }} style={styles.iconStyle} />
                    </View>
                </TouchableOpacity>
            </>
        )
    }

    const codeBlock = (
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

    return flag ? codeBlock : <Pops func={setFlag} />;
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