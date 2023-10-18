import React, { useContext, useEffect, useState } from "react";
import {
    Dimensions,
    View,
    TouchableOpacity,
    Text,
    FlatList,
    ImageBackground,
    Image,
    ToastAndroid,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ImageCropPicker from 'react-native-image-crop-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { PreferencesContext } from "./MyPreferencesContext";
import ImgStroage from "./storage/ImgStroage";
import Modal from "react-native-modal";
import ImageView from 'react-native-image-viewing'
import MyPullDownNative from "./compoment/MyPullDownNative";
import { selectCurUserMoment } from "./storage/repository/UserDao";

const MyHomePage = ({ navigation }) => {
    const { mode, setMode, theme, bgImg, setBgImg } = useContext(PreferencesContext)
    const screenHeight = Dimensions.get("window").height - 20
    const screenWidth = Dimensions.get("window").width
    const imgWidth = screenWidth / 3 - 20
    const split = 10;
    const borderRadius = 10
    const [visible, setVisible] = useState(false)
    const [currImg, setCurrImg] = useState(null)
    const [close, setClose] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => selectCurUserMoment((e) => setData(e)), [])

    return (
        <>
            <ImageBackground
                source={ImgStroage[bgImg]}
                resizeMode='stretch'
                style={{ flex: 1, backgroundColor: theme.colors.totalOpacityBgColor }}
            >
                <ImageView
                    images={[{ uri: currImg }]}
                    visible={close}
                    onRequestClose={() => setClose(false)}
                />

                <View style={{ marginTop: 10, marginRight: 10, marginLeft: 10, height: '92.8%', }}>

                    <FlatList
                        data={data}
                        renderItem={(row) => {
                            console.log(row)
                            return (
                                <>
                                    <View style={{ backgroundColor: theme.colors.bgColor, borderRadius: borderRadius, padding: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                            <View style={{ flexDirection: 'row', width: '80%' }}>
                                                <Image source={{ uri: row.item['AVATAR'] }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
                                                <View style={{ justifyContent: 'space-around' }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: theme.colors.fontColor }} >{row.item['NAME']}</Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ marginRight: 10, color: 'gray' }}>{row.item['LAST_UPDATE_TIME']}</Text>
                                                        <Text style={{ color: 'gray' }} >来自 {row.item['DEVICE']}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <TouchableOpacity>
                                                <FontAwesome name='angle-down' size={20} color={theme.colors.iconColor} />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ marginBottom: 5, marginTop: 5 }}>
                                            <Text style={{ fontSize: 17, color: theme.colors.fontColor }}>{row.item['CONTENT']}</Text>
                                        </View>

                                        <FlatList
                                            data={JSON.parse(row.item['IMAGES']) ?? []}
                                            renderItem={(rowSecond) => {
                                                return (
                                                    <>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setClose(true)
                                                                setCurrImg(rowSecond.item)
                                                            }}
                                                        >
                                                            <View style={{ width: imgWidth + split, height: imgWidth + split }}>
                                                                <Image source={{ uri: rowSecond.item }} style={{ width: imgWidth, height: imgWidth }} />
                                                            </View>
                                                        </TouchableOpacity>
                                                    </>
                                                )
                                            }}
                                            numColumns={3}
                                            keyExtractor={(item, index) => {
                                                return item + index
                                            }}
                                            horizontal={false}
                                        />
                                    </View>
                                </>
                            )
                        }}
                        onScroll={(e) => {
                            console.log(e.nativeEvent.contentOffset.y)
                        }}
                        keyExtractor={(item, index) => {
                            return item.path + index
                        }}
                        ItemSeparatorComponent={() => <View style={{ height: split }} />}
                        horizontal={false}
                        numColumns={1}
                    />
                </View>

                <View style={{
                    backgroundColor: theme.colors.bgColor,
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: screenWidth,
                    height: '6%',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('MyMoment')
                            }}>
                                <View>
                                    <MaterialIcons name="camera" size={50} color={theme.colors.iconColor} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity onPress={() => {
                                setVisible(!visible)
                            }}>
                                <View>
                                    < MaterialIcons name="add-circle" size={50} color={theme.colors.iconColor} />
                                </View>
                                <Modal
                                    backdropColor={'white'}
                                    useNativeDriver={true}
                                    animationIn='fadeInUp'
                                    animationOut='fadeOutDown'
                                    isVisible={visible}
                                    onSwipeComplete={() => setVisible(false)}
                                    onBackdropPress={() => setVisible(false)}
                                    onBackButtonPress={() => setVisible(false)}
                                >
                                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => {
                                            setVisible(!visible)
                                            ImageCropPicker.openPicker({
                                                multiple: true
                                            }).then(images => {
                                                navigation.navigate('MyMomentUploader', {
                                                    'datas': images
                                                })
                                            }).catch(e => ToastAndroid.show('未获取权限', ToastAndroid.SHORT))
                                        }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                < MaterialIcons name="photo" size={50} color={theme.colors.iconColor} />
                                                <Text style={{ fontSize: 30, color: theme.colors.fontColor }}>从相册选择</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            setVisible(!visible)
                                            ImageCropPicker.openCamera({
                                                width: Dimensions.get('window').width,
                                                height: Dimensions.get('window').height,
                                            }).then(images => {
                                                images = Array.isArray(images) ? images : [images]
                                                navigation.navigate('MyMomentUploader', {
                                                    'datas': images
                                                })
                                            })
                                        }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                < MaterialIcons name="camera-alt" size={50} color={theme.colors.iconColor} />
                                                <Text style={{ fontSize: 30, color: theme.colors.fontColor }}>从相机记录</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
                                <View>
                                    <FontAwesome name="user" size={50} color={theme.colors.iconColor} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground >
        </>
    )
};

export default MyHomePage