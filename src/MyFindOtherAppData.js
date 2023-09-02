import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Button,
    Image,
    ImageBackground,
    TouchableOpacity,
    PermissionsAndroid,
    Dimensions,
    ToastAndroid,
    FlatList,
    TextInput,
} from "react-native";
import DocumentPicker from 'react-native-document-picker'
import RNFS from 'react-native-fs'
import { Text } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { FFmpegKit } from 'ffmpeg-kit-react-native';
import { ProgressBar, MD3Colors } from 'react-native-paper';

const biliPath = RNFS.ExternalDirectoryPath + '/Download'
const localSavePath = RNFS.ExternalDirectoryPath + '/bilibili/'

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

    useEffect(() => {
        readAllFiles(biliPath, fileList)
        RNFS.readdir(localSavePath).then(e => setLocalFile(e))
    }, [])

    async function readFileInfo() {
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
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => readFileInfo()}>
                    <FontAwesome name='refresh' size={50} />
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                    data={data}
                    renderItem={(row) => {
                        const videoPath = row.item.videoPath
                        const audioPath = row.item.audioPath
                        const videoInfo = JSON.parse(row.item.videoInfo)
                        const title = videoInfo['title']
                        const cover = videoInfo['cover']
                        const quality = videoInfo['quality_pithy_description']
                        const bvid = videoInfo['bvid']
                        const author = videoInfo['owner_name']
                        const avatar = videoInfo['owner_avatar']

                        let warningColor = localFile.includes(bvid) ? 'green' : 'red'

                        return (
                            <View style={{ flex: 5, flexDirection: 'row', margin: 10, alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <View style={{ flex: 4, flexDirection: 'row', borderRadius: 10, }}>
                                    <View style={{ flex: 2, margin: 5 }} >
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                                            <Image source={{ uri: avatar }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                                            <Text style={{ fontSize: 20, fontWeight: 'bold' }} >{author}</Text>
                                        </View>

                                        <Text>{title}</Text>
                                        <Text>{quality}</Text>
                                        <Text>{bvid}</Text>
                                    </View>
                                    <View style={{ flex: 2 }} >
                                        <Image source={{ uri: cover }} style={{ borderRadius: 10, width: '100%', height: '100%', }} />
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                                    <TouchableOpacity>
                                        <FontAwesome name='warning' size={45} color={warningColor} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        mergeVideoAudio(videoPath, audioPath, bvid, row.item.videoInfo)
                                    }}>
                                        <FontAwesome name='download' size={45} />
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