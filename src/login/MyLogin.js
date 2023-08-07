import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Button,
    ImageBackground,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
} from "react-native";
import ImgStroage from "../storage/ImgStroage";
import storage from '../storage/MhkvStroge';
import { PreferencesContext } from "../MyPreferencesContext";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const MyLogin = () => {
    const bgImg = storage.getString('bgImg') ? 'a' : 'a'
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const { mode, setMode, theme } = useContext(PreferencesContext)

    return (
        <>
            <ImageBackground
                source={ImgStroage[bgImg]}
                resizeMode='stretch'
                style={{ flex: 1, padding: 10 }}
            >
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <View>
                        <Text style={{ color: theme.colors.fontColor, fontSize: 30, marginBottom: 10 }}>登录</Text>
                    </View>
                    <View style={{
                        marginBottom: 10,
                        flexDirection: 'row',
                        borderRadius: 10,
                        backgroundColor: theme.colors.bgColor,
                    }}>
                        <TextInput
                            placeholder="用户名"
                            style={{ flex: 1, }}
                            maxLength={20}
                            onChangeText={text => setUsername(text)}
                            value={username}
                        />
                    </View>
                    <View style={{
                        marginBottom: 10,
                        flexDirection: 'row',
                        borderRadius: 10,
                        backgroundColor: theme.colors.bgColor,
                    }}>
                        <TextInput
                            placeholder="密码"
                            style={{ flex: 1, }}
                            maxLength={20}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={true}
                            value={password}
                        />
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>{}}>
                            <MaterialCommunityIcons name={"login"} color={theme.colors.bgColor} size={50} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </>
    )
}

export default MyLogin