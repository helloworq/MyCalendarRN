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

const Rooter = () => {
    const Stack = createNativeStackNavigator()

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
            bgColor: 'rgba(30,60,60,1)',
            totalOpacityBgColor: 'rgba(0,0,0,1)'
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
            bgColor: 'rgba(255,255,255,1)',
            totalOpacityBgColor: 'rgba(255,255,255,0)'
        },
    }

    const lightWithImageMode = {
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
            bgColor: 'rgba(255,255,255,0.3)',
            totalOpacityBgColor: 'rgba(255,255,255,0)'
        },
    }

    const modeMap = {
        'light': lightMode,
        'dark': darkMode,
        'light-with-image': lightWithImageMode,//带背景图
    }

    let type = storage.getString('theme')
    let bgImg = storage.getString('bgImg')
    //黑暗模式，则不管bgImg是否有，统一设置为纯黑背景
    //日间模式，则判断具体
    const [mode, setMode] = useState(type)
    let theme = modeMap[mode]

    return (
        <PreferencesContext.Provider value={{ mode, setMode, theme, bgImg }}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="MyLogin" component={MyLogin} options={{ headerShown: false }} />
                    <Stack.Screen name="MyRegister" component={MyRegister} options={{ headerShown: false }} />
                    <Stack.Screen name="MyHomePage" component={MyHomePage} options={{ headerShown: false }} />
                    <Stack.Screen name="Calendar" component={Calendar} options={{ headerShown: false }} />
                    <Stack.Screen name="MyMomentUploader" component={MyMomentUploader} options={{ headerShown: false }} />
                    <Stack.Screen name="MyMomentViewer" component={MyMomentViewer} options={{ headerShown: false }} />
                    <Stack.Screen name="MyAddTags" component={MyAddTags} options={{ headerShown: false }} />
                    <Stack.Screen name="BestGameEver" component={BestGameEver} options={{ headerShown: false }} />
                    <Stack.Screen name="MySkin" component={MySkin} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </PreferencesContext.Provider>
    );
}

export default Rooter