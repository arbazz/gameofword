import React from "react";
import { View, ActivityIndicator, Button ,TextInput,AsyncStorage,StyleSheet,Alert,Text} from "react-native";
import { StackActions, NavigationActions } from 'react-navigation'
import axios from 'axios';

export default class Login extends React.Component {
  constructor(){
    super();
    this.state={
      name: 'arbaz', 
      loading: false
    }
  }

 async navigate() {
  if(this.state.name !== ''){
    this.setState({
      loading: true
    })
  }else{
    Alert.alert(
      'login Fail',
      'please Type your username',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }
    const {name} = this.state;
    console.log(name)
    var obh ={ username: name}
    var exist = false;
  await  axios.get('https://ancient-atoll-32230.herokuapp.com/user/getAll', {
      params: {
       obh
      }
    })
    .then(function (response) {
      if(response.data){
        console.log(response.data);
        var data = response.data
        for (let i = 0; i< data.length; i++){
          if(data[i].username === name){
            console.log("already exist")
             exist = true;
          }
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    this.setState({loading: false})
    })
    .then(function () {
      // always executed
    });  
if(exist === false){
  console.log("does not ")
  axios.post('https://ancient-atoll-32230.herokuapp.com/user/add', {
    username: name
  })
  .then(function (response) {
    console.log(response);
    exist = true;
  })
  .catch(function (error) {
    this.setState({loading: false})
    console.log(error);
  });

}

if(exist === true){
 
  // this.props.navigation.navigate("Dashboard")
  try {
    await AsyncStorage.setItem('name', name);
  } catch (error) {
    // Error saving data
    console.log(error)
  }
  const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Dashboard' }),        
      ],
    });
    this.props.navigation.dispatch(resetAction);
  
  }
}

  handleText=(text)=>{
    console.log("from text". text)
    this.setState({
      name: text
    })
  }
  render() {
    const {loading} = this.state
    return (
      <View style={{flex: 1}}>
      {!!loading && <View style={[styles.container, styles.horizontal]}>
         <ActivityIndicator size="large" color="#0000ff" />
        <Text>Login in...</Text>
         </View>}
      {!!!loading && <View style={{ flex: 1, alignItems: "center", justifyContent: "center",flexDirection: "column",}}>
        <TextInput
        style={{ borderBottomColor: 'blue', borderBottomWidth: 2, marginBottom: 30,width: '70%' }}
            underlineColorAndroid = "transparent"
            placeholder = "Username"
            placeholderTextColor = "grey"
            autoCapitalize = "none"
            onChangeText = {(text) => this.setState({name: text})}
        />
        <Button 
        title="Sign In"
        color="#841584"
        onPress={this.navigate.bind(this)} />
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
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center'
  }
})
