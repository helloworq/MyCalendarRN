import React from 'react';
import {
    View,
} from 'react-native';
import First from './reanimated/First';
import Second from './reanimated/Second';
import Touch from './reanimated/Touch';
import Move from './reanimated/Move';
import ScaleCompoment from './reanimated/ScaleCompoment';
import MyPullDownCompoment from '../../compoment/MyPullDownCompoment';
import MyPullDownNative from '../../compoment/MyPullDownNative';

const MyAnimation = () => {

    return (
        <>
            <View style={{ flex: 1, }}>
                <ScaleCompoment /> 
            </View>
        </>
    );
}

export default MyAnimation