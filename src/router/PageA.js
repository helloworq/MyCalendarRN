import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const PageA = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title='Go to Details'
                onPress={() => navigation.navigate('PageB', {
                    "itemId": 86,
                    "otherParam": 'some data from pageA'
                })} />
        </View>
    );
}

export default PageA