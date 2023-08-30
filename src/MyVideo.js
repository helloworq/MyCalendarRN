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
// At the top where our imports are...
import VideoPlayer from 'react-native-media-console';
//import VideoPlayer from "react-native-video-controls"
import Orientation from 'react-native-orientation-locker';

const MyVideo = () => {
    const portraitHeight = 300
    const fullScreenHeight = '100%'
    const [isFullscreen, setIsFullScreen] = useState(false)

    return (
        <>
            <View style={{ flex: 1, }}>
                <Button title='11' />
                <VideoPlayer
                    source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                    //isFullscreen={true}
                    //toggleResizeModeOnFullscreen={true}  //画面是否伸缩
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
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        down: 0,
                    }}
                />
            </View>
        </>
    )
}

export default MyVideo