import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Timeline from 'react-native-timeline-flatlist'

const datas = [
    {
        time: '09:00',
        title: 'Archery Training',
        description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
        //lineColor: '#009688',
        //icon: <FontAwesome name="check" size={26} />,
        imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
    },
    {
        time: '10:45',
        title: 'Play Badminton',
        description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
        //icon: <FontAwesome name="trash" size={30} color="#900" />,
        imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg'
    },
    {
        time: '12:00',
        title: 'Lunch',
        //icon: <FontAwesome name="user-circle" size={30} color="#900" />,
    },
    {
        time: '14:00',
        title: 'Watch Soccer',
        description: 'Team sport played between two teams of eleven players with a spherical ball. ',
        //lineColor: '#009688',
        //icon: <FontAwesome name="image" size={30} color="#900" />,
        imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg'
    },
    {
        time: '16:30',
        title: 'Go to Fitness center',
        description: 'Look out for the Best Gym & Fitness Centers around me :)',
        //icon: <FontAwesome name="edit" size={30} color="#900" />,
        imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
    },
    {
        time: '16:30',
        title: 'Go to Fitness center',
        description: 'Look out for the Best Gym & Fitness Centers around me :)',
        //icon: <FontAwesome name="calendar-o" size={30} color="#900" />,
        imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
    },
    {
        time: '16:30',
        title: 'Go to Fitness center',
        description: 'Look out for the Best Gym & Fitness Centers around me :)',
        //icon: <FontAwesome name="file-photo-o" size={30} color="#900" />,
        imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
    }
]

const MyImageListView = () => {
    const [tdata, setTdata] = useState(datas)
    const [selected, setSelected] = useState(null)

    function onEventPress(data) {
        setSelected(data)
    }

    function renderSelected() {
        if (selected)
            return <Text style={{ marginTop: 10 }}>Selected event: {selected?.title} at {selected?.time}</Text>
    }

    function renderDetail(rowData, sectionID, rowID) {
        let title = <Text style={[styles.title]}>{rowData.title}</Text>
        var desc = null
        if (rowData.description && rowData.imageUrl)
            desc = (
                <View style={styles.descriptionContainer}>
                    <Image source={{ uri: rowData?.imageUrl }} style={styles.image} />
                    <Text style={[styles.textDescription]}>{rowData.description}</Text>
                </View>
            )

        return (
            <View style={{ flex: 1 }}>
                {title}
                {desc}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {renderSelected()}
            <Timeline
                style={styles.list}
                data={tdata}
                circleSize={30}
                circleColor='rgba(0,0,0,0)'
                iconStyle={{opacity:1}}
                lineColor='#bebebe'
                timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
                timeStyle={{ textAlign: 'center', backgroundColor: '#f6f7e5', color: 'black', padding: 5, borderRadius: 13 }}
                descriptionStyle={{ color: 'gray' }}
                innerCircle={'icon'}
                onEventPress={onEventPress}
                renderDetail={renderDetail}
                separator={false}
                detailContainerStyle={{ marginBottom: 20, paddingLeft: 5, paddingRight: 5, backgroundColor: "#ffffff", borderRadius: 10 }}
                columnFormat='single-column-left'
            />
        </View>
    );
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
        borderRadius: 25
    },
    textDescription: {
        marginLeft: 10,
        color: 'gray'
    }
});

export default MyImageListView