import React, { useContext, useState, useEffect } from "react";
import {
    Dimensions,
    View,
    TouchableOpacity,
    Text,
    ImageBackground,
    FlatList,
    StyleSheet,
    RefreshControl
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ProgressChart } from 'react-native-chart-kit';
import ImageCropPicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { PreferencesContext } from "./MyPreferencesContext";
import dayjs from "dayjs";
import { Chip, FAB } from "react-native-paper";
import storage, { getTagsByStroage, getTodayTagByStroage, statisticsByStroage } from './storage/MhkvStroge';
import ImgStroage from "./storage/ImgStroage";
import MyModalPicker from "./compoment/MyModalPicker";
import { useIsFocused } from "@react-navigation/native";

const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 0.5) => `rgba(255,255,255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
}

const MyHomePage = ({ navigation }) => {
    const { mode, setMode, theme, bgImg, setBgImg } = useContext(PreferencesContext)

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
    const isFocused = useIsFocused();
    const [refresh, setRefresh] = useState(true)

    const year = dayjs().year();
    const [tags, setTags] = useState([])
    const [todayTags, setTodayTags] = useState([])
    const [refresing, setRefresing] = useState(false)
    const [data, setData] = useState({
        labels: ['今日', '本周', '本月', '本年'], // optional
        data: [0, 0, 0, 0],
        colors: ['#4dff4d', 'blue', 'yellow', 'green']
    })

    useEffect(() => { setRefresh(!refresh) }, [isFocused]);

    useEffect(() => {
        const tagSaved = getTagsByStroage()
        setTags(tagSaved.map(e => e[0]))
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

    const styles = StyleSheet.create({
        progress: {
            elevation: 10,
            borderRadius: borderRadius,
            width: fullBlockLength,
            flexDirection: 'column',
            marginTop: split,
            marginLeft: split,
            marginRight: split,
            marginBottom: split,
            backgroundColor: theme.colors.bgColor,
        },
        info: {
            elevation: 10,
            width: fullBlockLength,
            borderRadius: borderRadius,
            height: 250,
            flexDirection: 'column',
            backgroundColor: 'white',
            marginLeft: split,
            marginRight: split,
            marginBottom: split,
            backgroundColor: theme.colors.bgColor
        },
        photo: {
            elevation: 10,
            borderRadius: borderRadius,
            width: blockLength,
            height: blockLength,
            flexDirection: 'column',
            backgroundColor: 'white',
            margin: split,
            backgroundColor: theme.colors.bgColor
        },
        camera: {
            elevation: 10,
            borderRadius: borderRadius,
            width: blockLength,
            height: blockLength,
            flexDirection: 'column',
            backgroundColor: 'white',
            margin: split,
            backgroundColor: theme.colors.bgColor
        },
        night: {
            elevation: 10,
            borderRadius: borderRadius,
            width: blockLength,
            height: blockLength,
            flexDirection: 'column',
            backgroundColor: 'white',
            margin: split,
            backgroundColor: theme.colors.bgColor
        },
        tag: {
            elevation: 10,
            borderRadius: borderRadius,
            width: blockLength,
            height: blockLength / 2 - 5,
            flexDirection: 'column',
            backgroundColor: 'white',
            marginLeft: split,
            marginBottom: split,
            marginRight: split,
            backgroundColor: theme.colors.bgColor
        },
        calendar: {
            elevation: 10,
            borderRadius: borderRadius,
            width: blockLength,
            height: blockLength / 2 - 5,
            flexDirection: 'column',
            backgroundColor: 'white',
            marginLeft: split,
            marginBottom: split,
            marginRight: split,
            backgroundColor: theme.colors.bgColor
        }

    })

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

    return (
        <>
            <View style={{ flex: 1, }} >
                <ImageBackground
                    source={ImgStroage[bgImg]}
                    resizeMode='stretch'
                    style={{ flex: 1, backgroundColor: theme.colors.totalOpacityBgColor }}
                >

                    <View style={{ height: screenHeight, flexDirection: 'column', }}>
                        <View style={{}}>
                            <View style={styles.progress}>
                                <View style={{ flexDirection: 'row' }}>
                                    <ProgressChart
                                        data={data}
                                        width={fullBlockLength - 100}
                                        height={150}
                                        strokeWidth={8}
                                        radius={30}
                                        absolute={100}
                                        chartConfig={chartConfig}
                                        hideLegend={false}
                                        withCustomBarColorFromData={true}
                                    />

                                    <MyModalPicker
                                        fontBgColor={theme.colors.bgColor}
                                        fontColor={theme.colors.fontColor}
                                        data={tags}
                                        callback={(val) => {
                                            const res = statisticsByStroage(val)
                                            setData(res['res'] ?? data)
                                        }}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ width: fullBlockLength, }}>
                            <View style={styles.info}>
                                <View style={{ padding: 20, flex: 1, }}>

                                    <View style={{ flexDirection: 'row', marginBottom: 10, borderBottomColor: 'gray', borderBottomWidth: 0.5 }}>
                                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                            <Text style={{ color: 'black', fontSize: 18 }}>昵称</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                            {/* <Text style={{ color: 'black', fontSize: 18, marginRight: 10 }}>状态</Text> */}
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

                        <View style={{ width: fullBlockLength, }}>
                            <View style={{
                                width: fullBlockLength,
                                borderRadius: borderRadius,
                                height: 150,
                                flexDirection: 'column',
                                backgroundColor: 'white',
                                marginLeft: split,
                                marginRight: split,
                                marginBottom: split,
                                backgroundColor: theme.colors.bgColor,
                                elevation: 10,
                            }}>
                                <View style={{ padding: 10, }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{
                                            color: theme.colors.fontColor,
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                        }}>What You Have Done Today {dayjs().format('MM-DD')}</Text>
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, marginLeft: 5 }}>
                                            {renderTag()}
                                        </View>
                                    </View>

                                </View>
                            </View>
                        </View>
                        {/* <FAB
                            icon="plus"
                            style={{
                                position: 'absolute',
                                margin: 16,
                                left: 0,
                                top: 0,
                            }}
                            onPress={() =>
                                //console.log(storage.getString('moment'))
                                //statisticsV2()
                                //storage.delete(mo)
                            }
                        /> */}
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
                                    storage.set('theme', mode === 'dark' ? 'light' : 'dark')
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

                                <View>
                                    < TouchableOpacity onPress={() => {
                                        navigation.navigate('MySkin')
                                    }}>
                                        <View style={styles.calendar}>
                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <FontAwesome name={"calendar"} size={tinyIconSize} color={theme.colors.iconColor} />
                                                    <Text style={{ fontWeight: 'bold', fontSize: tinyIconFontSize, color: theme.colors.iconColor }}>皮肤</Text>
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