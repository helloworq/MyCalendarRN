import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Calendar from './Calendar'
import MyDynamicListView from './MyDynamicListView'
import MyMoment from './MyMoment'

const Rooter = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Calendar" component={Calendar} />
            <Stack.Screen name="MyDynamicListView" component={MyDynamicListView} />
            <Stack.Screen name="MyMoment" component={MyMoment} />
        </Stack.Navigator>
    </NavigationContainer>
    );
}

export default Rooter