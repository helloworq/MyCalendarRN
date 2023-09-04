import React, { useContext, useState, useEffect } from "react";
import {
    Dimensions,
    View,
    TouchableOpacity,
    Text,
    ImageBackground,
    FlatList,
    StyleSheet,
    RefreshControl,
    ScrollView
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { PreferencesContext } from "./MyPreferencesContext";
import { useIsFocused } from "@react-navigation/native";

const MyFriends = () => {
    const { mode, setMode, theme, bgImg, setBgImg } = useContext(PreferencesContext)
    const screenHeight = Dimensions.get("window").height - 20
    const screenWidth = Dimensions.get("window").width
    const split = 10;
    const borderRadius = 20
    const fullBlockLength = screenWidth - 2 * split
    const isFocused = useIsFocused();
    const [refresh, setRefresh] = useState(true)
    const [refresing, setRefresing] = useState(false)

    useEffect(() => { setRefresh(!refresh) }, [isFocused]);

    function renderRow(rowData) {
        const data = rowData.item
        return (
            <>
                <TouchableOpacity
                    onPress={() => {
                    }}
                    activeOpacity={0.8}>
                    <View>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                <Text style={{ color: 'black', fontSize: 18 }}>{data?.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <TouchableOpacity onPress={() => { }}>
                                    <MaterialCommunityIcons color={theme.colors.iconColor} name={"chat"} size={20} style={{ marginRight: 5 }} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => navigation.navigate('BestGameEver')}>
                                    <FontAwesome name={"gamepad"} size={18} color={theme.colors.fontColor} style={{ marginRight: 5 }} />
                                </TouchableOpacity>

                                <FontAwesome name={"circle"} size={18} color={data.status} />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        )
    }

    const list = [
        {
            name: "张祥",
            status: "red"
        },
        {
            name: "骆驼祥子",
            status: "green"
        },
    ]

    return (
        <>
            <View style={{ width: fullBlockLength, }}>
                <View style={{
                    width: fullBlockLength,
                    borderRadius: borderRadius,
                    height: 250,
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    marginLeft: split,
                    marginRight: split,
                    marginBottom: split,
                    backgroundColor: theme.colors.bgColor,
                }}>
                    <View style={{ padding: 20, flex: 1, }}>

                        <View style={{ flexDirection: 'row', marginBottom: 10, borderBottomColor: 'gray', borderBottomWidth: 0.5 }}>
                            <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                <Text style={{ color: 'black', fontSize: 18 }}>昵称</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <TouchableOpacity onPress={() => { }}>
                                    <MaterialCommunityIcons color={theme.colors.iconColor} name={"chat"} size={20} style={{ marginRight: 5 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    var ws = new WebSocket('ws://10.0.2.2:8088/websocket');
                                    ws.onopen = () => {
                                        ws.send("{\"something\":\"22\"}"); // send a message
                                    };
                                    ws.onmessage = (e) => {
                                        console.log(e.data);
                                    };
                                    ws.onerror = (e) => {
                                        // an error occurred
                                        console.log(e.message);
                                    };
                                    ws.onclose = (e) => {
                                        // connection closed
                                        console.log(e.code, e.reason);
                                    };
                                }}>
                                    <FontAwesome name={"refresh"} size={20} color={'black'} />
                                </TouchableOpacity>

                            </View>
                        </View>


                        <FlatList
                            renderItem={renderRow}
                            keyExtractor={(item, index) => {
                                return item.path + index
                            }}
                            data={list}
                            horizontal={false}
                            refreshControl={
                                <RefreshControl refreshing={refresing} onRefresh={() => { setRefresing(!refresing) }} />
                            }
                        />
                    </View>
                </View>
            </View>
        </>
    )
}

export default MyFriends