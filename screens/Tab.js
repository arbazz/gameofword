import React from "react";
import { View, Text,TouchableOpacity,ScrollView,ActivityIndicator,StyleSheet, Dimensions  } from "react-native";
import axios from 'axios';



export default class Tab extends React.Component {
    constructor(props){
        super(props);
        this.state={
          index: 0,
      routes: [
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
        { key: 'third', title: 'third' },
      ],
          loading: true,
          scores: []
        }
    }
  
    componentWillMount(){
      axios.get('https://ancient-atoll-32230.herokuapp.com/game/getScore')
      .then((response)=>{
        if(response.data){
          this.setState({
            scores: response.data,
            loading: false
          })
  
          console.log(response.data)
        }else{
          console.log("no response here")
        }
      })
    }
    render() {
        const {scores,loading} =this.state
        const difficulty = this.props.title
      return (
       
        <View style={{ flex: 1, alignItems: "center", flexDirection: "column", marginTop: '25%',  }}>
            <Text style={{fontSize: 23}}>{this.props.title}</Text>
            {!!loading && <View style={[styles.container, styles.horizontal]}>
           <ActivityIndicator size="large" color="#0000ff" />
           </View>}
           {!!!loading && <ScrollView>
            {scores.length && scores.map((e)=>{
               return e.difficulty === difficulty ?
              <View key={Math.random()+difficulty} style={{flexDirection: 'row',marginTop: 8,borderBottomColor: 'purple',borderBottomWidth: 1}}>
                 <Text style={{padding: 8, fontSize: 17, marginRight: '8%',maxWidth: '30%',minWidth: '30%'}}>{e.name}</Text>
                 <Text style={{padding: 8, fontSize: 17,marginLeft: '8%',maxWidth: '30%',minWidth: '30%'}}>{e.score}</Text>
              </View>
              :
              null
            //   <Text key={Math.random()+difficulty} style={{justifyContent: 'center'}}>No Score</Text>
                
            })}
            </ScrollView>}
            <View>
              {/* <TouchableOpacity style={{ padding: 15, marginTop: 10, backgroundColor: 'orange'}} onPress={() => this.props.navigation.navigate('Dashboard')}>
                <Text style={{color: 'white'}}>Go back</Text>
              </TouchableOpacity> */}
            </View>
        </View>
      );
    }
  }
  
  
  const styles = StyleSheet.create({
    scene: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    }
  })