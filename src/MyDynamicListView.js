import React, { useState, useEffect } from 'react';
import { loadData } from './util/FileUtil'
import RNFS from 'react-native-fs'

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

const MyDynamicListView = ({ route, navigation }) => {
    const { param } = route.params

    const [refreshing, setRefreshing] = useState(false)
    const [waiting, setWaiting] = useState(true)
    const [tdata, setTdata] = useState()
    const [initData, setInitData] = useState(false)

    useEffect(() => {
        loadData(param).then((r) => {
            let count = 0
            for (let i = 0; i < r.length; i++) {
                RNFS.readFile(r[i]['dataPath'])
                    .then((t) => {
                        t = JSON.parse(t)
                        r[i]['description'] = t.moment
                        r[i]['tags'] = t.tags
                        count = count + 1
                        if (count === r.length) {
                            setTdata(r)
                        }
                    })
            }
        })
        //将description的路径转为文件内数据
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

    function renderFooter() {
        if (waiting) {
            return <ActivityIndicator />
        } else {
            return <Text>~</Text>
        }
    }

    function renderDetail(rowData, sectionID, rowID) {
        var desc = null

        if (rowData.description)
            desc = (
                <View style={styles.descriptionContainer}>
                    <Image source={{ uri: rowData?.imageUrl[0] }} style={styles.image} />
                    <Text style={[styles.textDescription]}>{rowData?.description}</Text>
                </View>
            )

        return (
            <>
                <TouchableOpacity style={{ marginBottom: 35 }}
                    onPress={() => {
                        navigation.navigate('MyMomentViewer', {
                            'param': rowData,
                        })
                    }}
                >
                    <View style={{ flex: 1 }}>
                        {desc}
                    </View>
                </TouchableOpacity>
            </>
        )
    }

    return <Timeline
        style={styles.container}
        data={tdata}
        circleColor='rgba(0,0,0,0)'
        lineColor='#bebebe'
        timeStyle={{ textAlign: 'center', backgroundColor: '#f6f7e5', color: 'black', padding: 5, borderRadius: 13 }}
        //descriptionStyle={{ color: 'gray' }}
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
        }}
        renderDetail={renderDetail}
    />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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