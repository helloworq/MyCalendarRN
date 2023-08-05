import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Animated, Button } from "react-native";
import Pocker from "./Poker";
import FontAwesome from 'react-native-vector-icons/FontAwesome'


const BestGameEver = () => {
  const pokers = [
    "10_of_clubs", "10_of_diamonds", "10_of_hearts", "10_of_spades",
    "2_of_clubs", "2_of_diamonds", "2_of_hearts", "2_of_spades",
    "3_of_clubs", "3_of_diamonds", "3_of_hearts", "3_of_spades",
    "4_of_clubs", "4_of_diamonds", "4_of_hearts", "4_of_spades",
    "5_of_clubs", "5_of_diamonds", "5_of_hearts", "5_of_spades",
    "6_of_clubs", "6_of_diamonds", "6_of_hearts", "6_of_spades",
    "7_of_clubs", "7_of_diamonds", "7_of_hearts", "7_of_spades",
    "8_of_clubs", "8_of_diamonds", "8_of_hearts", "8_of_spades",
    "9_of_clubs", "9_of_diamonds", "9_of_hearts", "9_of_spades",
    "ace_of_clubs", "ace_of_diamonds", "ace_of_hearts", "ace_of_spades",
    "black_joker", "jack_of_clubs", "jack_of_diamonds",//"backface",
    "jack_of_hearts", "jack_of_spades", "king_of_clubs", "king_of_diamonds",
    "king_of_hearts", "king_of_spades", "queen_of_clubs", "queen_of_diamonds",
    "queen_of_hearts", "queen_of_spades", "red_joker",
  ]

  const size = 5
  const userA = 'userA'
  const userB = 'userB'
  const [pokerA, setPokerA] = useState()
  const [pokerB, setPokerB] = useState()
  const [restPoker, setRestPoker] = useState(pokers)
  const [trun, setTurn] = useState({})
  const [winner, setWinner] = useState()

  function getPokers(pokerNameList) {
    return pokerNameList?.map(e =>
      <Pocker poker={e} onPress={() => {
        const keys = Object.keys(trun)
        keys.forEach(ele => {
          let temp = trun[ele]
          temp[e] = 1
        })

        //此处功能，检测是不是最后一张牌被翻开，如果是则进入judag判断输赢
        const objs = Object.values(trun)
        if (objs != null && objs != undefined && objs.length > 0) {
          let temp = {}
          for (let i of objs) {
            Object.assign(temp, i)
          }
          const flags = Object.values(temp)
          const hasFront = flags.some(e => e === 0)
          if (!hasFront) {
             jdage()
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

  function jdage() {
    console.log(pokerA)
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
    // const trunTemp = trun
    // trunTemp[user] = randomPokers
    // setTurn(trunTemp)
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
          setRestPoker(pokers)
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