import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Dimensions,
} from "react-native";
import storage, { getTagsByStroage, getTodayTagByStroage, statisticsByStroage } from './storage/MhkvStroge';
import ImgStroage from "./storage/ImgStroage";
import { PreferencesContext } from "./MyPreferencesContext";
import { ProgressChart } from 'react-native-chart-kit';
import MyModalPicker from "./compoment/MyModalPicker";

const MyChart = () => {
    const { mode, setMode, theme, bgImg, setBgImg } = useContext(PreferencesContext)
    const screenHeight = Dimensions.get("window").height - 20
    const screenWidth = Dimensions.get("window").width
    const split = 10;
    const borderRadius = 20
    const fullBlockLength = screenWidth - 2 * split
    const blockLength = (screenWidth - 15 * split) / 3

    const [tags, setTags] = useState([])
    const [data, setData] = useState({
        labels: ['今日', '本周', '本月', '本年'], // optional
        data: [0, 0, 0, 0],
        colors: ['#4dff4d', 'blue', 'yellow', 'green']
    })
    const chartConfig = {
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
        color: (opacity = 0.5) => `rgba(255,255,255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    }

    useEffect(() => {
        const tagSaved = getTagsByStroage()
        setTags(tagSaved.map(e => e[0]))
    }, [])

    return (
        <>
            <View style={{}}>
                <View style={{
                    borderRadius: borderRadius,
                    width: fullBlockLength,
                    flexDirection: 'column',
                    marginTop: split,
                    marginLeft: split,
                    marginRight: split,
                    marginBottom: split,
                    backgroundColor: theme.colors.bgColor,
                }}>
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
        </>
    )
}

export default MyChart