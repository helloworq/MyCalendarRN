import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Calendar from './Calendar'
import MyMomentUploader from './MyMomentUploader'
import MyMomentViewer from './MyMomentViewer';
import MyAddTags from './MyAddTags';
import { PreferencesContext } from './MyPreferencesContext';
import MyHomePage from './MyHomePage';
import storage from './storage/MhkvStroge';
import BestGameEver from './MyGame/MyGame';
import MyLogin from './login/MyLogin';
import MyRegister from './login/MyRegister';
import MySkin from './MySkin';
import MyProfile from './MyProfile';
//import MyLocation from './MyLocation';
import MyMoment from './MyMoment';
import MyMomentDetail from './MyMomentDetail';
import MyVideo from './MyVideo';
import MyTab from './MyTab';
import MyFindOtherAppData from './MyFindOtherAppData';
import MyChart from './MyChart';
import MyFriends from './MyFriends';
import MyDevice from './MyDevice';
import MyDone from './MyDone';
import MyBing from './MyBing';
import MyProfileDetail from './MyProfileDetail';

const Rooter = () => {
    const Stack = createNativeStackNavigator()
    const animation = 'slide_from_right'
    const animationDuration = 100

    //状态-白天模式和黑暗模式
    //
    const darkMode = {
        dark: false,
        colors: {
            //timeline
            timelineBgColor: 'rgba(0,0,0,1)',
            timelineCircleColor: 'gray',
            timelineLineColor: '#bebebe',
            timelineTimeBgColor: 'rgba(255,255,255,0.1)',

            //HomePage
            iconColor: 'gray',
            progressColor: 'rgba(0,0,0,1)',
            fontColor: 'white',

            //moment
            //bgColor: 'rgba(51,51,76,1)',
            bgColor: 'rgba(0,0,0,1)',
            totalOpacityBgColor: 'rgba(51,51,76,1)',
        },
    };

    const lightMode = {
        dark: false,
        colors: {
            //timeline
            timelineBgColor: 'rgba(255,255,255,0.3)',
            timelineCircleColor: '#bebebe',
            timelineLineColor: '#bebebe',
            timelineTimeBgColor: 'rgba(0,0,255,0.1)',

            //HomePage
            iconColor: 'black',
            progressColor: 'rgba(255,255,255,0.3)',
            fontColor: 'black',

            //moment
            //bgColor: 'rgba(163,163,194,0.3)',
            bgColor: 'rgba(255,255,255,0.5)',
            totalOpacityBgColor: 'rgba(163,163,194,0.3)',
        },
    }

    const modeMap = {
        'light': lightMode,
        'dark': darkMode,
    }

    let type = storage.getString('theme')

    type = type === 'dark' ? 'dark' : 'light'
    //黑暗模式，则不管bgImg是否有，统一设置为纯黑背景
    //日间模式，则判断具体
    const [mode, setMode] = useState(type)
    const [bgImg, setBgImg] = useState(storage.getString('bgImg'))
    let theme = modeMap[mode]

    return (
        <PreferencesContext.Provider value={{ mode, setMode, theme, bgImg, setBgImg }}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="MyLogin" component={MyLogin} options={{ headerShown: false, animation: animation, animationDuration: animationDuration }} />
                    <Stack.Screen name="MyRegister" component={MyRegister} options={{ headerShown: false, animation: animation, animationDuration: animationDuration }} />
                    <Stack.Screen name="MyHomePage" component={MyHomePage} options={{ headerShown: false, animation: animation, animationDuration: animationDuration }} />
                    <Stack.Screen name="Calendar" component={Calendar} options={{ headerShown: false, animation: animation, animationDuration: animationDuration }} />
                    <Stack.Screen name="MyMomentUploader" component={MyMomentUploader} options={{ headerShown: false, animation: animation, animationDuration: animationDuration }} />
                    <Stack.Screen name="MyMomentViewer" component={MyMomentViewer} options={{ headerShown: false, animation: animation, animationDuration: animationDuration }} />
                    <Stack.Screen name="MyAddTags" component={MyAddTags} options={{ headerShown: false, animation: animation, animationDuration: animationDuration }} />
                    <Stack.Screen name="BestGameEver" component={BestGameEver} options={{ headerShown: false, animation: animation, animationDuration: animationDuration }} />
                    <Stack.Screen name="MySkin" component={MySkin} options={{ headerShown: false, animation: animation, animationDuration: animationDuration }} />
                    <Stack.Screen name='MyProfile' component={MyProfile} options={{ headerShown: false, animation: animation, animationDuration: animationDuration }} />
                    <Stack.Screen name='MyMoment' component={MyMoment} options={{ headerShown: false, animation: animation, animationDuration: animationDuration }} />
                    <Stack.Screen name='MyMomentDetail' component={MyMomentDetail} options={{ headerShown: false, animation: animation, animationDuration: animationDuration }} />
                    <Stack.Screen name='MyTab' component={MyTab} options={{ headerShown: false, animation: animation, animationDuration: animationDuration }} />
                    <Stack.Screen name='MyFindOtherAppData' component={MyFindOtherAppData} options={{ headerShown: false, animation: animation, animationDuration: animationDuration }} />
                    <Stack.Screen name='MyChart' component={MyChart} options={{ headerShown: false, animation: animation, animationDuration: animationDuration }} />
                    <Stack.Screen name='MyFriends' component={MyFriends} options={{ headerShown: false, animation: animation, animationDuration: animationDuration }} />
                    <Stack.Screen name='MyDevice' component={MyDevice} options={{ headerShown: false, animation: animation, animationDuration: animationDuration }} />
                    <Stack.Screen name='MyDone' component={MyDone} options={{ headerShown: false, animation: animation, animationDuration: animationDuration }} />
                    <Stack.Screen name='MyBing' component={MyBing} options={{ headerShown: false, animation: animation, animationDuration: animationDuration }} />
                    <Stack.Screen name='MyProfileDetail' component={MyProfileDetail} options={{ headerShown: false, animation: animation, animationDuration: animationDuration }} />
                </Stack.Navigator>
            </NavigationContainer>
        </PreferencesContext.Provider>
    );
}

export default Rooter