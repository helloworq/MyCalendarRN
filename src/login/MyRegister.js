import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Button,
    ImageBackground,
    Image,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
    Text,
    TextInput,
} from "react-native";
import ImgStroage from "../storage/ImgStroage";
import storage from '../storage/MhkvStroge';
import { PreferencesContext } from "../MyPreferencesContext";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import RequestContant from '../constant/RequestContant';

const MyRegister = ({ navigation }) => {
    const bgImg = storage.getString('bgImg') ? 'a' : 'a'
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { mode, setMode, theme } = useContext(PreferencesContext)

    async function register() {
        if (username === '' || username === null || username === undefined
            || password === '' || password === null || password === undefined) {
            ToastAndroid.show('请输入用户名或者密码', ToastAndroid.SHORT);
            return
        }

        await fetch(RequestContant.SERVER_ADDRESS + '/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then((r) => r.json())
            .then((r) => {
                const responseStatus = r['status']
                const responseMsg = r['message']
                const responseData = r['data']

                if (responseStatus === RequestContant.RQEUEST_OK) {
                    navigation.navigate('MyLogin')
                    storage.set('token', responseData)
                    ToastAndroid.show(responseMsg, ToastAndroid.SHORT);
                } else if (responseStatus === RequestContant.RQEUEST_FAIL) {
                    ToastAndroid.show(responseMsg, ToastAndroid.SHORT);
                }
            })
            .catch((e) => console.log("e=>", e))
    }

    return (
        <>
            <ImageBackground
                source={ImgStroage[bgImg]}
                resizeMode='stretch'
                style={{ flex: 1, padding: 10 }}
            >
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <View>
                        <Text style={{ color: theme.colors.fontColor, fontSize: 30, marginBottom: 10 }}>注册</Text>
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
                        <TouchableOpacity onPress={() => register()}>
                            <MaterialCommunityIcons name={"login"} color={theme.colors.bgColor} size={50} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </>
    )
}

export default MyRegister