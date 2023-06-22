import React, { useState, useEffect } from 'react'
import ImageViewer from 'react-native-image-zoom-viewer';
import RNFS from 'react-native-fs'
import { removeData } from './util/FileUtil'

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
    Text
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

const MyMomentViewer = ({ route, navigation }) => {
    const { param } = route.params

    const [text, onChangeText] = useState(param.description)
    const [data, setData] = useState(param)
    const [index, setIndex] = useState(0)
    const [currImg, setCurrImg] = useState(null)
    const [close, setClose] = useState(false)

    useEffect(() => {
        RNFS.readFile(text).then((r) => onChangeText(r))
    }, [])

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
                        setCurrImg(rowData.item)
                    }}
                    activeOpacity={0.8}>
                    <View style={styles.innerViewStyle}>
                        <Image source={{ uri: rowData.item }} style={styles.iconStyle} />
                    </View>
                </TouchableOpacity>
            </>
        )
    }

    return (
        <>
            <View style={{
                flexDirection: 'column',
                flex: 1,
            }}>
                <TextInput
                    editable={true}
                    maxLength={400}
                    multiline={true}
                    onChangeText={text => { onChangeText(text) }}
                    value={text}
                    style={{
                        marginTop: 20,
                        marginLeft: 10,
                        marginRight: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#bebebe',
                    }}
                />
                <View>
                    <View>
                        <FlatList
                            renderItem={renderRow}
                            data={data.imageUrl}
                            keyExtractor={keyExtractor}
                            numColumns={cols}
                            columnWrapperStyle={styles.columnStyle}
                            horizontal={false}
                        />
                    </View>
                    <View style={{ marginTop: 10, alignItems: 'flex-end' }}>
                        <Text style={{ color: '#686868' }} onPress={() => {
                            removeData(route?.params?.ymd, route?.params?.param?.time)
                            //需要年/时间字段
                        }}>删除</Text>
                    </View>
                </View>
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

export default MyMomentViewer