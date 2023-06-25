import React, { Component, useState, useEffect } from 'react';
import { Button, TextInput, PermissionsAndroid, Dimensions, Text, View } from 'react-native'
import { ContributionGraph } from 'react-native-chart-kit';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import dayjs from 'dayjs'
import RNFS from 'react-native-fs'
import { loadFolder } from './util/FileUtil'

const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 1,
    color: (opacity = 5) => `rgba(0, 200, 0, ${opacity})`,
    labelColor: (opacity = 1) => '#000000',
    strokeWidth: 5,
};

const MyContritutionGraph = (data) => {
    const [current, setCurrent] = useState(dayjs().toDate())
    const screenWidth = Dimensions.get("window").width
    const split = 16  //横轴方块
    const weeks = 7   // 数轴方块 一周七天
    const componentPaddingLeft = 32
    const squareSize = Math.round((screenWidth - componentPaddingLeft * 2 - split) / split)
    const gutterSize = 1
    const coefficient = Math.round((screenWidth - componentPaddingLeft * 2) / 20) - 1
    const totalSquare = (split - 1) * weeks


    return (
        <>
            <ContributionGraph
                style={{ alignItems: 'center' }}
                values={data.data}
                numDays={totalSquare}
                endDate={current}
                gutterSize={gutterSize}
                squareSize={squareSize}
                width={screenWidth}
                height={220}
                showOutOfRangeDays={false}
                chartConfig={chartConfig}
                onDayPress={(num, date) => {
                    console.log(screenWidth)
                    console.log(coefficient)
                    console.log(num)
                    console.log(Math.round(17.45))
                }}
            />
            <View style={{ flex: 1, flexDirection: 'row', marginLeft: 30 }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}>
                    <FontAwesome onPress={() => {
                        console.log('-------------')
                        const newValue = dayjs(current).subtract(7, 'day').toDate()
                        setCurrent(newValue)
                        console.log('历史', newValue)
                    }} name="long-arrow-left" size={20} color="#110" />
                    <Text> 历史</Text>
                </View>

                <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 30 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text onPress={() => console.log(66)}>前进 </Text>
                        <FontAwesome onPress={() => {
                            console.log('-------------')
                            const newValue = dayjs(current).add(7, 'day').toDate()
                            setCurrent(newValue)
                            console.log('前进', newValue)
                        }} name="long-arrow-right" size={20} color="#110" />
                    </View>
                </View>
            </View>
        </>
    )
}

export default MyContritutionGraph