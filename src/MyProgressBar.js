import React, { useState, useEffect } from "react";
import { Text, View, Button, Dimensions, ScrollView } from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { ProgressChart } from 'react-native-chart-kit';
import dayjs from 'dayjs'
import { loadFolder, loadTags, getPathFromArray, statistics,loadYearFolder } from './util/FileUtil'
import RNFS from 'react-native-fs'
import { SelectList } from 'react-native-dropdown-select-list'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MyContritutionGraph from "./MyContributionGraph";
import ImageCropPicker from 'react-native-image-crop-picker';

const MyProgressBar = ({ navigation }) => {
    const [fill, setFill] = useState(0)
    const [selected, setSelected] = useState("")
    const [year, setYear] = useState(dayjs().year());
    const [tags, setTags] = useState([])
    const [data, setData] = useState({
        labels: ['今日', '本周', '本月', '本年'], // optional
        data: [0,0,0,0],
        colors: ['#4dff4d', 'blue', 'yellow', 'green']
    })
    const [contributionGraphData, setContributionGraphData] = useState([{}])

    useEffect(() => {
        let res = []
        loadFolder().then((dirs) => {
            const length = dirs.length
            let count = 0
            for (let i = 0; i < length; i++) {
                let element = dirs[i]
                let temp = {}
                temp['date'] = element.name
                RNFS.readdir(element.path).then((r) => {
                    count = count + 1
                    temp['count'] = r.length
                    res.push(temp)
                    if (count === length) {
                        setContributionGraphData(res)
                    }
                })
            }
        })
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
    // each value represents a goal ring in Progress chart
    // const data = {
    //     labels: ['今日', '本周', '本月', '本年'], // optional
    //     data: [0.3, 0.6, 0.8, 0.1],
    //     colors: ['#4dff4d', 'blue', 'yellow', 'green']
    // };

    function momentTagStatistics(year, tag) {
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
                        setData(res)
                    }))
            })
    }

    const chartConfig = {
        backgroundGradientFrom: '#ffffe5',
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "#ffffe5",
        backgroundGradientToOpacity: 1,
        color: (opacity = 5) => `rgba(0, 200, 0, ${opacity})`,
        labelColor: (opacity = 1) => '#000000',
        strokeWidth: 5,
    };

    const ColorMap = {
        20: 'red',
        40: 'orange',
        60: 'yellow',
        80: 'blue',
        100: 'green'
    }

    function atRange(value) {
        let range = Object.keys(ColorMap);
        for (let i = 0; i < range.length; i++) {
            if (value < range[i]) {
                return ColorMap[range[i]];
            }
        }
        return ColorMap[range[range.length - 1]];
    }

    const dropDataYear = [
        { key: '1', value: '2023' },
        { key: '2', value: '2024' },
        { key: '3', value: '2025' },
    ]

    return (
        <>
            <ScrollView style={{ backgroundColor: '#ffffe5' }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            marginLeft: 5,
                            fontSize: 20,
                            //backgroundColor: '#ffffe5',
                            fontWeight: 'bold',
                        }}>Summary</Text>
                    </View>
                    <View style={{ marginLeft: 30, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <SelectList
                            setSelected={(v) => setYear(v)}
                            data={dropDataYear}
                            save="value"
                            placeholder="选择年份"
                            search={false}
                            boxStyles={{ alignItems: 'flex-end' }}
                        />
                        <SelectList
                            setSelected={(val) => momentTagStatistics(year, val)}
                            data={tags}
                            save="value"
                            placeholder="选择Tag"
                            search={false}
                            boxStyles={{ marginLeft: 10 }}
                        />
                    </View>
                </View>

                <ProgressChart
                    data={data}
                    width={Dimensions.get("window").width}
                    height={200}
                    strokeWidth={15}
                    radius={32}
                    chartConfig={chartConfig}
                    hideLegend={false}
                    withCustomBarColorFromData={true}
                />


                <Text style={{
                    marginLeft: 5,
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>Active List</Text>


                <MyContritutionGraph data={contributionGraphData} />

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{
                        marginLeft: 5,
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}>Today {dayjs().format('YYYY-MM-DD')}</Text>
                    <FontAwesome onPress={() => {
                        navigation.navigate('Calendar')
                    }} name="calendar" size={20} color="#110" style={{ marginLeft: 50 }} />
                </View>

                {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                    <AnimatedCircularProgress
                        size={350}
                        width={10}
                        fill={fill}
                        tintColor={atRange(fill)}
                        rotation={0}
                        backgroundColor="#c2c2d6"
                        tintTransparency={true}
                        padding={10}
                        children={(num) => {
                            return (
                                <>
                                    <Text>
                                        上班打卡
                                    </Text>
                                    <Text>{Math.round(num)}
                                    </Text>
                                </>)
                        }}
                    />
                </View> */}
            </ScrollView >
            <Button title="记录一下吧！" onPress={() => {
                ImageCropPicker.openPicker({ multiple: true })
                    .then(images => {
                        navigation.navigate('MyMomentUploader', {
                            'datas': images
                        })
                    })
            }} />
        </>
    )
}

export default MyProgressBar