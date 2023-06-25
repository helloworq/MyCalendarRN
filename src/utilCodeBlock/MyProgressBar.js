import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity,  View, Button, Dimensions } from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { ProgressChart, ContributionGraph } from 'react-native-chart-kit';

const MyProgressBar = () => {
    const [fill, setFill] = useState(0)
    const [color, setColor] = useState(0)

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

    function atRange(value) {
        let range = Object.keys(ColorMap);
        for (let i = 0; i < range.length; i++) {
            if (value < range[i]) {
                return ColorMap[range[i]];
            }
        }
        return ColorMap[range[range.length - 1]];
    }

    return (
        <>
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


            <ProgressChart
                data={data}
                width={Dimensions.get("window").width}
                height={220}
                strokeWidth={15}
                radius={32}
                chartConfig={chartConfig}
                hideLegend={false}
                withCustomBarColorFromData={true}
            />

            <ContributionGraph
                values={commitsData}
                endDate={new Date()}
                numDays={105}
                width={Dimensions.get("window").width}
                height={220}
                chartConfig={chartConfig}
            />

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#ffffe5' }}>
                <AnimatedCircularProgress
                    size={120}
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
                    size={120}
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
                    size={120}
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
                                    Coding打卡
                                </Text>
                                <Text>{Math.round(num)}
                                </Text>
                            </>)
                    }
                    }
                />
                <AnimatedCircularProgress
                    size={180}
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
                    size={120}
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
        </>
    )
}

export default MyProgressBar