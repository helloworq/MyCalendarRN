import React from 'react';
import {
    View,
    Text,
} from "react-native";
import DeviceInfo from 'react-native-device-info';

const MyDevice = () => {
    return (
        <>
            <View style={{ alignItems: 'center' }}>
                <Text>手机信息</Text>
                <Text>{DeviceInfo.getApplicationName()}</Text>
                <Text>{DeviceInfo.getBrand()}</Text>
                <Text>{DeviceInfo.getBundleId()}</Text>
                <Text>{DeviceInfo.getDeviceId()}</Text>
                <Text>{DeviceInfo.getDeviceType()}</Text>
                <Text>{DeviceInfo.getModel()}</Text>
                <Text>{DeviceInfo.getReadableVersion()}</Text>
                <Text>{DeviceInfo.getSystemName()}</Text>
                <Text>{DeviceInfo.getSystemVersion()}</Text>
                <Text>{DeviceInfo.getVersion()}</Text>
                <Text>{DeviceInfo.getCarrierSync()}</Text>
                <Text>{DeviceInfo.getBatteryLevelSync()}</Text>
                <Text>{DeviceInfo.getBootloaderSync()}</Text>
                <Text>{DeviceInfo.getBaseOsSync()}</Text>
                <Text>{DeviceInfo.getDeviceNameSync()}</Text>
                <Text>{DeviceInfo.getMacAddressSync()}</Text>
                <Text>{DeviceInfo.getIncrementalSync()}</Text>
                <Text>{DeviceInfo.getHostSync()}</Text>
                <Text>{DeviceInfo.isCameraPresentSync()}</Text>
                <Text>{DeviceInfo.isLocationEnabledSync()}</Text>
                <Text>{DeviceInfo.getApiLevelSync()}</Text>
                <Text>{DeviceInfo.getCodenameSync()}</Text>
                <Text>{DeviceInfo.getIpAddressSync()}</Text>
            </View>
        </>
    )
}

export default MyDevice