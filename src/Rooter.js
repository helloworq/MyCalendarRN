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

const Rooter = () => {
    const Stack = createNativeStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen name="MyProgressBar" component={MyProgressBar} options={{ title: "主页" }} /> */}
                <Stack.Screen name="LayoutScrollHome" component={LayoutScrollHome} options={{ headerShown: false }} />
                <Stack.Screen name="Calendar" component={Calendar} options={{ headerShown: false }} />
                <Stack.Screen name="MyDynamicListView" component={MyDynamicListView} options={{ headerShown: false }} />
                <Stack.Screen name="MyMomentUploader" component={MyMomentUploader} options={{ headerShown: false }} />
                <Stack.Screen name="MyMomentViewer" component={MyMomentViewer} options={{ headerShown: false }} />
                <Stack.Screen name="MyAddTags" component={MyAddTags} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Rooter