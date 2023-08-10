import React, { PureComponent, useRef } from "react";
import { View, } from "react-native";

const Bullet = ({ position }) => {
    const positionObj = position
    const bulletIndexs = Object.keys(positionObj ?? [])

    const bullets = bulletIndexs.map(e => {
        const element = positionObj[e]
        const x = element['x']
        const y = element['y']
        return <View style={{
            width: 50,
            height: 50,
            left: x,
            top: y,
            position: 'absolute',
            backgroundColor: 'black',
            position: 'absolute'
        }}></View>
    })

    return (
        <>
            <View>
                {bullets}
            </View>
        </>
    )
}

export default Bullet