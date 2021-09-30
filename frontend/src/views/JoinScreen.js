import React, {useState} from 'react'
import { 
    View,  
    StatusBar,
    TextInput,
    Image,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import {useNavigation} from '@react-navigation/native'
import {useDispatch} from 'react-redux'

const {width, height} = Dimensions.get('window');
const COLORS = {primary: '#282534', white: '#fff'};

const JoinScreen = () =>{
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("")
    
    return(
        <View style={{flex:1, alignItems:'center', backgroundColor:'#1A1A1A'}}>
            <StatusBar backgroundColor={COLORS.primary} />
            <Image 
                source={require('../assets/CB_LOGO.png')} 
                style={{height: '75%', width, resizeMode: 'contain', marginTop: -125}}    
            />
            <View style={{
                borderWidth:1,
                borderTopColor: 'transparent', 
                borderBottomColor: COLORS.white,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent'
                }}>
                <TextInput
                    style={{color: COLORS.white, textAlign:'center', fontSize:20, marginTop:-25}}
                    value={username}
                    onChangeText={text => setUsername(text)}
                    placeholder="Enter Username"
                    maxLength={6}     
                />
            </View>
            <View style={{
                borderWidth:1,
                borderColor: COLORS.white,
                width:'50%',
                height:50,
                borderRadius:10,
                backgroundColor: 'transparent',
                marginTop:75

            }}>
                <TouchableOpacity onPress={()=> {
                        dispatch({type: "server/join", data: username});
                        navigation.replace("User")
                }}>
                    <Text style={{
                        color: COLORS.white,
                        alignSelf:'center',
                        fontSize:17,
                        fontWeight:'bold',
                        marginTop:10
                    }}>JOIN</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

export default JoinScreen;