import { React, useState } from 'react'
import { PermissionsAndroid, Platform, Text, View, Button } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker';

const MyImagePicker = () => {
    // You can also use as a promise without 'callback':
    return (
        <>
            <Button title='打开相册' onClick={() =>
                launchImageLibrary('library', {
                    selectionLimit: 1,
                    mediaType: 'photo',
                    includeBase64: false,
                })} />
        </>
    )
}
export default MyImagePicker