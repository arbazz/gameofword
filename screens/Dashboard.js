
import React from "react";
import { View, Text,TouchableOpacity } from "react-native";

export default class DashboardScreen extends React.Component {
  _isMounted = false;
  componentDidMount(){
  this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", flexDirection: "column", marginTop: '35%' }}>
        <TouchableOpacity  onPress={() => this.props.navigation.navigate('Difficulty')} style={{marginBottom: "15%", width: '50%', borderColor: "purple", borderWidth: 1,
         backgroundColor: "purple", color: "white", height: 45, justifyContent: 'center',}}>
            <Text style={{color: 'white',marginLeft: '41%'}}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginBottom: "15%", width: '50%', borderColor: "purple", borderWidth: 1,
         backgroundColor: "purple", color: "white", height: 45, justifyContent: 'center',}} onPress={() => this.props.navigation.navigate('HighScore')}>
            <Text style={{color: 'white',marginLeft: '33%'}}>Highscore</Text>
        </TouchableOpacity>
      </View>
    );
  }
}