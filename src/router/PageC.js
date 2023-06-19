import React, { useState } from 'react';
import { View, Text,Button } from 'react-native';

const PageC = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen PageC</Text>
            <Button
                title="Go to PageB"
                onPress={() => navigation.navigate('PageB')}
            />
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

export default PageC