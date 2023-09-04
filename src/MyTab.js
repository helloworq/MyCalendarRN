import React, { useState, useEffect, useContext } from "react";
import {
    Text,
    TouchableOpacity,
    View,
    Button,
    FlatList,
    Image,
    Modal,
    ImageBackground,
} from "react-native";
import VideoPlayer from 'react-native-media-console';
import Orientation from 'react-native-orientation-locker';
import RNFS from 'react-native-fs'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ImgStroage from "./storage/ImgStroage";
import { PreferencesContext } from "./MyPreferencesContext";

async function readAllFiles(path, data) {
    const dirs = await RNFS.readDir(path)
    dirs.forEach(e => {
        if (e.isDirectory()) {
            readAllFiles(e.path, data)
        } else {
            data.push(e.path)
        }
    })
}

function distinctByKey(array, key, key2) {
    if (array != null && array != undefined && array.length > 0) {
        let temp = {}
        array.forEach(e => {
            const videoInfo = JSON.parse(e['videoInfo'])
            const userId = videoInfo[key] + videoInfo[key2]
            const value = temp[userId]
            if (!value) {
                temp[userId] = [e] //不解析成对象
            }
        })
        return Object.values(temp).flat()
    }

    return array
}

const localSavePath = RNFS.ExternalDirectoryPath + '/bilibili/'
const MyTab = () => {
    const [selectTab, setSelectTab] = useState(true)
    const portraitHeight = 250
    const [fileList, setFileList] = useState([])
    const [data, setData] = useState([])
    const [modalVideo, setModalVideo] = useState('')
    const [modalVisiable, setModalVisiable] = useState(false)
    const [videoList, setVideoList] = useState()
    const { mode, setMode, theme, bgImg, setBgImg } = useContext(PreferencesContext)

    useEffect(() => {
        readAllFiles(localSavePath, fileList)
    }, [])

    function readFileInfo() {
        let dataMap = {}

        if (fileList.length > 0) {
            fileList.forEach(e => {
                const key = e.replace(localSavePath, '')
                const secondSplit = key.indexOf('/', 1)

                let saved = dataMap[key.substring(1, secondSplit)]
                if (saved) {
                    dataMap[key.substring(1, secondSplit)].push(e)
                } else {
                    dataMap[key.substring(1, secondSplit)] = [e]
                }
            })
        }

        let pList = []
        Object.keys(dataMap).map(e => {
            const videoInfoPath = dataMap[e].filter(e => e.includes('json'))[0]
            const videoPath = dataMap[e].filter(e => e.includes('mp4'))[0]
            pList.push(RNFS.readFile(videoInfoPath)
                .then(ele => {
                    let temp = {}
                    temp['videoInfo'] = ele
                    temp['videoPath'] = videoPath
                    return temp
                }))
        })
        Promise.all(pList).then(e => setData(e))
    }

    return (
        <>
            <ImageBackground
                source={ImgStroage[bgImg]}
                resizeMode='stretch'
                style={{
                    flex: 1,
                    backgroundColor: theme.colors.totalOpacityBgColor
                }}>
                <View style={{ flex: 1 }}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisiable}
                        statusBarTranslucent={true}
                        hardwareAccelerated={true}
                        onRequestClose={() => {
                            setModalVisiable(false)
                            Orientation.lockToPortrait()
                        }}
                    >
                        <VideoPlayer
                            source={{ uri: modalVideo }}
                            onBack={() => {
                                setModalVisiable(false)
                                Orientation.lockToPortrait()
                            }}
                            onEnterFullscreen={() => {
                                Orientation.lockToLandscape()
                            }}
                            onExitFullscreen={() => {
                                Orientation.lockToPortrait()
                            }}
                        />
                    </Modal>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        height: '5%',
                    }}>
                        <TouchableOpacity onPress={() => {
                            //setSelectTab(!selectTab)
                            readFileInfo()
                        }}>
                            <View style={{
                                borderLeftWidth: 1,
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                borderTopLeftRadius: 5,
                                borderBottomLeftRadius: 5,
                                width: 100,
                                backgroundColor: selectTab ? 'white' : 'gray'
                            }}>
                                <Text style={{ textAlign: 'center' }}>视频</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            // setSelectTab(!selectTab)
                            // readFileInfo()
                        }}>
                            <View style={{
                                borderRightWidth: 1,
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                borderLeftWidth: 1,
                                borderTopRightRadius: 5,
                                borderBottomRightRadius: 5,
                                width: 100,
                                backgroundColor: selectTab ? 'gray' : 'white'
                            }}>
                                <Text style={{ textAlign: 'center' }}>音乐</Text>
                            </View>
                        </TouchableOpacity>
                    </View >
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            width: '20%',
                            marginLeft: 10,
                            marginBottom: 10,
                            borderRadius: 10,
                            marginTop: 10,
                            height: '96%'
                        }} >

                            <FlatList
                                renderItem={(row) => {
                                    const videoInfo = JSON.parse(row.item.videoInfo)
                                    const authorId = videoInfo['owner_id']
                                    const author = videoInfo['owner_name']
                                    const avatar = videoInfo['owner_avatar']
                                    let element = <>
                                        <TouchableOpacity onPress={() => {
                                            let newData = data?.filter(e => {
                                                const videoInfo = JSON.parse(e['videoInfo'])
                                                const userId = videoInfo['owner_id']
                                                const userName = videoInfo['owner_name']
                                                if (authorId === userId && author === userName) {
                                                    return true
                                                }
                                            })

                                            setVideoList(newData)
                                        }} >
                                            <View style={{ marginBottom: 30, flexDirection: 'row' }}>
                                                <Image source={{ uri: avatar }} style={{
                                                    width: 20,
                                                    height: 20,
                                                    borderRadius: 15,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }} />
                                                <Text numberOfLines={1}>{author}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </>
                                    return element
                                }}
                                keyExtractor={(item, index) => {
                                    return item.path + index
                                }}
                                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                                data={distinctByKey(data, 'owner_name', 'owner_id')}
                                horizontal={false}
                                numColumns={1}
                            />
                        </View>

                        <View style={{
                            width: '77%',
                            marginLeft: 10,
                            marginBottom: 10,
                            borderRadius: 10,
                            height: '96%'
                        }} >
                            <FlatList
                                renderItem={(row) => {
                                    const videoPath = row.item.videoPath
                                    const videoInfo = JSON.parse(row.item.videoInfo)
                                    const cover = videoInfo['cover']
                                    const title = videoInfo['title']
                                    const quality = videoInfo['quality_pithy_description']
                                    const bvid = videoInfo['bvid']
                                    const author = videoInfo['owner_name']
                                    const userId = videoInfo['owner_id']
                                    const size = (videoInfo['total_bytes'] / 1024 / 1024).toFixed(2)
                                    const time = (videoInfo['total_time_milli'] / 1000 / 60).toFixed(2)

                                    return (
                                        <>
                                            <View style={{ margin: 10 }} >
                                                <View style={{}}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15, marginLeft: 5 }}>{author}</Text>
                                                        <FontAwesome name='warning' size={20} color={'green'} />
                                                    </View>
                                                    <Text style={{ color: 'black', fontSize: 12, }}>{title}</Text>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={{ color: 'black', fontSize: 12, }}>{bvid}</Text>
                                                        <Text style={{ color: 'black', fontSize: 12, }}>{quality}</Text>
                                                        <Text style={{ color: 'black', fontSize: 12, }}>{size}Mb</Text>
                                                        <Text style={{ color: 'black', fontSize: 12, }}>{time}min</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <VideoPlayer
                                                        source={{ uri: videoPath }}
                                                        poster={cover}
                                                        navigator={() => { }}
                                                        onBack={() => { }}
                                                        paused={true}
                                                        showOnStart={false}
                                                        onEnterFullscreen={() => {
                                                            setModalVisiable(true)
                                                            setModalVideo(videoPath)
                                                        }}
                                                        disableBack={true}
                                                        containerStyle={{
                                                            width: '100%',
                                                            height: portraitHeight,
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        </>
                                    )
                                }}
                                keyExtractor={(item, index) => {
                                    return item.path + index
                                }}
                                //data={data}
                                data={videoList}
                                horizontal={false}
                                numColumns={1}
                            />
                        </View>
                    </View>
                </View >
            </ImageBackground>
        </>
    );
};

export default MyTab
