import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    FlatList,
} from "react-native";

const MyTab = () => {
    const [rightComp, setRightComp] = useState()
    const data = [
        {
            "name": "1测试测试测试测试测试测试试测试测试测试",
        },
        {
            "name": "2测试测试测试测试测试测试测试测试测试测试测试测试测试",
        },
        {
            "name": "3测试测试测试测试试测试测试测试测试测试测试测试",
        },
        {
            "name": "4测试测试测试测试测测试测试测试测试测试测试测试测试",
        },
        {
            "name": "5测试测试测试测试测试测试测试测试测试测试测试测试",
        },
        {
            "name": "6测试测试测试测试测试测测试测试测试测试测试测试",
        },
        {
            "name": "7测试测试测试测试测试测试试测试测试测试测试测试测试",
        },
        {
            "name": "8测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
        },
    ]

    return (
        <>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>
                    <Button title="视频" />
                    <Button title="音乐" />
                </View>
                <View style={{ flex: 19, flexDirection: 'row' }}>
                    <View style={{
                        backgroundColor: 'yellow',
                        width: '20%',
                        marginLeft: 10,
                        marginBottom: 10,
                        borderRadius: 10
                    }} >

                        <FlatList
                            renderItem={(row) => {
                                const e = <Text>{row.item.name}</Text>
                                let element = <>
                                    <View style={{ marginBottom: 10 }}>
                                        <Button onPress={() => setRightComp(e)} title={row.item.name} style={{ borderRadius: 10 }} />
                                    </View>
                                </>
                                return element
                            }}
                            keyExtractor={(item, index) => {
                                return item.path + index
                            }}

                            data={data}
                            horizontal={false}
                            numColumns={1}
                        />
                    </View>

                    <View style={{
                        backgroundColor: 'green',
                        width: '73%',
                        marginLeft: 10,
                        marginBottom: 10,
                        borderRadius: 10
                    }} >
                        {rightComp}
                    </View>
                </View>
            </View >
        </>
    );
};




export default MyTab
