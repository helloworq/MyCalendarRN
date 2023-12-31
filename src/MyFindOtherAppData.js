import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Button,
    Image,
    TouchableOpacity,
    ToastAndroid,
    FlatList,
} from "react-native";
import RNFS from 'react-native-fs'
import { Text } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { FFmpegKit } from 'ffmpeg-kit-react-native';

const biliPath = RNFS.ExternalDirectoryPath + '/Download'
const localSavePath = RNFS.ExternalDirectoryPath + '/bilibili/'

async function mergeVideoAudio(video, audio, savePath, saveValue) {
    const appPath = localSavePath + savePath
    RNFS.mkdir(appPath)
    const saveVideoPath = appPath + '/' + savePath

    const order = ` -i ${video} -i ${audio} -vcodec copy -acodec copy ${saveVideoPath}.mp4`

    RNFS.writeFile(saveVideoPath + '.json', saveValue)
    await FFmpegKit.execute(order)
}

const MyFindOtherAppData = () => {
    const [fileList, setFileList] = useState([])
    const [localFile, setLocalFile] = useState([])
    const [data, setData] = useState([])

    function readAllFiles(path, data) {
        RNFS.readDir(path).then(e=>{
            e.forEach(e => {
                if (e.isDirectory()) {
                    readAllFiles(e.path, data)
                } else {
                    data.push(e.path)
                }
            })
        })
        setFileList(data)
    }

    useEffect(() => {
        readAllFiles(biliPath, fileList)
        RNFS.readdir(localSavePath).then(e => setLocalFile(e))
    }, [])

    function readFileInfo() {
        //重新读取本地文件
        RNFS.readdir(localSavePath).then(e => setLocalFile(e))

        let dataMap = {}
        if (fileList.length > 0) {
            fileList.forEach(e => {
                if (e.endsWith('index.json') || e.endsWith('.xml')) {
                    return
                }
                const key = e.replace(biliPath, '')
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
        Object.keys(dataMap).forEach(e => {
            const videoInfoPath = dataMap[e].filter(e => e.includes('entry'))[0]
            const videoPath = dataMap[e].filter(e => e.includes('video'))[0]
            const audioPath = dataMap[e].filter(e => e.includes('audio'))[0]

            pList.push(RNFS.readFile(videoInfoPath)
                .then(ele => {
                    let temp = {}
                    temp['videoInfo'] = ele
                    temp['videoPath'] = videoPath
                    temp['audioPath'] = audioPath
                    return temp
                }))
        })
        Promise.all(pList).then(e => setData(e))
    }

    return (
        <>
            <View style={{ alignItems: 'center', height: '10%' }} >
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Bilibili视频转码工具</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        let temp = []
                        readAllFiles(biliPath, temp)
                        setFileList(temp)
                        readFileInfo()
                    }}>
                        <FontAwesome name='refresh' size={50} />
                    </TouchableOpacity>
                    <Text>加载视频</Text>
                </View>
            </View>
            <View style={{ height: '88%' }}>
                <FlatList
                    initialNumToRender={data.length}//修复不显示剩余数据问题
                    data={data}
                    renderItem={(row) => {
                        const videoPath = row.item.videoPath
                        const audioPath = row.item.audioPath
                        const videoInfo = JSON.parse(row.item.videoInfo)
                        const title = videoInfo['title']
                        const cover = videoInfo['cover']
                        const quality = videoInfo['quality_pithy_description']
                        const bvid = videoInfo['bvid']
                        const avid = videoInfo['avid']
                        const author = videoInfo['owner_name']
                        const avatar = videoInfo['owner_avatar']
                        const size = (videoInfo['total_bytes'] / 1024 / 1024).toFixed(2)
                        const time = (videoInfo['total_time_milli'] / 1000 / 60).toFixed(2)

                        let warningColor = localFile.includes(bvid) ? 'green' : 'red'

                        return (
                            <View style={{ flex: 8, flexDirection: 'row', margin: 5, }}>
                                <View style={{ flex: 7, flexDirection: 'row', borderRadius: 10, }}>
                                    <View style={{ flex: 2, margin: 5 }} >
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                                            <Image source={{ uri: avatar }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                                            <Text style={{ fontSize: 20, fontWeight: 'bold' }} >{author}</Text>
                                        </View>
                                        <Text>{title}</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text>{bvid}</Text>
                                            <Text>{quality}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text>{size}Mb</Text>
                                            <Text>{time}min</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 2 }} >
                                        <Image source={{ uri: cover }} style={{ borderRadius: 10, width: '100%', height: '100%', }} />
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => {
                                        ToastAndroid.show(warningColor == 'green' ? '已合并转码至本地' : '未处理至本地', ToastAndroid.SHORT)
                                    }}>
                                        <FontAwesome name='warning' size={20} color={warningColor} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        mergeVideoAudio(videoPath, audioPath, bvid, row.item.videoInfo)
                                        ToastAndroid.show('开始合并转码', ToastAndroid.SHORT)
                                    }}>
                                        <FontAwesome name='download' size={20} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            ToastAndroid.show('长按将删除', ToastAndroid.SHORT)
                                        }}
                                        onLongPress={() => {
                                            RNFS.unlink(biliPath + '/' + avid)
                                            ToastAndroid.show('已删除', ToastAndroid.SHORT)
                                        }}>
                                        <FontAwesome name='trash' size={20} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => item.path}
                    numColumns={1}
                />
            </View>
        </>
    )
}

export default MyFindOtherAppData