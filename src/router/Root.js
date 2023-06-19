import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PageA from './PageA'
import PageB from './PageB'
import PageC from './PageC'

const Root = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={PageA} />
            <Stack.Screen name="PageB" component={PageB} />
            <Stack.Screen name="PageC" component={PageC} />
        </Stack.Navigator>
    </NavigationContainer>
    );
}

export default Root