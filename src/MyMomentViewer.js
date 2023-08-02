import React, { useState, useContext } from 'react'
import ImageViewer from 'react-native-image-zoom-viewer';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Chip } from 'react-native-paper';
import { PreferencesContext } from "./MyPreferencesContext";
import storage,{ deleteMoment } from './storage/MhkvStroge';
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
    Text,
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

const MyMomentViewer = ({ route, navigation }) => {
    const { param } = route.params
    const bgImg = storage.getString('bgImg') ? 'a' : 'a'
    const { mode, setMode, theme } = useContext(PreferencesContext)
    const [text, onChangeText] = useState(param.description)
    const [data, setData] = useState(param)
    const [index, setIndex] = useState(0)
    const [currImg, setCurrImg] = useState(null)
    const [close, setClose] = useState(false)

    function renderTag() {
        const tags = data.tags

        return tags.map(t =>
            <Chip
                icon={t[1]}
                mode={t[2] ? 'flat' : 'outlined'}
                textStyle={{color:theme.colors.fontColor,}}
                style={{
                    marginBottom: 10,
                    marginRight: 10,
                    backgroundColor: theme.colors.bgColor,
                }}
                onPress={() => { }}
            >{t[0]}</Chip>
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
            <ImageBackground
                source={ImgStroage[bgImg]}
                resizeMode='stretch'
                style={{ flex: 1, padding: 10, flexDirection: 'column' }}>
                <View style={{
                    flexDirection: 'column',
                    flex: 1,
                }}>
                    <TextInput
                        editable={false}
                        maxLength={400}
                        multiline={true}
                        onChangeText={text => { onChangeText(text) }}
                        value={text}
                        placeholderTextColor={theme.colors.fontColor}
                        style={{
                            color: theme.colors.fontColor,
                            marginBottom: 10,
                            borderRadius: 10,
                            backgroundColor: theme.colors.bgColor,
                        }}
                    />
                    <View>
                        <View>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {renderTag()}
                            </View>
                            <FlatList
                                renderItem={renderRow}
                                data={data.imageUrl}
                                keyExtractor={keyExtractor}
                                numColumns={cols}
                                horizontal={false}
                            />
                        </View>
                        <View style={{ marginTop: 10, marginRight: 10, alignItems: 'flex-end' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginRight: 10 }}>
                                    {param.date + ' ' + param.time}
                                </Text>
                                <FontAwesome onPress={() => {
                                    deleteMoment(param.date,param.time)
                                    ToastAndroid.show('已删除，再次进入后将刷新', ToastAndroid.SHORT);
                                }} name="trash" size={20} color={theme.colors.iconColor} />
                            </View>

                        </View>
                    </View>
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
        marginLeft:5,
        // 文字内容居中对齐
        alignItems: 'center'
    },
    iconStyle: {
        width: ImageWH,
        height: ImageWH * 0.8,
    },
});

export default MyMomentViewer