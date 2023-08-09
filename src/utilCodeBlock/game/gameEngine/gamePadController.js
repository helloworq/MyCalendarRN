import { TouchableOpacity, Dimensions, View } from 'react-native';
const screen = Dimensions.get("window");


const GamepadController = ({ position, rotate }) => {
  const x = position[0]
  const y = position[1]
  return (
    <>
      <View>
        <TouchableOpacity>
        <View style={{
          left: x, top: y,
          borderRadius: 100, width: 100, height: 100,
          backgroundColor: 'black'
        }}></View>
        </TouchableOpacity>
      </View>
    </>
  )
};

export default GamepadController;