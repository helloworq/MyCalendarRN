import { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { Engine, Runner, Bodies, Composite } from 'matter-js';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const BOX_INIT_X = WINDOW_WIDTH / 2;
const BOX_INIT_Y = WINDOW_WIDTH / 2;
const BOX_SIZE = WINDOW_WIDTH / 5;
const GROUND_X = WINDOW_WIDTH / 2;
const GROUND_Y = WINDOW_HEIGHT;
const GROUND_HEIGHT = 100;

export default function AppMatterjs() {
  const [positionAX, setPositionAX] = useState(BOX_INIT_X)
  const [positionAY, setPositionAY] = useState(BOX_INIT_Y)
  const [positionBX, setPositionBX] = useState(BOX_INIT_X)
  const [positionBY, setPositionBY] = useState(BOX_INIT_Y)

  useEffect(() => {
    const engine = Engine.create(); // 创建物理引擎

    // 创建一个盒子物体
    const boxA = Bodies.rectangle(
      BOX_INIT_X,
      BOX_INIT_Y,
      BOX_SIZE,
      BOX_SIZE
    );
    const boxB = Bodies.rectangle(
      BOX_INIT_X + 10,
      BOX_INIT_Y + 10,
      BOX_SIZE,
      BOX_SIZE
    );

    // 创建地面
    const ground = Bodies.rectangle(
      GROUND_X,
      GROUND_Y,
      WINDOW_WIDTH,
      GROUND_HEIGHT,
      { isStatic: true }
    );

    // 把盒子和地面加入到物理引擎中
    Composite.add(engine.world, boxA);
    Composite.add(engine.world, boxB);
    Composite.add(engine.world, ground);

    // 运行物理引擎
    const runner = Runner.create();
    Runner.run(runner, engine);

    // 每隔 30 ms 获取物体的最新位置并绘制
    const timer = setInterval(() => {
      setPositionAX(boxA.position.x)
      setPositionAY(boxA.position.y) 
      setPositionBX(boxB.position.x)
      setPositionBY(boxB.position.y)
    }, 30)

    return () => {
      clearInterval(timer);
    };
  }, []);

  const boxAStyle = {
    position: 'absolute',
    left: positionAX - BOX_SIZE / 2, // 盒子的 x 轴位置
    top: positionAY - BOX_SIZE / 2, // 盒子的 y 轴位置
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: 'yellow'
  }

  const boxBStyle = {
    position: 'absolute',
    left: positionBX - BOX_SIZE / 2, // 盒子的 x 轴位置
    top: positionBY - BOX_SIZE / 2, // 盒子的 y 轴位置
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: 'green'
  }

  return (
    <>
      <View style={boxAStyle} />
      <View style={boxBStyle} />
    </>
  );
}
