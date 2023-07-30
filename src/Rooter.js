import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Calendar from './Calendar'
import MyDynamicListView from './MyDynamicListView'
import MyMomentUploader from './MyMomentUploader'
import MyImagePicker from './ImagePicker';
import MyMomentViewer from './MyMomentViewer';
import MyProgressBar from './MyProgressBar';
import MyAddTags from './MyAddTags';
import LayoutScrollHome from './utilCodeBlock/layout/LayoutScrollHome';
import { PreferencesContext } from './MyPreferencesContext';
import MyHomePage from './MyHomePage';

const Rooter = () => {
    const Stack = createNativeStackNavigator()

    const darkMode = {
        dark: false,
        colors: {
            //calendar
            calendarArrowColor: 'white',
            calendarMonthTextColor: 'white',
            calendarDayTextColor: 'white',
            calendarDayDisableTextColor: 'gray',
            calendarAgendaDayTextColor: 'white',
            calendarBgColor: 'black',
            calendarDayBgColor: 'rgba(255,255,255,0.1)',
            calendarWeekColor: 'white',

            //timeline
            timelineBgColor: 'rgba(0,0,0,1)',
            timelineCircleColor: 'gray',
            timelineLineColor: '#bebebe',
            timelineTimeBgColor: 'rgba(255,255,255,0.1)',
            timelineTimeTextColor: 'white',
            timelineInfoTextColor: 'white',

            //HomePage
            iconColor: 'gray',
            progressColor: 'rgba(0,0,0,1)',
            fontColor:'white',

            //moment
            bgColor:'rgba(0,0,0,1)',
        },
    };

    const lightMode = {
        dark: false,
        colors: {
            //calendar
            calendarArrowColor: 'black',
            calendarMonthTextColor: 'black',
            calendarDayTextColor: 'black',
            calendarDayDisableTextColor: 'gray',
            calendarAgendaDayTextColor: 'white',
            calendarBgColor: 'rgba(255,255,255,0.5)',
            calendarDayBgColor: 'rgba(255,255,255,0.5)',
            calendarWeekColor: 'black',

            //timeline
            timelineBgColor: 'rgba(255,255,255,0.5)',
            timelineCircleColor: '#bebebe',
            timelineLineColor: '#bebebe',
            timelineTimeBgColor: 'rgba(0,0,255,0.1)',
            timelineTimeTextColor: 'black',
            timelineInfoTextColor: 'black',

            //HomePage
            iconColor: 'black',
            progressColor: 'rgba(255,255,255,0.5)',
            fontColor: 'black',

            //moment
            bgColor:'rgba(255,255,255,0.5)',
        },
    }

    const [mode, setMode] = useState('light')
    let theme = mode === 'light' ? darkMode : lightMode

    return (
        <PreferencesContext.Provider value={{ mode, setMode, theme }}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="MyHomePage" component={MyHomePage} options={{ headerShown: false }} />
                    <Stack.Screen name="Calendar" component={Calendar} options={{ headerShown: false }} />
                    <Stack.Screen name="MyDynamicListView" component={MyDynamicListView} options={{ headerShown: false }} />
                    <Stack.Screen name="MyMomentUploader" component={MyMomentUploader} options={{ headerShown: false }} />
                    <Stack.Screen name="MyMomentViewer" component={MyMomentViewer} options={{ headerShown: false }} />
                    <Stack.Screen name="MyAddTags" component={MyAddTags} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </PreferencesContext.Provider>
    );
}

export default Rooter