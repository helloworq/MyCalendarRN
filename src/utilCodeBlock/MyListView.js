import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Timeline from 'react-native-timeline-flatlist'

//const data = 

const MyListView = () => {
    const [data,setData] = useState(
        [
            {
                time: '09:00',
                title: 'Archery Training',
                description: 'The Beginner Archery be provided for the course. ',
                imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
            },
            {
                time: '09:00',
                title: 'Archery Training',
                description: 'The Beginner Archery be provided for the course. ',
                imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
            },
            {
                time: '09:00',
                title: 'Archery Training',
                description: 'The Beginner Archery be provided for the course. ',
                imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
            },
            {
                time: '09:00',
                title: 'Archery Training',
                description: 'The Beginner Archery be provided for the course. ',
                imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
            },
            {
                time: '09:00',
                title: 'Archery Training',
                description: 'The Beginner Archery be provided for the course. ',
                imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
            },
            {
                time: '09:00',
                title: 'Archery Training',
                description: 'The Beginner Archery be provided for the course. ',
                imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
            },
            {
                time: '09:00',
                title: 'Archery Training',
                description: 'The Beginner Archery be provided for the course. ',
                imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
            },
            {
                time: '09:00',
                title: 'Archery Training',
                description: 'The Beginner Archery be provided for the course. ',
                imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
            },
            {
                time: '09:00',
                title: 'Archery Training',
                description: 'The Beginner Archery be provided for the course. ',
                imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
            },
        ]
    )

    return (
        <>
            <View style={{ alignItems: 'center' }}>
                <FlatList
                    numColumns={1}
                    onEndReached={()=>{
                        setData(data.concat(data))
                        console.log(data.length,)
                    }}
                    data={data}
                    renderItem={(row) => {
                        return (
                            <View style={{ alignItems: 'center', marginTop: 10, backgroundColor: 'green', borderRadius: 10 }}>
                                <Text>{row.item.time}</Text>
                                <Text>{row.item.title}</Text>
                                <Text>{row.item.description}</Text>
                                <Text>{row.item.time}</Text>
                                <Text>{row.item.title}</Text>
                                <Text>{row.item.description}</Text>
                            </View>
                        )
                    }}
                />
            </View>
        </>
    )
}

export default MyListView