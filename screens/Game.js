import React from "react";
import {ActivityIndicator,StyleSheet, View, Text,AsyncStorage,TextInput,TouchableOpacity } from "react-native";
// import { TextInput } from "react-native-gesture-handler";
import axios from 'axios'; 
import { StackActions, NavigationActions } from 'react-navigation';


export default class DashboardScreen extends React.Component {
  _isMounted = false;
  constructor(props){
      super(props);
      this.state={
        text: '',
        correct: false,
        score: 0,
        text: '',
        seconds: this.props.navigation.state.params.seconds,
        // seconds: 3,
        loading: true,
        gameOver: false,
        req: false,
        end: false,
        word: [],
        words: [],
        count: 0
      }
      this.tick = this.tick.bind(this);
      console.log(this.props.navigation.state.params)
  }

async componentDidMount(){
  this._isMounted = true;
  var words;
if(this.state.words.length === 0){
  await axios.get('https://ancient-atoll-32230.herokuapp.com/game/getword')
  .then(function (response) {
    words = response.data[0].commonWords
  })
  .catch((err=>{
    console.log(err)
  }))
  if(this._isMounted){
    this.setState({
      words: words,
      loading: false
    })
  }
}
var random_number = Math.floor(Math.random()*800); // generate random number between 0 and 999
if(this._isMounted){
  this.setState({
    word: this.state.words[random_number]
  })
}

this.timer = setInterval(this.tick, 1000)
  
 setTimeout(()=>{
   this.setState({
     correct: false
   })
 },700)
}

async tick(){
  if(this.state.seconds>0){
    this.setState({
      seconds: this.state.seconds - 1,
      count: this.state.count+1
    })
  }else{
    if(this._isMounted && this.state.count < this.props.navigation.state.params.seconds*5){
      // clearInterval(this.timer)
      var random_number = Math.floor(Math.random()*800); // generate random number between 0 and 99
      this.setState({
        seconds: this.props.navigation.state.params.seconds,
         word: this.state.words[random_number],
         text: ''
        })

    }
    console.log('count========>',this.state.count)
    if(this.state.count === this.props.navigation.state.params.seconds*5){
      this.setState({gameOver: true})
       clearInterval(this.timer)

    }
}
}

saveScore = async ()=>{
  const that =this
  const name = await AsyncStorage.getItem('name');
  if(this.state.req === false){
 await axios.post('https://ancient-atoll-32230.herokuapp.com/game/addScore', {
    name: name,
    score: this.state.score,
    difficulty: this.props.navigation.state.params.difficulty
  })
  .then(function (response) {
    if(this._isMounted){

      that.setState({
        req: true,
        loading: true,
        end: true
      })
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}
}


componentWillUnmount() {                       
  clearInterval(this.timer)
  this._isMounted = false;
}

handleText=(text)=>{
  this.setState({
    text
  })
    const rightAnswer = this.state.word
    if(rightAnswer === text){
        this.setState({
            correct: true,
            score: this.state.score+1+this.state.seconds,
            text: '',
            seconds: 0,
            count: this.state.count+this.state.seconds
        })
        // this.componentDidMount()
        // console.log("correct--man")
        console.log("score ======>",this.state.score)
    }
  }


  handleGameOverTap=()=>{
    this.saveScore();
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
    });
    this.props.navigation.dispatch(resetAction);
    // this.props.navigation.navigate('Difficulty')
  }
  render() {
      const {loading,correct,word,text,score,seconds,gameOver,end} = this.state
    return (
      <View style={{flex: 1}}>
         {!!loading && <View style={[styles.container, styles.horizontal]}>
         <ActivityIndicator size="large" color="#0000ff" />
         </View>}
         {!!gameOver && <View style={{marginTop: 40,flexDirection: 'column', justifyContent:"center", alignItems: 'center', alignContent:'center'}}>
          <Text style={{fontSize: 30, marginTop: 10}}>Game Over</Text>
          <TouchableOpacity style={{marginTop: 40, padding: 15, backgroundColor: 'blue', }}  onPress={this.handleGameOverTap}>
            <Text style={{color: 'white'}}> Play Again</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={{marginTop: 20, padding: 15, backgroundColor: 'green',color: 'white'}} >
            <Text style={{color: 'white'}}>Your score: {score}</Text>
          </TouchableOpacity>
         </View>}
        { !!!loading && !gameOver && !end &&
           <View style={{marginBottom:40, flexDirection: 'row',flex: 0.1,paddingTop: 3}}>
            <Text style={{fontSize: 17, color: 'green'}}>Score:{score}</Text>
            <Text style={{fontSize: 17, marginLeft: "30%",fontSize: 26}}>{seconds}</Text>
          </View>
        }
      {!!!loading && !gameOver && !end &&
      <View style={{ flex: 0.9, alignItems: "center", flexDirection: "column", marginTop: '2%',alignItems:"center" }}>
          <View style={{ borderColor: 'grey', borderWidth: 1,padding: 10, }}>
                <Text style={{fontSize: 21}}> {word}</Text>
          </View>
          <View style={{marginTop: '15%', width: '76%', alignItems:"center"}}>
          <TextInput style={{ height: 40,width: '76%', borderColor: 'gray', borderBottomWidth: 1, alignItems: 'center',padding: 10 }}
               underlineColorAndroid = "transparent"
               placeholder = "type word here"
               placeholderTextColor = "grey"
               autoCapitalize = "none"
               value= {text}
               onChangeText = {this.handleText}/>
          </View>
         {!!correct && <Text style={{marginTop: 5, color: 'green'}}>correct answer</Text>}
      </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
