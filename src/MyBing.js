import React, { useContext, useState, } from "react";
import {
    Dimensions,
    View,
    TouchableOpacity,
    Text,
    FlatList,
    Button,
    Modal,
    ToastAndroid,
    Image,
    ImageBackground,
} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer';
import ImgStroage from "./storage/ImgStroage";
import { PreferencesContext } from "./MyPreferencesContext";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import RNFS from 'react-native-fs'

const EXT = 'jpg'
const DOMAIN = 'https://cn.bing.com'
const API = 'https://raw.onmicrosoft.cn/Bing-Wallpaper-Action/main/data/zh-CN_all.json'
const HD = [
    "UHD",
    "1920x1200",
    "1920x1080",
    "1366x768",
    "1280x768",
    "1024x768",
    "800x600",
    "800x480",
    "768x1280",
    "720x1280",
    "640x480",
    "480x800",
    "400x240",
    "320x240",
    "240x320"
]

const MyBing = ({ navigation }) => {
    const { mode, setMode, theme, bgImg, setBgImg } = useContext(PreferencesContext)
    const sliceSize = 5
    const [canLoadMore, setCanLoadMore] = useState(true)
    const [index, setIndex] = useState(0)
    const [picJson, setPicJson] = useState()
    const [data, setData] = useState([])
    const [hd, setHd] = useState(HD[0])
    const screenWidth = Dimensions.get("window").width
    const screenHeight = Dimensions.get("window").height
    const imgWidth = screenWidth / 3 - 10
    const [currImg, setCurrImg] = useState(null)
    const [close, setClose] = useState(false)
    //"https://{domain}{data.urlbase}_{hd}.{ext}&{query}",

    async function saveToRoll(img) {
        RNFS.mkdir(RNFS.ExternalDirectoryPath + '/image/')
        const savePath = RNFS.ExternalDirectoryPath + `/image/${new Date().getTime()}.${EXT}`
        RNFS.downloadFile({
            fromUrl: img,
            toFile: savePath,
            background: true,
            begin: (res) => {
                ToastAndroid.show(`开始下载`, ToastAndroid.SHORT)
            },
        }).promise.then(e => {
            CameraRoll.save(savePath)
                .then(e => RNFS.unlink(savePath))
                .catch(e => {
                    ToastAndroid.show(`保存失败${e}`, ToastAndroid.SHORT)
                })
        }).catch(e => ToastAndroid.show(`下载失败${e}`, ToastAndroid.SHORT))
    }

    return (
        <>
            <ImageBackground
                source={ImgStroage[bgImg]}
                resizeMode='stretch'
                style={{ flex: 1, backgroundColor: theme.colors.totalOpacityBgColor }}
            >
                <Button title="Fetch" onPress={() => {
                    fetch(API)
                        .then(json => json.json())
                        .then(json => {
                            setPicJson(json)
                            setData(json.data.slice(index * sliceSize, (index + 1) * sliceSize))//单独存放此变量，防止一次性全部加载
                        })
                }} />
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={close}
                    onRequestClose={() => {
                        setClose(false)
                    }}
                >
                    <ImageViewer
                        onSave={() => saveToRoll(currImg)}
                        imageUrls={[{ url: currImg }]}
                        menuContext={{ "saveToLocal": "保存到相册", "cancel": "取消" }}
                        useNativeDriver={true} />
                </Modal>
                <View style={{ height: screenHeight - 90 }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                        <View style={{ alignItems: 'center' }} >
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }} >总数量</Text>
                            <Text style={{ fontSize: 15 }} >{picJson ? picJson['Total'] : ''}</Text>
                        </View>
                        <View style={{ alignItems: 'center' }} >
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }} >最后更新时间</Text>
                            <Text style={{ fontSize: 15 }} >{picJson ? picJson['LastUpdate'] : ''}</Text>
                        </View>

                    </View>
                    <FlatList
                        data={data}
                        onEndReached={() => {
                            if (canLoadMore) {
                                const indexTemp = index + 1
                                const overload = ((indexTemp + 1) * sliceSize) >= picJson['Total']
                                const secondSize = overload ? picJson['Total'] : ((indexTemp + 1) * sliceSize)
                                let temp = data.concat(picJson.data.slice(indexTemp * sliceSize, secondSize))
                                setData(temp)
                                setIndex((indexTemp + 2))
                                setCanLoadMore(overload ? false : true)
                            }
                        }}
                        renderItem={(row) => {
                            const img = `${DOMAIN}/${row.item.urlbase}_${hd}.${EXT}`
                            return (
                                <>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setClose(true)
                                            setCurrImg(img)
                                        }}
                                    >
                                        <Image source={{ uri: img }} style={{ width: imgWidth, height: imgWidth }} />
                                    </TouchableOpacity>
                                </>
                            )
                        }}
                        numColumns={3}
                        keyExtractor={(item, index) => item['hsh']}
                        columnWrapperStyle={{ justifyContent: 'space-around' }}
                        ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
                        horizontal={false}
                    />
                </View>
            </ImageBackground >
        </>
    )
}

export default MyBing


// "hdList": [
//     "UHD",
//     "1920x1200",
//     "1920x1080",
//     "1366x768",
//     "1280x768",
//     "1024x768",
//     "800x600",
//     "800x480",
//     "768x1280",
//     "720x1280",
//     "640x480",
//     "480x800",
//     "400x240",
//     "320x240",
//     "240x320"
//   ]
//Usage调用方式
// {
//     "repo": "https://github.com/zkeq/Bing-Wallpaper-Action",
//     "docs": "https://bing-wallpaper.apifox.cn",
//     "format": "https://{domain}{data.urlbase}_{hd}.{ext}&{query}",
//     "domainList": [
//       "bing.com",
//       "cn.bing.com"
//     ],
//     "hdList": [
//       "UHD",
//       "1920x1200",
//       "1920x1080",
//       "1366x768",
//       "1280x768",
//       "1024x768",
//       "800x600",
//       "800x480",
//       "768x1280",
//       "720x1280",
//       "640x480",
//       "480x800",
//       "400x240",
//       "320x240",
//       "240x320"
//     ],
//     "ext": "jpg",
//     "query": {
//       "w": "width",
//       "h": "height"
//     },
//     "example": "https://cn.bing.com/th?id=OHR.CostadaMorte_EN-US3132736041_1920x1080.jpg&w=384&h=216",
//     "UHD_example": "https://www.bing.com/th?id=OHR.Arrone_EN-US2438328393_UHD.jpg",
//     "ad": "https://cdn.onmicrosoft.cn"
//   }