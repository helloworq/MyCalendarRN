import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    RefreshControl,
    ActivityIndicator
} from 'react-native'
import Timeline from 'react-native-timeline-flatlist'

const datas = [
    { time: '09:00', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ' },
    { time: '10:45', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.' },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png') },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png') },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png') },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png') },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png') },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png') },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png') },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png') },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png') },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png') },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png') },
    { time: '12:00', title: 'Lunch', icon: require('../img/1.png') },
    { time: '14:00', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ' },
    { time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)' },
]

const MyDynamicListView = () => {
    const [refreshing, setRefreshing] = useState(false)
    const [waiting, setWaiting] = useState(false)
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
            setWaiting(true)

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
                setWaiting(false)
                setTdata(data)
            }, 2000);
        //}
    }

    function renderFooter() {
        if (waiting) {
            return <ActivityIndicator />;
        } else {
            return <Text>~</Text>;
        }
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
});

export default MyDynamicListView