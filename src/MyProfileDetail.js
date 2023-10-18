import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
    View,
    Button,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity,
    ToastAndroid,
    Text,
    TextInput,
    ScrollView,
} from "react-native";
import { PreferencesContext } from "./MyPreferencesContext";
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ImgStroage from "./storage/ImgStroage";
import storage from './storage/MhkvStroge';
import { selectAllUser, selectCurUserInfo, updateUserAvatar, updateUserInfo } from './storage/repository/UserDao';
import ImageCropPicker from 'react-native-image-crop-picker';
import { execInitSql } from './storage/repository/BaseDao';

const MyProfileDetail = () => {
    const { mode, setMode, theme, bgImg, setBgImg } = useContext(PreferencesContext)
    const [editable, setEditable] = useState(false)
    const form = {
        "用户名": ["NAME", "周显昱"],
        "一句话介绍": ["SIGN", "危楼高百尺，手可摘星辰"],
        "R龄": ["AGE", 22],
        "性别": ["MALE", "男"],
        "住址": ["ADDRESS", "长安"]
    }
    const [user, setUser] = useState({})

    const Divider = () => {
        return (
            <>
                <View style={{ height: 0.5, backgroundColor: 'gray' }} />
            </>
        )
    }

    useEffect(() => {
        selectCurUserInfo((e) => setUser(e))
    }, [])

    return (
        <>
            <ImageBackground
                source={ImgStroage[bgImg]}
                resizeMode='stretch'
                style={{
                    flex: 1,
                    flexDirection: 'column',
                }}
            >
                <ScrollView>
                    <View style={{ margin: 10, padding: 20, backgroundColor: theme.colors.bgColor, borderRadius: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>基本资料</Text>
                            <TouchableOpacity onPress={() => {
                                setEditable(!editable)
                                if (editable) {
                                    updateUserInfo(user)
                                } else {
                                    selectCurUserInfo((e) => setUser(e))
                                }
                            }}>
                                <FontAwesome name={editable ? 'save' : 'edit'} size={30} color={'black'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', margin: 10 }}>
                            <Image resizeMode='stretch' source={{ uri: user['AVATAR'] }} style={{ width: 100, height: 100, borderRadius: 100 }} />
                            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => {
                                    ImageCropPicker.openPicker({
                                        multiple: false
                                    }).then(images => {
                                        console.log(images.path)
                                        updateUserAvatar(images.path)
                                       
                                    }).catch(e => ToastAndroid.show('未获取权限', ToastAndroid.SHORT))
                                }}>
                                    <FontAwesome name='camera' size={40} color={'rgba(255,255,255,0.7)'} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {
                            Object.keys(form).map(key =>
                                <>
                                    <View style={{ flexDirection: 'row', margin: 10 }}>
                                        <View style={{ width: '35%', justifyContent: 'center' }}>
                                            <Text style={{ color: 'gray', fontSize: 20 }}>{key}</Text>
                                        </View>
                                        <View>
                                            <TextInput
                                                placeholder="新增tag  (长按tag可删除)"
                                                editable={editable}
                                                color={'black'}
                                                fontSize={18}
                                                onChangeText={text => {
                                                    let userNew = JSON.parse(JSON.stringify(user))
                                                    userNew[form[key][0]] = text
                                                    setUser(userNew)
                                                }}
                                                value={user[form[key][0]] + ''}
                                            />
                                        </View>
                                    </View>
                                    <Divider />
                                </>
                            )
                        }
                    </View>
                </ScrollView>
            </ImageBackground>
        </>
    )
}

export default MyProfileDetail

