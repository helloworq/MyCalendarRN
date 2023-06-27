import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button, Dimensions, ScrollView } from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { ProgressChart, ContributionGraph } from 'react-native-chart-kit';
import dayjs from 'dayjs'
import { SelectList } from 'react-native-dropdown-select-list'

const MyProgressBar = () => {
    const [fill, setFill] = useState(0)
    const [color, setColor] = useState(0)
    const [selected, setSelected] = useState("");

    // each value represents a goal ring in Progress chart
    const data = {
        labels: ['今日', '本周', '本月', '本年', '全部'], // optional
        data: [0.3, 0.6, 0.8, 0.1, 0.2],
        colors: ['#4dff4d', 'blue', 'yellow', 'green', 'red']
    };

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

    const commitsData = [
        { date: "2023-05-02", count: 1 },
        { date: "2023-05-03", count: 2 },
        { date: "2023-05-04", count: 3 },
        { date: "2023-05-05", count: 4 },
        { date: "2023-05-06", count: 5 },
        { date: "2023-06-30", count: 2 },
        { date: "2023-01-31", count: 3 },
        { date: "2023-06-01", count: 2 },
        { date: "2023-04-02", count: 4 },
        { date: "2023-04-05", count: 2 },
        { date: "2023-04-30", count: 4 }
    ];

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([]);
    const [items, setItems] = useState([
        { label: 'Spain', value: 'spain' },
        { label: 'Madrid', value: 'madrid' },
        { label: 'Barcelona', value: 'barcelona', },

        { label: 'Italy', value: 'italy' },
        { label: 'Rome', value: 'rome', },

        { label: 'Finland', value: 'finland' }
    ]);

    function atRange(value) {
        let range = Object.keys(ColorMap);
        for (let i = 0; i < range.length; i++) {
            if (value < range[i]) {
                return ColorMap[range[i]];
            }
        }
        return ColorMap[range[range.length - 1]];
    }

    const dropData = [
        { key: '1', value: '2023' },
        { key: '2', value: '2024' },
        { key: '3', value: '2025' },
        { key: '4', value: '2026' },
        { key: '5', value: '2027' },
        { key: '6', value: '2028' },
        { key: '7', value: '2029' },
    ]

    return (
        <>
            <ScrollView>
                <Button title="Cilck Add" onPress={() => {
                    const newValue = fill + 10
                    setFill(newValue)
                    console.log(atRange(newValue), newValue)
                }} />
                <Button title="Cilck Substract" onPress={() => {
                    const newValue = fill - 10
                    setFill(newValue)
                    console.log(atRange(newValue), newValue)
                }} />

                <View style={{ flexDirection: 'row', backgroundColor: '#ffffe5' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            marginLeft: 5,
                            fontSize: 20,
                            backgroundColor: '#ffffe5',
                            fontWeight: 'bold',
                        }}>Summary</Text>
                    </View>
                    <View style={{ marginLeft: 65, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <SelectList
                            setSelected={(val) => setSelected(val)}
                            data={dropData}
                            save="value"
                            placeholder="选择年份"
                            search={false}
                            boxStyles={{ alignItems: 'flex-end' }}
                        />
                        <SelectList
                            setSelected={(val) => setSelected(val)}
                            data={dropData}
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

                <View style={{ flexDirection: 'row', backgroundColor: '#ffffe5' }}>
                    <Text style={{
                        marginLeft: 5,
                        fontSize: 20,
                        backgroundColor: '#ffffe5',
                        fontWeight: 'bold',
                    }}>Active List</Text>
                    <SelectList
                        setSelected={(val) => setSelected(val)}
                        data={dropData}
                        save="value"
                        placeholder="选择Tag"
                        search={false}
                    />
                </View>

                <ContributionGraph
                    values={commitsData}
                    endDate={new Date()}
                    numDays={105}
                    width={Dimensions.get("window").width}
                    height={220}
                    chartConfig={chartConfig}
                />

                <Text style={{
                    marginLeft: 5,
                    fontSize: 20,
                    backgroundColor: '#ffffe5',
                    fontWeight: 'bold',
                }}>Today {dayjs().format('YYYY-MM-DD')}</Text>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#ffffe5' }}>
                    <AnimatedCircularProgress
                        size={150}
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
                        }
                        }
                    />
                    <AnimatedCircularProgress
                        size={150}
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
                                        下班打卡
                                    </Text>
                                    <Text>{Math.round(num)}
                                    </Text>
                                </>)
                        }
                        }
                    />
                    <AnimatedCircularProgress
                        size={150}
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
                                        拉屎打卡
                                    </Text>
                                    <Text>{Math.round(num)}
                                    </Text>
                                </>)
                        }
                        }
                    />
                    <AnimatedCircularProgress
                        size={220}
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
                                        学习打卡
                                    </Text>
                                    <Text>{Math.round(num)}
                                    </Text>
                                </>)
                        }
                        }
                    />
                    <AnimatedCircularProgress
                        size={150}
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
                                        健身打卡
                                    </Text>
                                    <Text>{Math.round(num)}
                                    </Text>
                                </>)
                        }
                        }
                    />
                </View>
            </ScrollView>
        </>
    )
}

export default MyProgressBar