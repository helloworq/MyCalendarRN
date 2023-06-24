import { React, useState } from 'react'
import { Text, View, } from 'react-native'
import ImageCropPicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ContritutionGraph from './utilCodeBlock/ContributionGraph';

const MyImagePicker = ({ navigation }) => {
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
                    <ContritutionGraph />
                </View>
            </View>
        </>
    )
}
export default MyImagePicker