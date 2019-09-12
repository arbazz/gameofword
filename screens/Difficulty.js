import React from "react";
import { View, Text,TouchableOpacity } from "react-native";

export default class Difficulty extends React.Component {
  
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", flexDirection: "column", marginTop: '31%' }}>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('Game',{seconds: 15,difficulty: 'easy'})} style={{marginBottom: "15%", width: '50%', borderColor: "purple", 
         backgroundColor: "green", color: "white", height: 45, justifyContent: 'center',}}>
            <Text style={{color: 'white',marginLeft: '41%'}}>Easy</Text>
        </TouchableOpacity>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('Game',{seconds: 10,difficulty: 'medium'})} style={{marginBottom: "15%", width: '50%', borderColor: "purple",
         backgroundColor: "orange", color: "white", height: 45, justifyContent: 'center',}}>
            <Text style={{color: 'white',marginLeft: '41%'}}>Medium</Text>
        </TouchableOpacity>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('Game',{seconds: 5,difficulty: 'hard'})} style={{marginBottom: "15%", width: '50%', borderColor: "purple", 
         backgroundColor: "red", color: "white", height: 45, justifyContent: 'center',}}>
            <Text style={{color: 'white',marginLeft: '41%'}}>Hard</Text>
        </TouchableOpacity>
      </View>
    );
  }
}