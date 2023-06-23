import React, { useState } from 'react';
import { Image } from 'react-native'
import Timeline from 'react-native-timeline-flatlist'

const datas = [
    { time: '09:00', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ', lineColor: '#009688', },
    { time: '10:45', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.', },
    {
        time: '12:00', title: 'Custom rendered icon', icon: <Image
            style={{ width: 20, height: 20 }}
            source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
    },
    { time: '14:00', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ', circleColor: 'red', lineColor: '#001688' },
    { time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)' }
]

const MyTimelineListView = () => {
    return <Timeline
        data={datas}
        circleColor='rgb(145,156,219)'
        lineColor='rgb(45,56,19)'
        timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13 }}
        descriptionStyle={{ color: 'gray' }}
        options={{
            style: { paddingTop: 5 }
        }}
        innerCircle={'icon'}
    />
}

export default MyTimelineListView