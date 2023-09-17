import React, { useState, useEffect, useContext } from 'react';
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
import { selectAllUser, selectCurUserInfo } from './storage/repository/UserDao';

const MyProfileDetail = () => {
    const { mode, setMode, theme, bgImg, setBgImg } = useContext(PreferencesContext)
    const [editable, setEditable] = useState(false)
    const form = {
        "用户名": "周显昱",
        "一句话介绍": "危楼高百尺，手可摘星辰",
        "R龄": 22,
        "性别": "男",
    }

    const InfoBlock = ({ title, info }) => {
        return (
            <>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <View style={{ width: '35%', justifyContent: 'center' }}>
                        <Text style={{ color: 'gray', fontSize: 20 }}>{title}</Text>
                    </View>
                    <View>
                        {/* <TextInput style={{ color: 'black', fontSize: 18 }}>{info}</TextInput> */}
                        <TextInput
                            placeholder="新增tag  (长按tag可删除)"
                            editable={editable}
                            maxLength={400}
                            multiline={true}
                            fontSize={18}
                        // onChangeText={text => setText(text)}
                        // value={text}
                        />
                    </View>
                </View>
            </>
        )
    }

    const Divider = () => {
        return (
            <>
                <View style={{ height: 0.5, backgroundColor: 'gray' }} />
            </>
        )
    }

    return (
        <>
            <ImageBackground
                source={ImgStroage[bgImg]}
                resizeMode='stretch'
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: 'green',
                }}
            >
                <ScrollView>
                    <View style={{ margin: 10, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold' }}>基本资料</Text>
                            <TouchableOpacity onPress={() => {
                                setEditable(!editable)
                                
                                
                            }}>
                                <FontAwesome name={editable ? 'save' : 'edit'} size={30} color={'black'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', margin: 10 }}>
                            <Image resizeMode='stretch' source={require('../img/a.jpg')} style={{ width: 100, height: 100, borderRadius: 100 }} />
                            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity>
                                    <FontAwesome name='camera' size={40} color={'rgba(255,255,255,0.7)'} />
                                </TouchableOpacity>
                            </View>
                        </View>
 
                        {
                           Object.keys(form).map(key => 
                                <>
                                    <InfoBlock title={key} info={form[key]} />
                                    <Divider />
                                </>
                            )
                        }
                        {/* <InfoBlock title={'用户名'} info={'周显昱'} />
                        <Divider />
                        <InfoBlock title={'一句话介绍'} info={'危楼高百尺，手可摘星辰'} />
                        <Divider />
                        <InfoBlock title={'R龄'} info={22} />
                        <Divider />
                        <InfoBlock title={'性别'} info={'男'} /> */}
                    </View>
                </ScrollView>
            </ImageBackground>
        </>
    )
}

export default MyProfileDetail

