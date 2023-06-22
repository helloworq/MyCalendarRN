import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Calendar from './Calendar'
import MyDynamicListView from './MyDynamicListView'
import MyMomentUploader from './MyMomentUploader'
import MyImagePicker from './ImagePicker';
import MyMomentViewer from './MyMomentViewer';

const Rooter = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="MyImagePicker" component={MyImagePicker} options={{ title: "Dashboard" }} />
                <Stack.Screen name="Calendar" component={Calendar} options={{ title: "Calendar" }} />
                <Stack.Screen name="MyDynamicListView" component={MyDynamicListView} options={{ title: "动态列表" }} />
                <Stack.Screen name="MyMomentUploader" component={MyMomentUploader} options={{ title: "UP" }} />
                <Stack.Screen name="MyMomentViewer" component={MyMomentViewer} options={{ title: "轨迹" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Rooter