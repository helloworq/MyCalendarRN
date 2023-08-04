import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import Pocker from "./Poker";
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const pokers = [
  "10_of_clubs", "10_of_diamonds", "10_of_hearts", "10_of_spades", "2_of_clubs", "2_of_diamonds",
  "2_of_hearts", "2_of_spades", "3_of_clubs", "3_of_diamonds", "3_of_hearts", "3_of_spades",
  "4_of_clubs", "4_of_diamonds", "4_of_hearts", "4_of_spades", "5_of_clubs", "5_of_diamonds",
  "5_of_hearts", "5_of_spades", "6_of_clubs", "6_of_diamonds", "6_of_hearts", "6_of_spades",
  "7_of_clubs", "7_of_diamonds", "7_of_hearts", "7_of_spades", "8_of_clubs", "8_of_diamonds",
  "8_of_hearts", "8_of_spades", "9_of_clubs", "9_of_diamonds", "9_of_hearts", "9_of_spades",
  "ace_of_clubs", "ace_of_diamonds", "ace_of_hearts", "ace_of_spades", "backface", "black_joker",
  "jack_of_clubs", "jack_of_diamonds", "jack_of_hearts", "jack_of_spades", "king_of_clubs", "king_of_diamonds",
  "king_of_hearts", "king_of_spades", "queen_of_clubs", "queen_of_diamonds", "queen_of_hearts",
  "queen_of_spades", "red_joker",
]

const BestGameEver = () => {
  const engine = useRef(null)

  // {rotateX: '180deg'}, //horizontally
  // {rotateY: '180deg'} //vertically
  // {scaleX: -1} //horizontally
  // {scaleY: -1} //vertically

  return (<>
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Pocker poker={pokers[Math.floor(Math.random() * pokers.length)]} />
        <Pocker poker={pokers[Math.floor(Math.random() * pokers.length)]} />
        <Pocker poker={pokers[Math.floor(Math.random() * pokers.length)]} />
        <Pocker poker={pokers[Math.floor(Math.random() * pokers.length)]} />
        <Pocker poker={pokers[Math.floor(Math.random() * pokers.length)]} />
      </View>
      <View style={{ flex: 5 }}></View>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Pocker poker={pokers[Math.floor(Math.random() * pokers.length)]} />
        <Pocker poker={pokers[Math.floor(Math.random() * pokers.length)]} />
        <Pocker poker={pokers[Math.floor(Math.random() * pokers.length)]} />
        <Pocker poker={pokers[Math.floor(Math.random() * pokers.length)]} />
        <Pocker poker={pokers[Math.floor(Math.random() * pokers.length)]} />
      </View>
    </View>
  </>
  );
}


export default BestGameEver