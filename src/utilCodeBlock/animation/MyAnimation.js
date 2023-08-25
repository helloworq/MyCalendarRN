import { Button, View } from 'react-native';
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

const MyAnimation = () => {
    const width = useSharedValue(100);


    return (
        <>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Animated.View
                    style={{
                        width: width,
                        height: 100,
                        backgroundColor: 'violet',
                    }}
                />
                <Button onPress={() => {
                    width.value = withSpring(width.value + 50);
                }} title="Click me" />
            </View>
        </>
    )
}

export default MyAnimation