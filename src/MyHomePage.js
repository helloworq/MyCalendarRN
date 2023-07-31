import React, { useContext, useState, useEffect } from "react";
import {
    Dimensions,
    View,
    TouchableOpacity,
    Text,
    ImageBackground,
    Image,
    StyleSheet
} from 'react-native'
import { loadFolder, loadTags, getPathFromArray, statistics, loadYearFolder } from './util/FileUtil'
import RNFS from 'react-native-fs'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ProgressChart } from 'react-native-chart-kit';
import ImageCropPicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { PreferencesContext } from "./MyPreferencesContext";
import dayjs from "dayjs";
import { Chip } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import storage from './storage/MhkvStroge';

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
    const [todayTags, setTodayTags] = useState({})
    const [data, setData] = useState({
        labels: ['今日', '本周', '本月', '本年'], // optional
        data: [0.1, 0.5, 0.7, 0.6],
        colors: ['#4dff4d', 'blue', 'yellow', 'green']
    })

    useEffect(() => {
        //加载tag数据
        loadTags().then((r) => {
            let res = []
            const obj = JSON.parse(r)
            Object.keys(obj).forEach((e) => {
                let temp = {}

                temp['key'] = e
                temp['value'] = obj[e][0]
                res.push(temp)
            })

            setTags(res)
        })
    }, [])

    async function momentTagStatistics(year, tag) {
        //统计动态中的tag信息,按年统计，如果后续数据量过大影响加载性能，考虑使用一个文本单独记录统计信息
        //RNFS.readDir(path + year)
        loadYearFolder(year)
            .then((r) => {
                let temp = []
                r.forEach((e) => { temp.push(e.path) })
                return temp
            }).then((r) => {
                let pL = []
                r.forEach((e) => {
                    let p = RNFS.readDir(e)
                    pL.push(p)
                })
                return pL
            }).then((r) => {
                Promise.all(r).then((r) => {
                    let pL = []
                    r = getPathFromArray(r)
                    r.forEach((e) => {
                        let p = RNFS.readFile(e + '/data.json')
                        pL.push(p)
                    })
                    return pL
                }).then((r) =>
                    Promise.all(r).then((r) => {
                        const res = statistics(r, tag)
                        setData(res['res'])
                        setTodayTags(res['curDayTag'])
                    }))
            })
    }


    function renderTag() {
        const tags = Object.values(todayTags)
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
            height: 150,
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

    return (
        <>
            <View style={{ flex: 1, }} >
                <ImageBackground
                    source={require('./utilCodeBlock/layout/bg.jpeg')}
                    resizeMode='stretch'
                    style={{ flex: 1, }}>

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
                                        setSelected={(val) => momentTagStatistics(year, val)}
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
                                <View style={{ padding: 20, }}>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Image source={require('./utilCodeBlock/layout/bg.jpeg')} style={{ width: 50, height: 50 }} />
                                        <Text style={{ marginLeft: 10, marginRight: 40, color: theme.colors.iconColor }}>危楼高百尺，手可摘星辰,不敢高声语，恐惊天上人。</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ width: fullBlockLength, }}>
                            <View style={{
                                width: fullBlockLength,
                                borderRadius: borderRadius,
                                height: 200,
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
                                        }}>What You Done Have Today {dayjs().format('MM-DD')}</Text>
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, marginLeft: 5 }}>
                                            {renderTag()}
                                        </View>
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