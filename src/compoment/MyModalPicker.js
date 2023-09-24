import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
} from 'react-native'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

const MyModalPicker = ({
    data,
    fontBgColor,
    fontColor,
    callback,//选择完tag后的回调
    style,
}) => {
    const [visible, setVisible] = useState(false)
    const [value, selectValue] = useState("选择标签")

    function renderItem(item) {
        console.log('aaaa',item)
        return (
            <TouchableOpacity onPress={() => {
                setVisible(!visible)
                callback(item.item['NAME'])
                selectValue(item.item['NAME'])
            }}>
                <View style={{ padding: 10 }}>
                    <Text>{item.item['NAME']}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <>
            <Menu
                visible={visible}
                style={{ backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 20, height: 300 }}
                anchor={<Text onPress={() => setVisible(!visible)}>{value}</Text>}
                onRequestClose={() => setVisible(!visible)}
            >
                <FlatList
                    renderItem={renderItem}
                    data={data}
                    keyExtractor={(item, index) => item.path + index}
                    numColumns={1}
                    horizontal={false}
                />
            </Menu >
        </>
    )
}

export default MyModalPicker