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
import AntDesign from 'react-native-vector-icons/AntDesign'
import ImgStroage from "./storage/ImgStroage";
import { PreferencesContext } from "./MyPreferencesContext";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import RNFS from 'react-native-fs'
import ImageView from 'react-native-image-viewing'
import { Dropdown } from 'react-native-element-dropdown'
import SelectDropdown from 'react-native-select-dropdown'

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
//"https://{domain}{data.urlbase}_{hd}.{ext}&{query}",
const MyBing = ({ navigation }) => {
    const { mode, setMode, theme, bgImg, setBgImg } = useContext(PreferencesContext)
    const sliceSize = 20
    const [canLoadMore, setCanLoadMore] = useState(true)
    const [index, setIndex] = useState(0)
    const [picJson, setPicJson] = useState()
    const [data, setData] = useState([])
    const [hd, setHd] = useState(HD[0])
    const screenWidth = Dimensions.get("window").width
    const screenHeight = Dimensions.get("window").height
    const imgWidth = screenWidth / 2 - 10
    const [currImg, setCurrImg] = useState(null)
    const [close, setClose] = useState(false)

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
                .then(e => ToastAndroid.show(`下载完成`, ToastAndroid.SHORT))
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
                <TouchableOpacity onPress={() => {
                    fetch(API)
                        .then(json => json.json())
                        .then(json => {
                            setPicJson(json)
                            setData(json.data.slice(index * sliceSize, (index + 1) * sliceSize))//单独存放此变量，防止一次性全部加载
                        })
                }}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 40,
                        backgroundColor: theme.colors.bgColor,
                        borderRadius: 20,
                        margin: 5,
                    }}>
                        <Text style={{ fontSize: 20 }}>Bing 壁纸</Text>
                    </View>
                </TouchableOpacity>
                <ImageView
                    images={[{ uri: currImg }]}
                    visible={close}
                    onRequestClose={() => setClose(false)}
                    FooterComponent={() => {
                        return (
                            <TouchableOpacity onPress={() => { saveToRoll(currImg) }} >
                                <View style={{ alignItems: 'center' }}>
                                    <AntDesign name='download' size={30} color={'white'} />
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                <View style={{ height: screenHeight - 90 }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,margin:5}} >
                        <View style={{ alignItems: 'center' }} >
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }} >总数量</Text>
                            <Text style={{ fontSize: 15 }} >{picJson ? picJson['Total'] : ''}</Text>
                        </View>
                        <View style={{ alignItems: 'center' }} >
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }} >最后更新时间</Text>
                            <Text style={{ fontSize: 15 }} >{picJson ? picJson['LastUpdate'] : ''}</Text>
                        </View>
                        <View style={{ alignItems: 'center', }} >
                            <SelectDropdown
                                data={HD}
                                buttonStyle={{ backgroundColor: "rgba(255,255,255,0)" }}
                                dropdownOverlayColor="rgba(255,255,255,0)"
                                renderDropdownIcon={() => <AntDesign size={20} name='down' />}
                                onSelect={(selectedItem, index) => {
                                    setHd(selectedItem)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            />
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
                                setIndex((indexTemp + 1))
                                setCanLoadMore(overload ? false : true)
                            }
                        }}
                        renderItem={(row) => {
                            const img = `${DOMAIN}/${row.item.urlbase}_${hd}.${EXT}`
                            //如果是uhd 默认比例为  16:9
                            const resolution = hd === HD[0] ? '16x9' : hd
                            const width = imgWidth
                            const height = resolution.split('x')[1] * width / resolution.split('x')[0]

                            return (
                                <>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setClose(true)
                                            setCurrImg(img)
                                        }}
                                    >
                                        <View>
                                            <Image source={{ uri: img }} style={{ width: width, height: height }} />
                                            <View style={{
                                                position: 'absolute',
                                                bottom: 5,
                                                left: 5,
                                                right: 5,
                                            }}>
                                                <Text style={{ fontSize: 20, color: 'white', }}>{row.item.title}</Text>
                                                <Text style={{ fontSize: 10, color: 'white', }}>{row.item.copyright}</Text>
                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                </>
                            )
                        }}
                        numColumns={2}
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