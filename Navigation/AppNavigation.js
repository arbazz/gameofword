import Login from '../screens/Login'
import Difficulty from '../screens/Difficulty'
import Dashboard from '../screens/Dashboard'
import Game from '../screens/Game'
import HighScore from '../screens/HighScore'
import {  createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';


const MainNavigator = createStackNavigator({
    Home : {
        screen: Login,
        navigationOptions:{
            header: null
        }
    },
    Dashboard: {
        screen: Dashboard
    },
    Difficulty: {
        screen: Difficulty
    },
    Game: {
        screen:Game,
        navigationOptions:  {
            headerLeft: null
        }
    },
    HighScore:{
        screen: HighScore,
        navigationOptions:{
            title: 'Highscore'
        }
    }

})


const Navigator = createAppContainer(MainNavigator);
export default Navigator
