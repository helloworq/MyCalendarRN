//创建tag标签界面
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, Dimensions } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const MyAddTags = () => {

    return (
        <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
            <View style={{ flexGrow: 10, }} >
                <TextInput style={{ borderBottomColor: '#bebebe', borderBottomWidth: 1 }} />
            </View>
            <View style={{ flexGrow: 1, alignItems: 'flex-end' }} >
                <MaterialIcons name='add-circle-outline' size={45} />
            </View>
        </View>

    )

}

export default MyAddTags