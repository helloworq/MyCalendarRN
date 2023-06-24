import React, { Component, useState, useEffect } from 'react';
import { Button, TextInput, PermissionsAndroid, Dimensions, Text, View } from 'react-native'
import { ContributionGraph } from 'react-native-chart-kit';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import dayjs from 'dayjs'
import RNFS from 'react-native-fs'
import { loadFolder } from '../util/FileUtil'

const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 1,
    color: (opacity = 5) => `rgba(0, 200, 0, ${opacity})`,
    labelColor: (opacity = 1) => '#000000',
    strokeWidth: 5,
};

const ContritutionGraph = (data) => {
    const [current, setCurrent] = useState(dayjs().toDate())

    return (
        <>
            <ContributionGraph
                values={data.data}
                endDate={current}
                numDays={112}
                width={Dimensions.get("window").width}
                height={220}
                showOutOfRangeDays={false}
                chartConfig={chartConfig}
                onDayPress={(num, date) => {
                    console.log(num)
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
                            setCurrent(dayjs())
                            setCurrent(dayjs())
                            console.log('重置', current)
                        }} name="long-arrow-right" size={20} color="#110" />
                    </View>
                </View>
            </View>
        </>
    )
}

export default ContritutionGraph