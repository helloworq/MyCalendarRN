import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
} from 'react-native'
import Modal from "react-native-modal";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

const MyModalPicker = ({
    data,
    fontBgColor,
    fontColor,
    callback,//选择完tag后的回调
    style,
}) => {
    const [visible, setVisible] = useState(false)
    const [value, selectValue] = useState("标签")

    function renderItem() {
        return data?.map(e =>
            <MenuItem
                textStyle={{ textAlign: 'center' }}
                onPress={() => {
                    setVisible(!visible)
                    callback(e)
                }}>
                {e}
            </MenuItem>
        )
    }

    return (
        <>
            <Menu
                visible={visible}
                style={{ backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 20 }}
                anchor={<Text onPress={() => setVisible(!visible)}>选择标签</Text>}
                onRequestClose={() => setVisible(!visible)}
            >
                {renderItem()}
            </Menu>
        </>
    )
}

export default MyModalPicker