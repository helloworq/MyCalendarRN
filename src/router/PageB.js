import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const PageB = ({ route, navigation }) => {
    const { itemId, otherParam } = route.params;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen PageB</Text>
            <Text>itemId: {JSON.stringify(itemId)}</Text>
            <Text>otherParam: {JSON.stringify(otherParam)}</Text>
            <Button
                title="Go to PageC"
                onPress={() => navigation.navigate('PageC')}
            />
        </View>
    );
}

export default PageB