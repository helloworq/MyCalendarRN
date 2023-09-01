import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Button,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    FlatList,
} from "react-native";
import DocumentPicker from 'react-native-document-picker'
import RNFS from 'react-native-fs'
import { Text } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { FFmpegKit } from 'ffmpeg-kit-react-native';
import { ProgressBar, MD3Colors } from 'react-native-paper';

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

const MyFindOtherAppData = () => {
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
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Button title='是否存在文件' onPress={() => {
                    RNFS.exists(bilibiliPath).then(e => {
                        setExist(e ? true : false)
                    })
                }} />
                {
                    exist ? <FontAwesome name='check' size={30} color={'green'} /> : <FontAwesome name='remove' size={30} color={'red'} />
                }
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Button title='查看全部文件' onPress={() => readFileInfo()} />
            </View>
            <View>
                <FlatList
                    data={data}
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

                        return (
                            <TouchableOpacity onPress={() => mergeVideoAudio(row.item.videoPath, row.item.audioPath)}>
                                <View>
                                    <View style={{ backgroundColor: 'green', margin: 10, borderRadius: 10, }}>
                                        <Text>{title}</Text>
                                        <Text>{author}</Text>
                                        <Text>{quality}</Text>
                                        <Text>{bvid}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item, index) => {
                        return item.path + index
                    }}
                    numColumns={1}
                />
            </View>
        </>
    )
}

export default MyFindOtherAppData