import React, { useContext } from "react";
import {
    Dimensions,
    View,
    TouchableOpacity,
    Text,
    ImageBackground,
    Image,
    StyleSheet
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ProgressChart } from 'react-native-chart-kit';
import ImageCropPicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { PreferencesContext } from "./MyPreferencesContext";

const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
}

const MyHomePage = ({ navigation }) => {
    const { mode, setMode, theme } = useContext(PreferencesContext)

    const screenHeight = Dimensions.get("window").height - 20
    const screenWidth = Dimensions.get("window").width
    const split = 10;
    const borderRadius = 20
    const fullBlockLength = screenWidth - 2 * split
    const blockLength = (screenWidth - 15 * split) / 3
    const iconSize = 40
    const iconFontSize = 13
    const tinyIconSize = 18
    const tinyIconFontSize = 10
    const data = {
        labels: ["本年", "本月", "本周"], // optional
        data: [0.7, 0.3, 0.8]
    };

    const styles = StyleSheet.create({
        progress: {
            borderRadius: borderRadius,
            width: fullBlockLength,
            height: 130,
            flexDirection: 'column',
            backgroundColor: 'white',
            margin: split,
            backgroundColor: theme.colors.progressColor
        },
        info: {
            width: fullBlockLength,
            borderRadius: borderRadius,
            height: 450,
            flexDirection: 'column',
            backgroundColor: 'white',
            margin: split,
            backgroundColor: theme.colors.progressColor
        },
        photo: {
            borderRadius: borderRadius,
            width: blockLength,
            height: blockLength,
            flexDirection: 'column',
            backgroundColor: 'white',
            margin: split,
            backgroundColor: theme.colors.progressColor
        },
        camera: {
            borderRadius: borderRadius,
            width: blockLength,
            height: blockLength,
            flexDirection: 'column',
            backgroundColor: 'white',
            margin: split,
            backgroundColor: theme.colors.progressColor
        },
        night: {
            borderRadius: borderRadius,
            width: blockLength,
            height: blockLength,
            flexDirection: 'column',
            backgroundColor: 'white',
            margin: split,
            backgroundColor: theme.colors.progressColor
        },
        tag: {
            borderRadius: borderRadius,
            width: blockLength,
            height: blockLength / 2 - 5,
            flexDirection: 'column',
            backgroundColor: 'white',
            marginLeft: split,
            marginBottom: split,
            marginRight: split,
            backgroundColor: theme.colors.progressColor
        },
        calendar: {
            borderRadius: borderRadius,
            width: blockLength,
            height: blockLength / 2 - 5,
            flexDirection: 'column',
            backgroundColor: 'white',
            marginLeft: split,
            marginBottom: split,
            marginRight: split,
            backgroundColor: theme.colors.progressColor
        }

    })

    return (
        <>
            <View style={{ flex: 1, }} >
                <ImageBackground
                    source={require('./utilCodeBlock/layout/bg.jpeg')}
                    resizeMode='stretch'
                    style={{ flex: 1, }}>

                    <View style={{ height: screenHeight, flexDirection: 'column' }}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity>
                                <View style={styles.progress}>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ borderRadius: 20, }}>
                                            <ProgressChart
                                                data={data}
                                                width={fullBlockLength}
                                                height={130}
                                                strokeWidth={8}
                                                radius={30}
                                                absolute={100}
                                                chartConfig={chartConfig}
                                                hideLegend={false}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 3, width: fullBlockLength, }}>
                            <View style={styles.info}>
                                <View style={{ padding: 20, }}>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Image source={require('./utilCodeBlock/layout/bg.jpeg')} style={{ width: 50, height: 50 }} />
                                        <Text style={{ marginLeft: 10, marginRight: 40, color: theme.colors.iconColor }}>危楼高百尺，手可摘星辰,不敢高声语，恐惊天上人。</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ justifyContent: 'flex-end' }}>
                                < TouchableOpacity onPress={() => {
                                    ImageCropPicker.openPicker({
                                        multiple: true
                                    }).then(images => {
                                        navigation.navigate('MyMomentUploader', {
                                            'datas': images
                                        })
                                    })
                                }} >
                                    <View style={styles.photo}>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: iconFontSize, color: theme.colors.iconColor }}>相册</Text>
                                            </View>
                                            <View style={{ alignItems: 'center' }}>
                                                <FontAwesome name={"photo"} size={iconSize} color={theme.colors.iconColor} />
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity >
                            </View>


                            <View style={{ justifyContent: 'flex-end' }}>
                                < TouchableOpacity onPress={() => {
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
                                    <View style={styles.camera}>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: iconFontSize, color: theme.colors.iconColor }}>拍照</Text>
                                            </View>
                                            <View style={{ alignItems: 'center' }}>
                                                <FontAwesome name={"camera"} size={iconSize} color={theme.colors.iconColor} />
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity >
                            </View>

                            <View style={{ justifyContent: 'flex-end' }}>
                                < TouchableOpacity onPress={() => {
                                    setMode(mode === 'dark' ? 'light' : 'dark')
                                }}>
                                    <View style={styles.night}>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: iconFontSize, color: theme.colors.iconColor }}>夜间模式</Text>
                                            </View>
                                            <View style={{ alignItems: 'center' }}>
                                                <MaterialCommunityIcons
                                                    color={theme.colors.iconColor}
                                                    name={"theme-light-dark"}
                                                    size={iconSize}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity >
                            </View>

                            <View style={{ justifyContent: 'flex-end' }}>
                                <View>
                                    < TouchableOpacity onPress={() => {
                                        navigation.navigate('MyAddTags')
                                    }}>
                                        <View style={styles.tag}>
                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                                    <FontAwesome name={"tags"} size={tinyIconSize} color={theme.colors.iconColor} />
                                                    <Text style={{ fontWeight: 'bold', fontSize: tinyIconFontSize, color: theme.colors.iconColor }}>标签</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity >
                                </View>

                                <View>
                                    < TouchableOpacity onPress={() => {
                                        navigation.navigate('Calendar')
                                    }}>
                                        <View style={styles.calendar}>
                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <FontAwesome name={"calendar"} size={tinyIconSize} color={theme.colors.iconColor} />
                                                    <Text style={{ fontWeight: 'bold', fontSize: tinyIconFontSize, color: theme.colors.iconColor }}>日历</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity >
                                </View>
                            </View>
                        </View>


                    </View>

                </ImageBackground>
            </View >
        </>
    )
};

export default MyHomePage