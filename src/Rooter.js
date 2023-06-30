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

const Rooter = () => {
    const Stack = createNativeStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="MyProgressBar" component={MyProgressBar} options={{ title: "主页" }} />
                <Stack.Screen name="Calendar" component={Calendar} options={{ title: "日历" }} />
                <Stack.Screen name="MyDynamicListView" component={MyDynamicListView} options={{ title: "动态列表" }} />
                <Stack.Screen name="MyMomentUploader" component={MyMomentUploader} options={{ title: "上传动态" }} />
                <Stack.Screen name="MyMomentViewer" component={MyMomentViewer} options={{ title: "轨迹" }} />
                <Stack.Screen name="MyAddTags" component={MyAddTags} options={{ title: "标签" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Rooter