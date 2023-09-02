import React, { useState, useContext } from 'react';
import {
    View,
    Button,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    FlatList,
} from "react-native";
import ImgStroage from "./storage/ImgStroage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Video from 'react-native-video';
import { PreferencesContext } from "./MyPreferencesContext";
import VideoPlayer from 'react-native-media-console';
import Orientation from 'react-native-orientation-locker';
import RNFS from 'react-native-fs'
import { FFmpegKit } from 'ffmpeg-kit-react-native';
import { ProgressBar, MD3Colors } from 'react-native-paper';


const MyVideo = () => {
    const portraitHeight = 300
    const fullScreenHeight = '100%'
    const [isFullscreen, setIsFullScreen] = useState(false)
    const videopath = '/千万别模仿.flv'
    const [progress, setProgress] = useState(0)


    return (
        <>
            <Button title='视频转换' onPress={() => {
                const path = RNFS.ExternalDirectoryPath
                console.log(path)

                FFmpegKit.execute(` -i ${path + videopath} -y -vcodec copy -acodec copy ${path + '/output.mp4'}`)
            }} />
            <View style={{ flex: 1, }}>
                <VideoPlayer
                    source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                    //isFullscreen={true}
                    //toggleResizeModeOnFullscreen={true}  //画面是否伸缩
                    navigator={() => { }}
                    onBack={() => { }}
                    pan={{ horizontal: false, inverted: true }}
                    onPlay={() => console.log('播放')}
                    onPause={() => {
                        const initial = Orientation.getInitialOrientation();
                    }}
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
                        //position: 'absolute',
                        //left: 0,
                        //right: 0,
                        //top: 0,
                        //down: 0,
                    }}
                />

                <ProgressBar progress={progress} color={MD3Colors.error50} />
                <Button title='Bilibili视频' onPress={() => {
                    const path = RNFS.ExternalDirectoryPath
                    RNFS.downloadFile({
                        fromUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
                        toFile: path + '/test.mp4',
                        background: true,
                        begin: (res) => {
                            console.log('begin', res);
                            console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
                        },
                        progress: (res) => {
                            let pro = res.bytesWritten / res.contentLength;
                            setProgress(pro)
                        }
                    }).promise.then(e => {
                        console.log('done', e)
                        setProgress(1)
                    }).catch(e => console.log(e))


                }} />
                {/* <Button title='Bilibili视频' onPress={() => {
                    const path = RNFS.ExternalDirectoryPath
                    console.log(path)

                    FFmpegKit.execute(` -i ${path + videopath} -y -vcodec copy -acodec copy ${path + '/output.mp4'}`)
                }} /> */}
            </View>
        </>
    )
}

export default MyVideo