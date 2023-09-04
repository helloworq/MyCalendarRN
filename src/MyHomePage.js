import React, { useContext, useState, useEffect } from "react";
import {
    Dimensions,
    View,
    TouchableOpacity,
    Text,
    ImageBackground,
    ScrollView,
    ToastAndroid,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ImageCropPicker from 'react-native-image-crop-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { PreferencesContext } from "./MyPreferencesContext";
import dayjs from "dayjs";
import { Chip, } from "react-native-paper";
import { getTodayTagByStroage, } from './storage/MhkvStroge';
import ImgStroage from "./storage/ImgStroage";
import Modal from "react-native-modal";

const MyHomePage = ({ navigation }) => {
    const { mode, setMode, theme, bgImg, setBgImg } = useContext(PreferencesContext)
    const screenHeight = Dimensions.get("window").height - 20
    const screenWidth = Dimensions.get("window").width
    const split = 10;
    const borderRadius = 20
    const fullBlockLength = screenWidth - 2 * split
    const [visible, setVisible] = useState(false)
    const [todayTags, setTodayTags] = useState([])

    useEffect(() => {
        setTodayTags(getTodayTagByStroage())
    }, [])

    function renderTag() {
        const tags = todayTags
        const eleTag = tags.map(t =>
            <Chip
                icon={t[1]}
                mode={t[2] ? 'flat' : 'outlined'}
                textStyle={{ color: theme.colors.fontColor, }}
                style={{
                    marginBottom: 10,
                    marginRight: 10,
                    backgroundColor: theme.colors.bgColor,
                }}
                onPress={() => { }}
            >{t[0]}</Chip>
        )
        return eleTag
    }

    return (
        <>
            <ImageBackground
                source={ImgStroage[bgImg]}
                resizeMode='stretch'
                style={{ flex: 1, backgroundColor: theme.colors.totalOpacityBgColor }}
            >
                <ScrollView style={{ flex: 1, flexDirection: 'column', }}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{
                            width: fullBlockLength,
                            borderRadius: borderRadius,
                            height: 200,
                            marginTop: split,
                            width: '95%',
                            backgroundColor: theme.colors.bgColor,
                        }}>
                            <View style={{ padding: 10, }}>
                                <Text style={{
                                    color: theme.colors.fontColor,
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                }}>What You Have Done Today {dayjs().format('MM-DD')}</Text>
                                <ScrollView style={{ flexDirection: 'column', height: 160, marginTop: 10 }}>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 5 }}>
                                        {renderTag()}
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={{
                    backgroundColor: theme.colors.bgColor,
                    position: 'absolute',
                    left: 30,
                    bottom: 10,
                    width: screenWidth - 2 * 30,
                    height: 60,
                    borderRadius: 50,
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
                                    //backdropOpacity={0.5}
                                    backdropColor={theme.colors.bgColor}
                                    style={{ height: 200 }}
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