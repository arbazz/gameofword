import React from "react";
import {StyleSheet, Dimensions  } from "react-native";
import { TabView, SceneMap } from 'react-native-tab-view';
import Tab from './Tab'

const FirstRoute = () => (
  <Tab  title="easy" style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
  <Tab  title="medium" style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);
const ThirdRoute = () => (
  <Tab title="hard" style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);


export default class HighScore extends React.Component {
  constructor(props){
      super(props);
      this.state={
        index: 0,
    routes: [
      { key: 'first', title: 'Easy' },
      { key: 'second', title: 'Medium' },
      { key: 'third', title: 'Hard' },
    ],
        loading: true,
        scores: []
      }
      // console.log(this.state.index)
  }

  componentWillMount(){
    // axios.get('https://ancient-atoll-32230.herokuapp.com/game/getScore')
    // .then((response)=>{
    //   if(response.data){
    //     this.setState({
    //       scores: response.data,
    //       loading: false
    //     })

    //     console.log(response.data)
    //   }else{
    //     console.log("no response here")
    //   }
    // })
  }
  render() {
    return (
      <TabView
    navigationState={this.state}
    renderScene={SceneMap({
      first: FirstRoute,
      second: SecondRoute,
      third: ThirdRoute,
    })}
    onIndexChange={index => this.setState({ index })}
    initialLayout={{ width: Dimensions.get('window').width }}
  />
      // <View style={{ flex: 1, alignItems: "center", flexDirection: "column", marginTop: '25%',  }}>
          // <Text style={{fontSize: 23}}>HighScore</Text>
        //   {/* {!!loading && <View style={[styles.container, styles.horizontal]}>
        //  <ActivityIndicator size="large" color="#0000ff" />
        //  </View>}
        //  {!!!loading && <ScrollView>
        //   {scores.map((e)=>{
        //       return(
        //     <View key={Math.random()} style={{flexDirection: 'row',marginTop: 8,borderBottomColor: 'purple',borderBottomWidth: 1}}>
        //        <Text style={{padding: 8, fontSize: 17, marginRight: '8%',maxWidth: '30%',minWidth: '30%'}}>{e.name}</Text>
        //        <Text style={{padding: 8, fontSize: 17,marginLeft: '8%',maxWidth: '30%',minWidth: '30%'}}>{e.score}</Text>
        //     </View>
        //       )
        //   })}
        //   </ScrollView>}
        //   <View>
        //     <TouchableOpacity style={{ padding: 15, marginTop: 10, backgroundColor: 'orange'}} onPress={() => this.props.navigation.navigate('Dashboard')}>
        //       <Text style={{color: 'white'}}>Go back</Text>
        //     </TouchableOpacity>
        //   </View> */}
      // </View>
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
