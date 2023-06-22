import React, { useState, useEffect } from 'react';
import { loadData, getData, readText } from './util/FileUtil'

import {
    StyleSheet,
    Text,
    View,
    RefreshControl,
    ActivityIndicator,
    Image,
    TouchableOpacity
} from 'react-native'
import Timeline from 'react-native-timeline-flatlist'

// const datas = [
//     {
//         "description":"dasdasdsadsadasdsadsadasdasdasdasdsadsadsa",
//         "imageUrl": [
//             "file:///data/user/0/com.mycalendar/files/MyData/2023-5-2/15-27-4/data.json",
//             "file:///data/user/0/com.mycalendar/files/MyData/2023-5-2/15-27-4/IMG_20230620_120020.jpg",
//             "file:///data/user/0/com.mycalendar/files/MyData/2023-5-2/15-27-4/IMG_20230620_120914.jpg",
//             "file:///data/user/0/com.mycalendar/files/MyData/2023-5-2/15-27-4/IMG_20230620_120929.jpg"
//         ],
//         "time": "15-27-4",
//         "title": "15-27-4"
//     },
//     {
//         "description":"dasdasdsadsadasdsadsadasdasdasdasdsadsadsa",
//         "imageUrl": [
//             "file:///data/user/0/com.mycalendar/files/MyData/2023-5-2/15-27-33/data.json",
//             "file:///data/user/0/com.mycalendar/files/MyData/2023-5-2/15-27-33/IMG_20230620_115948.jpg",
//             "file:///data/user/0/com.mycalendar/files/MyData/2023-5-2/15-27-33/IMG_20230620_120004.jpg",
//             "file:///data/user/0/com.mycalendar/files/MyData/2023-5-2/15-27-33/IMG_20230620_120000.jpg",
//             "file:///data/user/0/com.mycalendar/files/MyData/2023-5-2/15-27-33/IMG_20230620_120001.jpg",
//             "file:///data/user/0/com.mycalendar/files/MyData/2023-5-2/15-27-33/IMG_20230620_120002.jpg",
//             "file:///data/user/0/com.mycalendar/files/MyData/2023-5-2/15-27-33/IMG_20230620_120002_1.jpg",
//             "file:///data/user/0/com.mycalendar/files/MyData/2023-5-2/15-27-33/IMG_20230620_120020.jpg",
//             "file:///data/user/0/com.mycalendar/files/MyData/2023-5-2/15-27-33/IMG_20230620_120914.jpg",
//             "file:///data/user/0/com.mycalendar/files/MyData/2023-5-2/15-27-33/IMG_20230620_120929.jpg"
//         ],
//         "time": "15-27-33",
//         "title": "15-27-33"
//     }
// ]

const MyDynamicListView = ({ route, navigation }) => {
    const { param } = route.params

    const [refreshing, setRefreshing] = useState(false)
    const [waiting, setWaiting] = useState(true)
    const [tdata, setTdata] = useState()
    const [initData, setInitData] = useState(false)

    useEffect(() => {
        loadData(param).then((r) => setTdata(r))
    }, [])

    function onRefresh() {
        setRefreshing(true)
        //refresh to initial data
        setTimeout(() => {
            //refresh to initial data
            setTdata(tdata)
            setRefreshing(false)
        }, 2000);
    }

    function onEndReached() {
        console.log("到达底部了")
        //if (!waiting) {
        //setWaiting(true)

        //fetch and concat data
        // setTimeout(() => {
        //     //refresh to initial data
        //     var data = tdata.concat(
        //         [
        //             { time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline' },
        //             { time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline' },
        //             { time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline' },
        //             { time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline' },
        //             { time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline' }
        //         ]
        //     )
        //     //setWaiting(false)
        //     setTdata(data)
        // }, 2000);
        //}
    }

    function renderFooter() {
        if (waiting) {
            return <ActivityIndicator />
        } else {
            return <Text>~</Text>
        }
    }

    function renderDetail(rowData, sectionID, rowID) {
        let title = <Text style={[styles.title]}>{rowData.title}</Text>
        var desc = null

        if (rowData.description)
            desc = (
                <View style={styles.descriptionContainer}>
                    <Image source={{ uri: rowData?.imageUrl[1] }} style={styles.image} />
                    <Text style={[styles.textDescription]}>{readText(rowData?.description)}</Text>
                </View>
            )

        return (
            <>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('MyMomentViewer', {
                            'param': rowData
                        })
                    }}
                >
                    <View style={{ flex: 1 }}>
                        {title}
                        {desc}
                    </View>
                </TouchableOpacity>
            </>
        )
    }

    return <Timeline
        data={tdata}
        circleColor='rgb(145,156,219)'
        lineColor='rgb(45,56,19)'
        timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13 }}
        descriptionStyle={{ color: 'gray' }}
        innerCircle={'icon'}

        options={{
            style: { paddingTop: 5 },
            refreshControl: (
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            ),
            renderFooter: renderFooter,
            onEndReached: onEndReached
        }}
        renderDetail={renderDetail}
    />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 65,
        backgroundColor: 'white'
    },
    list: {
        flex: 1,
        marginTop: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    descriptionContainer: {
        flexDirection: 'row',
        paddingRight: 50
    },
    image: {
        width: 50,
        height: 50,
    },
    textDescription: {
        marginLeft: 10,
        color: 'gray'
    }
});

export default MyDynamicListView