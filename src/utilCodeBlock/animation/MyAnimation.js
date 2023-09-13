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

const MyAnimation = () => {

    return (
        <>
            <View style={{ flex: 1, }}>
                <ScaleCompoment pullDownFunc={() => console.log(66666666)}  />
            </View>
        </>
    );
}

export default MyAnimation