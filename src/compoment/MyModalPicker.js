import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    View,
    FlatList,
    TouchableOpacity,
    Modal,
    Text,
} from 'react-native'

const MyModalPicker = ({
    data,
    fontBgColor,
    fontColor,
    callback,//选择完tag后的回调
}) => {
    const [visible, setVisible] = useState(false)
    const [value, selectValue] = useState("选择tag")

    return (
        <>
            <TouchableOpacity onPress={() => {
                setVisible(true)
            }}>
                <View style={{ flexDirection: 'row', width: 70, marginTop: 10 }}>
                    <MaterialCommunityIcons
                        name={"chevron-down"}
                        size={40}
                    />

                    <Text style={{ fontSize: 15 }} >{value}</Text>
                </View>

            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    setVisible(false)
                }}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={{
                        alignItems: 'center',
                        width: 200,
                        height: 300,
                        borderRadius: 20,
                        backgroundColor: fontBgColor
                    }}>
                        <FlatList
                            data={data}
                            renderItem={(r) => {
                                return (
                                    <View style={{
                                        borderRadius: 20,
                                        backgroundColor: fontBgColor,
                                        width: 180,
                                        padding: 10,
                                        margin: 10
                                    }}>
                                        <TouchableOpacity onPress={() => {
                                            selectValue(r.item)
                                            setVisible(false)
                                            callback(r.item)
                                        }}>
                                            <Text style={{ color: fontColor, fontSize: 20, textAlign: 'center' }}>{r.item}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}

                            numColumns={1}
                            horizontal={false}
                        />
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default MyModalPicker