import React, { useState } from 'react';
import {loadData,getData} from './util/FileUtil'

import {
    StyleSheet,
    Text,
    View,
    RefreshControl,
    ActivityIndicator,
    Image
} from 'react-native'
import Timeline from 'react-native-timeline-flatlist'

const datas = [
    { time: '09:00', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ' },
    { time: '10:45', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.', imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg' },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png'), },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png') },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png') },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png') },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png') },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png') },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png') },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png') },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png') },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png') },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png'), imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg' },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png') },
    { time: '14:00', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ' },
    { time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)' },
]

const MyDynamicListView = () => {
    const [refreshing, setRefreshing] = useState(false)
    const [waiting, setWaiting] = useState(true)
    const [tdata, setTdata] = useState(datas)

    function onRefresh() {
        setRefreshing(true)
        //refresh to initial data
        setTimeout(() => {
            //refresh to initial data
            setTdata(datas)
            setRefreshing(false)
        }, 2000);
    }

    function onEndReached() {
        console.log("到达底部了")
        //if (!waiting) {
        //setWaiting(true)

        //fetch and concat data
        setTimeout(() => {
            //refresh to initial data
            var data = tdata.concat(
                [
                    { time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline' },
                    { time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline' },
                    { time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline' },
                    { time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline' },
                    { time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline' }
                ]
            )
            //setWaiting(false)
            setTdata(data)
        }, 2000);
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
                    <Image source={{ uri: rowData?.imageUrl }} style={styles.image} />
                    <Text style={[styles.textDescription]}>{rowData?.description}</Text>
                </View>
            )

        return (
            <View style={{ flex: 1 }}>
                {title}
                {desc}
            </View>
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