import { React, useState, useEffect } from 'react'
import { Text, View, } from 'react-native'
import ImageCropPicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MyContritutionGraph from './MyContributionGraph';
import RNFS from 'react-native-fs'
import { loadFolder } from './util/FileUtil'

const MyImagePicker = ({ navigation }) => {
    const [contributionGraphData, setContributionGraphData] = useState([{}])

    useEffect(() => {
        let res = []
        loadFolder().then((dirs) => {
            const length = dirs.length
            let count = 0
            for (let i = 0; i < length; i++) {
                let element = dirs[i]
                let temp = {}
                temp['date'] = element.name
                RNFS.readdir(element.path).then((r) => {
                    count = count + 1
                    temp['count'] = r.length
                    res.push(temp)
                    if (count === length) {
                        setContributionGraphData(res)
                    }
                })
            }
        })
    }, [])

    return (
        <>
            <View style={{ flex: 1, flexDirection: 'column' }}>

                <View style={{ flex: 2, flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <FontAwesome onPress={() => {
                            ImageCropPicker.openPicker({ multiple: true })
                                .then(images => {
                                    navigation.navigate('MyMomentUploader', {
                                        'datas': images
                                    })
                                })
                        }} name="upload" size={100} color="#110" />
                        <Text>UP</Text>
                    </View>


                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <FontAwesome onPress={() => {
                            navigation.navigate('Calendar')
                        }} name="list-alt" size={100} color="#110" />
                        <Text>轨迹</Text>
                    </View>
                </View>

                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <MyContritutionGraph data={contributionGraphData} />
                </View>
            </View>
        </>
    )
}
export default MyImagePicker