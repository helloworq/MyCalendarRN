import React, { useContext, useState, useEffect } from "react";
import {
    Dimensions,
    View,
    TouchableOpacity,
    Text,
    ImageBackground,
    Image,
    Button,
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
import { SelectList } from "react-native-dropdown-select-list";
import storage, { getTagsByStroage, getTodayTagByStroage, statisticsByStroage } from './storage/MhkvStroge';
import ImgStroage from "./storage/ImgStroage";

const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 0.5) => `rgba(255,255,255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
}

const MyHomePage = ({ navigation }) => {
    const { mode, setMode, theme } = useContext(PreferencesContext)

    const bgImg = storage.getString('bgImg') ? 'a' : 'a'
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

    const year = dayjs().year();
    const [tags, setTags] = useState([])
    const [todayTags, setTodayTags] = useState([])
    const [refresing, setRefresing] = useState(false)
    const [data, setData] = useState({
        labels: ['今日', '本周', '本月', '本年'], // optional
        data: [0.1, 0.5, 0.7, 0.6],
        colors: ['#4dff4d', 'blue', 'yellow', 'green']
    })

    useEffect(() => {
        //加载tag数据
        const tagSaved = getTagsByStroage()
        let res = []
        let i = 0
        tagSaved.forEach(e => {
            let temp = {}
            temp['key'] = i
            temp['value'] = e[0]
            res.push(temp)

            i = i + 1
        })
        setTags(res)

        //加载todayTag
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
            borderRadius: borderRadius,
            width: blockLength,
            height: blockLength,
            flexDirection: 'column',
            backgroundColor: 'white',
            margin: split,
            backgroundColor: theme.colors.bgColor
        },
        camera: {
            borderRadius: borderRadius,
            width: blockLength,
            height: blockLength,
            flexDirection: 'column',
            backgroundColor: 'white',
            margin: split,
            backgroundColor: theme.colors.bgColor
        },
        night: {
            borderRadius: borderRadius,
            width: blockLength,
            height: blockLength,
            flexDirection: 'column',
            backgroundColor: 'white',
            margin: split,
            backgroundColor: theme.colors.bgColor
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
            backgroundColor: theme.colors.bgColor
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
                                <Text style={{ color: 'black', fontSize: 18, marginRight: 10 }}>PK</Text>
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
                    style={{ flex: 1, }}
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
                                        style={{
                                            marginLeft: -20,
                                        }}
                                    />
                                    <SelectList
                                        setSelected={(val) => {
                                            const res = statisticsByStroage(val)
                                            setData(res['res'])
                                        }}
                                        data={tags}
                                        dropdownStyles={{ width: 100, marginLeft: 20 }}
                                        dropdownTextStyles={{ color: theme.colors.fontColor }}
                                        disabledTextStyles={{ color: theme.colors.fontColor }}
                                        save="value"
                                        inputStyles={{ color: theme.colors.fontColor, width: 70 }}
                                        arrowicon={
                                            <MaterialCommunityIcons
                                                color={theme.colors.iconColor}
                                                name={"chevron-down"}
                                                size={20} />
                                        }
                                        placeholder="选择tag"
                                        notFoundText="无标签"
                                        search={false}
                                        boxStyles={{ color: theme.colors.fontColor, borderWidth: 0 }}
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
                                            <Text style={{ color: 'black', fontSize: 18, marginRight: 10 }}>状态</Text>
                                            <FontAwesome name={"refresh"} size={20} color={'black'}
                                                onPress={() => {
                                                    var ws = new WebSocket('ws://10.0.2.2:8887');

                                                    ws.onopen = () => {
                                                        // connection opened
                                                        ws.send('something'); // send a message
                                                    };

                                                    ws.onmessage = (e) => {
                                                        // a message was received
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
                                                }}
                                            />
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
                                backgroundColor: theme.colors.bgColor
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
                                //statisticsV2()
                                //storage.delete(mo)
                                //storage.set("moment",JSON.stringify({"2023-06":[{"date":"2023-06-01","time":"09:27:48","datetime":"2023-06-01 09:27:48","tags":[["#111","compass-outline",true]],"description":"qq","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014637_1.jpg"]},{"date":"2023-06-13","time":"09:27:48","datetime":"2023-06-13 09:27:48","tags":[["#111","compass-outline",true]],"description":"qq","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014637_1.jpg"]},{"date":"2023-06-21","time":"09:27:48","datetime":"2023-06-21 09:27:48","tags":[["#111","compass-outline",true]],"description":"qq","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014637_1.jpg"]},{"date":"2023-06-11","time":"09:27:48","datetime":"2023-06-11 09:27:48","tags":[["#111","compass-outline",true]],"description":"qq","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014637_1.jpg"]}],"2023-11":[{"date":"2023-11-01","time":"09:27:48","datetime":"2023-11-01 09:27:48","tags":[["#111","compass-outline",true]],"description":"qq","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014637_1.jpg"]}],"2023-07":[{"date":"2023-07-01","time":"09:27:48","datetime":"2023-07-01 09:27:48","tags":[["#111","compass-outline",true]],"description":"qq","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014637_1.jpg"]},{"date":"2023-07-11","time":"09:27:48","datetime":"2023-07-11 09:27:48","tags":[["#111","compass-outline",true]],"description":"qq","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014637_1.jpg"]}],"2023-08":[{"date":"2023-08-01","time":"09:27:48","datetime":"2023-08-01 09:27:48","tags":[["#111","compass-outline",true]],"description":"qq","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014637_1.jpg"]},null,null,{"date":"2023-08-02","time":"06:27:49","datetime":"2023-08-02 06:27:49","tags":[["#qq","tag",true]],"description":"Rtu","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014635_1.jpg"]},{"date":"2023-08-02","time":"06:27:49","datetime":"2023-08-02 06:27:49","tags":[["#qq","tag",true]],"description":"Rtu","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014635_1.jpg"]}]}))
                                //storage.set("moment",JSON.stringify({"2023-06":[{"date":"2023-06-01","time":"09:27:48","datetime":"2023-06-01 09:27:48","tags":[["#111","compass-outline",true]],"description":"qq","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014637_1.jpg"]},{"date":"2023-06-13","time":"09:27:48","datetime":"2023-06-13 09:27:48","tags":[["#111","compass-outline",true]],"description":"qq","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014637_1.jpg"]},{"date":"2023-06-21","time":"09:27:48","datetime":"2023-06-21 09:27:48","tags":[["#111","compass-outline",true]],"description":"qq","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014637_1.jpg"]},{"date":"2023-06-11","time":"09:27:48","datetime":"2023-06-11 09:27:48","tags":[["#111","compass-outline",true]],"description":"qq","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014637_1.jpg"]}],"2023-11":[{"date":"2023-11-01","time":"09:27:48","datetime":"2023-11-01 09:27:48","tags":[["#111","compass-outline",true]],"description":"qq","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014637_1.jpg"]}],"2023-07":[{"date":"2023-07-01","time":"09:27:48","datetime":"2023-07-01 09:27:48","tags":[["#111","compass-outline",true]],"description":"qq","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014637_1.jpg"]},{"date":"2023-07-11","time":"09:27:48","datetime":"2023-07-11 09:27:48","tags":[["#111","compass-outline",true]],"description":"qq","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014637_1.jpg"]}],"2023-08":[{"date":"2023-08-01","time":"09:27:48","datetime":"2023-08-01 09:27:48","tags":[["#111","compass-outline",true]],"description":"qq","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014637_1.jpg"]},null,null,{"date":"2023-08-02","time":"06:27:49","datetime":"2023-08-02 06:27:49","tags":[["#qq","tag",true]],"description":"Rtu","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014635_1.jpg"]},{"date":"2023-08-02","time":"06:27:49","datetime":"2023-08-02 06:27:49","tags":[["#qq","tag",true]],"description":"Rtu","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014635_1.jpg"]},{"date":"2023-08-11","time":"06:27:49","datetime":"2023-08-11 06:27:49","tags":[["#qq","tag",true]],"description":"Rtu","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014635_1.jpg"]},{"date":"2023-08-06","time":"06:27:49","datetime":"2023-08-06 06:27:49","tags":[["#qq","tag",true]],"description":"Rtu","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014635_1.jpg"]},{"date":"2023-08-15","time":"06:27:49","datetime":"2023-08-15 06:27:49","tags":[["#qq","tag",true]],"description":"Rtu","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014635_1.jpg"]},{"date":"2023-08-04","time":"06:27:49","datetime":"2023-08-04 06:27:49","tags":[["#qq","tag",true]],"description":"Rtu","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014635_1.jpg"]},{"date":"2023-08-03","time":"06:27:49","datetime":"2023-08-03 06:27:49","tags":[["#qq","tag",true]],"description":"Rtu","imageUrl":["file:///data/user/0/com.mycalendar/cache/react-native-image-crop-picker/IMG_20230621_014635_1.jpg"]}]}))
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
                            </View>
                        </View>


                    </View>

                </ImageBackground>
            </View >
        </>
    )
};

export default MyHomePage