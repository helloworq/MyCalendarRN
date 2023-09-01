import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    FlatList,
    Image,
} from "react-native";
import VideoPlayer from 'react-native-media-console';
import Orientation from 'react-native-orientation-locker';
import { FFmpegKit } from 'ffmpeg-kit-react-native';
import RNFS from 'react-native-fs'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

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

async function mergeVideoAudio(video, audio) {
    const newPath = video.substring(0, video.lastIndexOf('/'))
    const order = ` -i ${video} -i ${audio} -vcodec copy -acodec copy ${newPath}/new.mp4`
    await FFmpegKit.execute(order)
}

const MyTab = () => {
    const [rightComp, setRightComp] = useState()
    const [selectTab, setSelectTab] = useState(true)
    const portraitHeight = 300
    const fullScreenHeight = '100%'
    const [isFullscreen, setIsFullScreen] = useState(false)
    const bilibiliPath = RNFS.ExternalDirectoryPath + '/download'
    const [exist, setExist] = useState(false)
    const [fileList, setFileList] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        readAllFiles(bilibiliPath, fileList)
    }, [])

    async function readFileInfo() {
        let dataMap = {}
        if (fileList.length > 0) {
            fileList.forEach(e => {
                if (e.endsWith('index.json') || e.endsWith('.xml')) {
                    return
                }
                const key = e.replace(bilibiliPath, '')
                const secondSplit = key.indexOf('/', 1)

                let saved = dataMap[key.substring(1, secondSplit)]
                if (saved) {
                    dataMap[key.substring(1, secondSplit)].push(e)
                } else {
                    dataMap[key.substring(1, secondSplit)] = [e]
                }
            })
        }
        let newData = []

        Object.keys(dataMap).forEach(e => {
            const videoInfoPath = dataMap[e].filter(e => e.includes('entry'))[0]
            RNFS.readFile(videoInfoPath).then(ele => {
                let temp = {}
                temp['videoId'] = e
                temp['videoInfo'] = ele
                temp['videoPath'] = dataMap[e].filter(e => e.includes('video'))[0]
                temp['audioPath'] = dataMap[e].filter(e => e.includes('audio'))[0]
                newData.push(temp)
            })
        })
        setData(newData)
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: '5%',
                }}>
                    <TouchableOpacity onPress={() => {
                        setSelectTab(!selectTab)
                        readFileInfo()
                    }}>
                        <View style={{
                            borderLeftWidth: 1,
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            //borderRightWidth: 1,
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            width: 100,
                            backgroundColor: selectTab ? 'white' : 'gray'
                        }}>
                            <Text style={{ textAlign: 'center' }}>视频</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setSelectTab(!selectTab)}>
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
                                const videoPath = row.item.videoPath
                                const newPath = videoPath.substring(0, videoPath.lastIndexOf('/')) + '.mp4'
                                const videoInfo = JSON.parse(row.item.videoInfo)
                                const title = videoInfo['title']
                                const cover = videoInfo['cover']
                                const quality = videoInfo['quality_pithy_description']
                                const bvid = videoInfo['bvid']
                                const author = videoInfo['owner_name']
                                const avatar = videoInfo['owner_avatar']

                                let element = <>
                                    <View style={{ marginBottom: 30, flexDirection: 'row' }}>
                                        {/* <Button onPress={() => setRightComp(e)} title={row.item.name} style={{ borderRadius: 10 }} /> */}
                                        <Image source={{ uri: avatar }} style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }} />
                                        <Text numberOfLines={1}>{author}</Text>
                                    </View>
                                </>
                                return element
                            }}
                            keyExtractor={(item, index) => {
                                return item.path + index
                            }}
                            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                            data={data}
                            horizontal={false}
                            numColumns={1}
                        />
                    </View>

                    <View style={{
                        width: '73%',
                        marginLeft: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        height: '96%'
                    }} >
                        {/* {rightComp} */}

                        <FlatList
                            renderItem={(row) => {
                                const videoPath = row.item.videoPath
                                const audioPath = row.item.audioPath
                                const newPath = videoPath.substring(0, videoPath.lastIndexOf('/')) + '/new.mp4'
                                const videoInfo = JSON.parse(row.item.videoInfo)
                                const title = videoInfo['title']
                                const cover = videoInfo['cover']
                                const quality = videoInfo['quality_pithy_description']
                                const bvid = videoInfo['bvid']
                                const author = videoInfo['owner_name']
                                const avatar = videoInfo['owner_avatar']

                                return (
                                    <>
                                        <View style={{ margin: 10 }} >
                                            <View style={{ marginBottom: 10, }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15, marginLeft: 5 }}>{author}</Text>
                                                    <TouchableOpacity onPress={() => mergeVideoAudio(videoPath, audioPath)}>
                                                        <FontAwesome name='warning' size={20} color={'red'} />
                                                    </TouchableOpacity>
                                                </View>
                                                <Text style={{ color: 'black', fontSize: 12, marginLeft: 5 }}>{title}</Text>
                                            </View>
                                            <View>
                                                <VideoPlayer
                                                    source={{ uri: newPath }}
                                                    //isFullscreen={true}
                                                    //toggleResizeModeOnFullscreen={true}  //画面是否伸缩
                                                    navigator={() => { }}
                                                    onBack={() => { }}
                                                    paused={true}

                                                    //pan={{ horizontal: false, inverted: true }}
                                                    onPlay={() => console.log('播放')}
                                                    onPause={() => {
                                                        //const initial = Orientation.getInitialOrientation();
                                                    }}
                                                    showOnStart={false}
                                                    onEnterFullscreen={() => {
                                                        setIsFullScreen(true)
                                                        Orientation.lockToLandscape()
                                                    }}
                                                    onExitFullscreen={() => {
                                                        setIsFullScreen(false)
                                                        Orientation.lockToPortrait()
                                                    }}
                                                    containerStyle={{
                                                        width: '100%',
                                                        height: isFullscreen ? fullScreenHeight : portraitHeight,
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
                            data={data}
                            horizontal={false}
                            numColumns={1}
                        />

                    </View>
                </View>
            </View >
        </>
    );
};




export default MyTab
