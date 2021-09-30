import React, {useState, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Provider} from 'react-redux'
import store from './redux/store';

import OnBoardingScreen from './views/OnBoardingScreen';
import JoinScreen from './views/JoinScreen';
import UserList from './views/UserList';
import ChatScreen from './views/ChatScreen';

const App = () =>{
    const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);

    useEffect(async()=>{
        const appData = await AsyncStorage.getItem('isAppFirstLaunched')
        if(appData === null){
            setIsAppFirstLaunched(true)
            AsyncStorage.setItem('isAppFirstLaunched', 'false')
        } else {
            setIsAppFirstLaunched(false)
        }
    },[])

    const Stack = createStackNavigator();

    return(
        isAppFirstLaunched !== null && (
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator>
                        {isAppFirstLaunched && <Stack.Screen name="OnBoarding" component={OnBoardingScreen} options={{headerShown:false}}/>}
                        <Stack.Screen name="Join" component={JoinScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="User" component={UserList} options={{headerShown: false}}/>
                        <Stack.Screen name="Chat" component={ChatScreen} options={({route})=> ({title: route.params.name})}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        )
    )
}

export default App;

