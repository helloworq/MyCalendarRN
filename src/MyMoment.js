import RNLocation from 'react-native-location';
import React, { useState, useEffect, useContext } from 'react';
import dayjs from 'dayjs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {
    View,
    Button,
    ImageBackground,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
} from "react-native";

const MyMoment = ({ navigation }) => {
    const rate = 16 / 9
    const screenWidth = Dimensions.get("window").width
    const imgWidth = (screenWidth - 10 * 3) / 2

    const [data, setData] = useState(
        [
            {
                "img": require("../img/a.jpg"),
                "text": "《古朗月行》",
                //  "小时不识月，呼作白玉盘。"
                //     + "又疑瑶台镜，飞在青云端。"
                //     + "仙人垂两足，桂树何团团。"
                //     + "白兔捣药成，问言与谁餐？"
                //     + "蟾蜍蚀圆影，大明夜已残。"
                //     + "羿昔落九乌，天人清且安。"
                //     + "阴精此沦惑，去去不足观。"
                //     + "忧来其如何？凄怆摧心肝",
                "author": "唐 李白大大撒打算大苏打撒",
                "like": 523411643,
            },
            {
                "img": require("../img/a.jpg"),
                "text": "《登高》",
                "author": "唐 杜甫",
                "like": 10,
            },
            {
                "img": require("../img/b.jpg"),
                "text": "《将进酒》",
                "author": "唐 李白",
                "like": 10,
            },
            {
                "img": require("../img/c.jpg"),
                "text": "《茅屋为秋风所破歌》",
                "author": "唐 杜甫",
                "like": 10,
            },

            {
                "img": require("../img/c.jpg"),
                "text": "《闻乐天授江州司马》",
                "author": "唐 李白",
                "like": 10,
            },
            {
                "img": require("../img/a.jpg"),
                "text": "《登高》",
                "author": "唐 杜甫",
                "like": 10,
            },
            {
                "img": require("../img/b.jpg"),
                "text": "《将进酒》",
                "author": "唐 李白",
                "like": 10,
            },
            {
                "img": require("../img/c.jpg"),
                "text": "《茅屋为秋风所破歌》",
                "author": "唐 杜甫",
                "like": 10,
            },

            {
                "img": require("../img/c.jpg"),
                "text": "《闻乐天授江州司马》",
                "author": "唐 李白",
                "like": 10,
            },
            {
                "img": require("../img/a.jpg"),
                "text": "《登高》",
                "author": "唐 杜甫",
                "like": 10,
            },
        ]
    )

    return (
        <>
            <FlatList
                keyExtractor={(item, index) => {
                    return item.path + index
                }}
                numColumns={2}
                horizontal={false}
                data={data}
                //style={{backgroundColor:'white'}}
                renderItem={(item) => {
                    return <>
                        <View style={{ width: imgWidth, backgroundColor: 'white', marginTop: 10, borderRadius: 20, }}>
                            <TouchableOpacity onPress={() => navigation.navigate('MyMomentDetail')}>
                                <Image source={item.item.img} style={{
                                    width: imgWidth,
                                    height: rate * imgWidth,
                                    marginBottom: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }} />
                            </TouchableOpacity>
                            <Text numberOfLines={3} style={{ color: 'black', fontSize: 20, marginLeft: 5, }} >{item.item.text}</Text>
                            <View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginBottom: 10,
                                    marginTop: 10,
                                    marginLeft: 5,
                                    justifyContent: 'space-between'
                                }}>
                                    <View style={{ flexDirection: 'row', width: imgWidth / 2 }}>
                                        <Image source={item.item.img} style={{
                                            width: 24,
                                            height: 24,
                                            borderRadius: 12,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }} />
                                        <Text numberOfLines={1} style={{ color: 'black', fontSize: 15, marginLeft: 5 }}>{item.item.author}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginRight: 10, width: imgWidth / 3, marginRight: 20 }}>
                                        <MaterialCommunityIcons name={'cards-heart-outline'} size={24} />
                                        <Text numberOfLines={1} style={{ color: 'black', fontSize: 18, }}>{item.item.like}</Text>
                                    </View>
                                </View>
                            </View>
                        </View >
                    </>
                }}
                columnWrapperStyle={{ justifyContent: 'space-around' }}
            />

        </>
    )
}

export default MyMoment