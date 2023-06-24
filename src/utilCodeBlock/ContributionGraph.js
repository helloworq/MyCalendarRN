import React, { Component, useState } from 'react';
import { Button, TextInput, PermissionsAndroid, Dimensions, Text, View } from 'react-native'
import { ContributionGraph } from 'react-native-chart-kit';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import dayjs from 'dayjs'

const commitsData = [
    { date: "2023-04-02", count: 1 },
    { date: "2023-04-30", count: 2 },
    { date: "2023-05-03", count: 2 },
    { date: "2023-05-04", count: 3 },
    { date: "2023-05-05", count: 4 },
    { date: "2023-05-09", count: 5 },
    { date: "2023-06-01", count: 2 },
    { date: "2023-06-02", count: 4 },
    { date: "2023-06-05", count: 2 },
    { date: "2023-06-30", count: 4 },
    { date: "2023-06-31", count: 3 },
];

const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 1,
    color: (opacity = 0.5) => `rgba(0, 200, 0, ${opacity})`,
    labelColor: (opacity = 1) => '#000000',
    strokeWidth: 5,
};

const ContritutionGraph = () => {
    const [current, setCurrent] = useState(dayjs().toDate())
    //热力图左右切换时会出现第一下少步进一次，设置此tag
    const [btnHis, setBtnHis] = useState(false)
    const [btnAhead, setBtnAHead] = useState(false)

    return (
        <>
            <ContributionGraph
                values={commitsData}
                endDate={current}
                numDays={112}
                width={Dimensions.get("window").width}
                height={220}
                showOutOfRangeDays={false}
                chartConfig={chartConfig}
                onDayPress={(num, date) => {
                    console.log(num.date)
                }}
                gutterSize={1}
                squareSize={19.5}
            />
            <View style={{ flex: 1, flexDirection: 'row', marginLeft: 30 }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}>
                    <FontAwesome onPress={() => {
                        console.log('-------------')
                        setCurrent(dayjs(current).subtract(7, 'day').toDate())
                        console.log('历史', current)
                    }} name="long-arrow-left" size={20} color="#110" />
                    <Text> 历史</Text>
                </View>

                <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 30 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text onPress={() => console.log(66)}>前进 </Text>
                        <FontAwesome onPress={() => {
                            console.log('-------------')
                            setCurrent(dayjs(current).add(7, 'day').toDate())
                            console.log('前进', current)
                        }} name="long-arrow-right" size={20} color="#110" />
                    </View>
                </View>
            </View>
        </>
    )
}

export default ContritutionGraph