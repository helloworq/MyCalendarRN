import React, { useEffect, useState } from 'react'
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
    style,
}) => {
    const [visible, setVisible] = useState(false)
    const [value, selectValue] = useState("标签")

    return (
        <>
            <TouchableOpacity onPress={() => {
                setVisible(true)
            }}>
                <View style={[{
                    flexDirection: 'row',
                    width: 80,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, style]}>
                    <View>
                        <Text style={{ fontSize: 15, color: fontColor }} >{value}</Text>
                    </View>
                    <View>
                        <MaterialCommunityIcons name={"chevron-down"} size={25} />
                    </View>
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
                                            setVisible(false)
                                            callback(r.item)
                                            selectValue(r.item)
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