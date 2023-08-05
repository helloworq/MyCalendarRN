import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Animated, Button } from "react-native";
import Pocker from "./Poker";
import FontAwesome from 'react-native-vector-icons/FontAwesome'


const BestGameEver = () => {
  //name score
  const pokers = {
    "10_of_clubs": { "score": 10 },
    "10_of_diamonds": { "score": 10 },
    "10_of_hearts": { "score": 10 },
    "10_of_spades": { "score": 10 },
    "2_of_clubs": { "score": 2 },
    "2_of_diamonds": { "score": 2 },
    "2_of_hearts": { "score": 2 },
    "2_of_spades": { "score": 2 },
    "3_of_clubs": { "score": 3 },
    "3_of_diamonds": { "score": 3 },
    "3_of_hearts": { "score": 3 },
    "3_of_spades": { "score": 3 },
    "4_of_clubs": { "score": 4 },
    "4_of_diamonds": { "score": 4 },
    "4_of_hearts": { "score": 4 },
    "4_of_spades": { "score": 4 },
    "5_of_clubs": { "score": 5 },
    "5_of_diamonds": { "score": 5 },
    "5_of_hearts": { "score": 5 },
    "5_of_spades": { "score": 5 },
    "6_of_clubs": { "score": 6 },
    "6_of_diamonds": { "score": 6 },
    "6_of_hearts": { "score": 6 },
    "6_of_spades": { "score": 6 },
    "7_of_clubs": { "score": 7 },
    "7_of_diamonds": { "score": 7 },
    "7_of_hearts": { "score": 7 },
    "7_of_spades": { "score": 7 },
    "8_of_clubs": { "score": 8 },
    "8_of_diamonds": { "score": 8 },
    "8_of_hearts": { "score": 8 },
    "8_of_spades": { "score": 8 },
    "9_of_clubs": { "score": 9 },
    "9_of_diamonds": { "score": 9 },
    "9_of_hearts": { "score": 9 },
    "9_of_spades": { "score": 9 },
    "ace_of_clubs": { "score": 1 },
    "ace_of_diamonds": { "score": 1 },
    "ace_of_hearts": { "score": 1 },
    "ace_of_spades": { "score": 1 },
    //"backface": { "score": 0 },
    "black_joker": { "score": 10 },
    "jack_of_clubs": { "score": 10 },
    "jack_of_diamonds": { "score": 10 },
    "jack_of_hearts": { "score": 10 },
    "jack_of_spades": { "score": 10 },
    "king_of_clubs": { "score": 10 },
    "king_of_diamonds": { "score": 10 },
    "king_of_hearts": { "score": 10 },
    "king_of_spades": { "score": 10 },
    "queen_of_clubs": { "score": 10 },
    "queen_of_diamonds": { "score": 10 },
    "queen_of_hearts": { "score": 10 },
    "queen_of_spades": { "score": 10 },
    "red_joker": { "score": 10 },
  }
  //name score
  // const pokers = [
  //   "10_of_clubs", "10_of_diamonds", "10_of_hearts", "10_of_spades",
  //   "2_of_clubs", "2_of_diamonds", "2_of_hearts", "2_of_spades",
  //   "3_of_clubs", "3_of_diamonds", "3_of_hearts", "3_of_spades",
  //   "4_of_clubs", "4_of_diamonds", "4_of_hearts", "4_of_spades",
  //   "5_of_clubs", "5_of_diamonds", "5_of_hearts", "5_of_spades",
  //   "6_of_clubs", "6_of_diamonds", "6_of_hearts", "6_of_spades",
  //   "7_of_clubs", "7_of_diamonds", "7_of_hearts", "7_of_spades",
  //   "8_of_clubs", "8_of_diamonds", "8_of_hearts", "8_of_spades",
  //   "9_of_clubs", "9_of_diamonds", "9_of_hearts", "9_of_spades",
  //   "ace_of_clubs", "ace_of_diamonds", "ace_of_hearts", "ace_of_spades",
  //   "black_joker", "jack_of_clubs", "jack_of_diamonds",//"backface",
  //   "jack_of_hearts", "jack_of_spades", "king_of_clubs", "king_of_diamonds",
  //   "king_of_hearts", "king_of_spades", "queen_of_clubs", "queen_of_diamonds",
  //   "queen_of_hearts", "queen_of_spades", "red_joker",
  // ]

  const size = 5
  const userA = 'userA'
  const userB = 'userB'
  const [pokerA, setPokerA] = useState()
  const [pokerB, setPokerB] = useState()
  const [restPoker, setRestPoker] = useState(Object.keys(pokers))
  const [trun, setTurn] = useState({})
  const [winner, setWinner] = useState()

  function getPokers(pokerNameList) {
    return pokerNameList?.map(e =>
      <Pocker poker={e} onPress={() => {
        const keys = Object.keys(trun)
        keys.forEach(ele => {
          let temp = trun[ele]
          let poker = temp[e]
          if (poker != null && poker != undefined) {
            temp[e] = 1
          }
        })
        //此处功能，检测是不是最后一张牌被翻开，如果是则进入judag判断输赢
        const objs = JSON.parse(JSON.stringify(Object.values(trun)))
        if (objs != null && objs != undefined && objs.length > 0) {
          console.log("进入")
          let temp = {}
          for (let i of objs) {
            Object.assign(temp, i)
          }
          const flags = Object.values(temp)
          const hasFront = flags.some(e => e === 0)
          if (!hasFront) {
            console.log("***", trun)
            juageWinner(trun)
          }
        }
      }} />
    )
  }

  function buildTurn(user, pockerNameList) {
    let temp = {}
    for (let i of pockerNameList) {
      temp[i] = 0
    }

    const trunTemp = trun
    trunTemp[user] = temp
    setTurn(trunTemp)
  }

  function juageWinner(data) {
    const users = Object.keys(data)
    if (users.length < 2) {
      return
    }
    const userA = users[0]
    const userB = users[1]

    let userAScore = Object.keys(data[userA]).map(e => pokers[e]['score'])
    let userBScore = Object.keys(data[userB]).map(e => pokers[e]['score'])

    console.log(userA, userAScore)
    console.log(userB, userBScore)

    let resUserAScore = jdage(userAScore)
    let resUserBScore = jdage(userBScore)
    console.log(userA, userAScore, resUserAScore)
    console.log(userB, userBScore, resUserBScore)

    if (resUserAScore === resUserBScore) {
      setWinner("平局")
    } else if (resUserAScore > resUserBScore) {
      setWinner("A 胜")
    } else {
      setWinner("B 胜")
    }

  }

  function jdage(data) {
    const ava2 = [
      [1, 9],
      [2, 8],
      [3, 7],
      [4, 6],
      [5, 5],
    ]

    const ava3 = [
      [1, 1, 8],
      [1, 2, 7],
      [1, 3, 6],
      [1, 4, 5],
      [2, 2, 6],
      [2, 3, 5],
      [2, 4, 4],
      [3, 3, 4],
      [5, 6, 9],
      [5, 7, 8],
      [6, 7, 7],
      [6, 6, 8],
      [7, 4, 9],
      [8, 9, 3],
      [8, 8, 4],
      [9, 9, 2],
    ]

    //随机生成数据
    //let data = [4, 3, 4, 5, 8]
    // let data = []
    // for (let i = 0; i < 5; i++) {
    //   data.push(Math.floor(Math.random() * 9) + 1)//floor 从1-13，不取0
    // }
    console.log(data)
    data.sort()
    //遇到大于等于10的就不计算处理,最多三张牌合成10可计入.
    //先去掉大于10的
    let noPlus10 = data.filter(e => e < 10)
    //如果一个元素都没有,则为牛牛
    if (noPlus10.length === 0) return 100
    //如果只有一个,两个元素，直接计算取余后的结果
    if (noPlus10.length === 1) return (noPlus10[0])
    if (noPlus10.length === 2) {
      let res = noPlus10[0] + noPlus10[1]
      if (res < 10) {
        return res
      } if (res > 10) {
        if (res % 10 === 0) {
          return 100
        } else {
          return res % 10
        }
      }
      return ((noPlus10[0] + noPlus10[1])) % 10
    }
    if (noPlus10.length === 3) {
      if (noPlus10.reduce((a, b) => a + b) % 10 === 0) return 100
      for (let i = 0; i < ava2.length; i++) {
        const left = ava2[i][0]
        const right = ava2[i][1]
        if (equals(noPlus10, ava2[i])) {
          removeFirst(noPlus10, left)
          removeFirst(noPlus10, right)
          return noPlus10[0]
        }
      }
      return 0
    }
    if (noPlus10.length === 4) {
      //判断二个数字能成牛情况
      for (let i = 0; i < ava2.length; i++) {
        const left = ava2[i][0]
        const right = ava2[i][1]
        if (equals(noPlus10, ava2[i])) {
          removeFirst(noPlus10, left)
          removeFirst(noPlus10, right)
          const cal = noPlus10[0] + noPlus10[1]
          console.log("nm", cal, noPlus10)
          if (cal % 10 === 0) {
            return 100
          } else {
            return cal > 10 ? cal % 10 : cal
          }
        }
      }
      //判断三个数字能成牛情况
      for (let i = 0; i < ava3.length; i++) {
        const left = ava3[i][0]
        const center = ava3[i][1]
        const right = ava3[i][2]
        if (equals(noPlus10, ava3[i])) {
          removeFirst(noPlus10, left)
          removeFirst(noPlus10, center)
          removeFirst(noPlus10, right)
          if (noPlus10[0] % 10 === 0) {
            return 100
          } else {
            return noPlus10[0] % 10
          }
        }
      }
    }
    if (noPlus10.length === 5) {
      //两个能合10的情况
      let newData = JSON.parse(JSON.stringify(noPlus10))
      const r = equalsV2(newData, ava2)
      if (r != null && r != undefined)
        return r
      //五张都没10的情况，先判断有无3个能合成10的情况，如果这都没有则直接无牛
      for (let i = 0; i < ava3.length; i++) {
        const left = ava3[i][0]
        const center = ava3[i][1]
        const right = ava3[i][2]

        if (equals(noPlus10, ava3[i])) {
          removeFirst(noPlus10, left)
          removeFirst(noPlus10, center)
          removeFirst(noPlus10, right)
          const cal = noPlus10[0] + noPlus10[1]
          if (cal % 10 === 0) {
            return 100
          } else {
            return cal > 10 ? cal % 10 : cal
          }
        }
      }
    }

  }

  function removeFirst(arr, ele) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === ele) {
        arr.splice(i, 1)
        break
      }
    }
    return arr
  }

  function equals(data, compared) {
    //判断compared是不是data的全等子集
    // let a = [1, 2, 2, 2]
    // let b = [1, 2, 3]  //不变的
    let a = JSON.parse(JSON.stringify(data))
    let b = compared  //不变的
    let flag = true;
    for (let i = 0; i < b.length; i++) {
      if (a.includes(b[i])) {
        a = removeFirst(a, b[i])
      } else {
        flag = false
      }
    }
    return flag
  }

  //判断两次是否全等
  function equalsV2(data, compared) {
    //判断compared是不是data的全等子集
    // let a = [1, 2, 2, 2, 3]
    // let b = [ [1,9],[2,8] ]  //不变的
    let flag = false
    for (let i = 0; i < compared.length; i++) {
      const temp = compared[i]
      const f = equals(data, temp)
      if (f) {
        removeFirst(data, temp[0])
        removeFirst(data, temp[1])
        for (let j = 0; j < compared.length; j++) {
          const temp = compared[j]
          const f2 = equals(data, temp)
          if (f2) {
            flag = true
            removeFirst(data, temp[0])
            removeFirst(data, temp[1])
            return data
          }
        }
      }
    }
    return null
  }

  function dispatchPoker(receiver, user) {
    //receiver => 实际接受发牌的回调方法
    receiver([])

    let randomPokers = []
    let temp = restPoker;
    for (let index = 0; index < size; index++) {
      const randomIndex = Math.floor(Math.random() * temp.length)
      const element = temp[randomIndex]
      randomPokers.push(element)
      temp.splice(randomIndex, 1)//随机获取到的卡牌从原数组剔除
    }
    setRestPoker(temp)//设置剩余卡牌信息
    //设置本轮数据
    buildTurn(user, randomPokers)
    setTimeout(() => {
      receiver(getPokers(randomPokers))
    }, 1000)
  }

  return (<>
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {pokerA}
      </View>
      <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
        <Button title="A发牌" onPress={() => {
          dispatchPoker((pokers) => setPokerA(pokers), userA)
        }} />
        <Button title="B发牌" onPress={() => {
          dispatchPoker((pokers) => setPokerB(pokers), userB)
        }} />
        <Button title="重置" onPress={() => {
          setRestPoker(Object.keys(pokers))
          console.log(">>>>>>>", jdage([1, 10, 10, 2, 8]))
        }} />
        <Text>{restPoker.length}</Text>
        <Text>{winner}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {pokerB}
      </View>
    </View>
  </>
  );
}

export default BestGameEver