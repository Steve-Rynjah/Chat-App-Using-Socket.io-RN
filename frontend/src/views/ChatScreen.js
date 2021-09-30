import React from 'react';
import SvgUri from 'react-native-svg-uri';
import { View, StatusBar, Image, StyleSheet} from 'react-native';
import {
  GiftedChat, 
  InputToolbar, 
  Send, 
  Composer,
  Bubble,
} from 'react-native-gifted-chat';
import { useSelector } from "react-redux";
import {useDispatch, useSelector} from 'react-redux';


const ChatScreen = ({route}) =>{ 
    const dispatch = useDispatch();
    const selfUser = useSelector(state => state.selfUser);
    const conversations = useSelector(state => state.conversations);
    const {userId} = route.params;
    const messages = conversations[userId].messages;

    const renderAvatar = (props) => {
      return (
        <SvgUri width="60" height="60" source={{ uri: `https://avatars.dicebear.com/v2/male/mike.svg` }} />
      )
    }

    const renderInputToolbar = (props) =>{
      return (
        <InputToolbar {...props} containerStyle={styles.inputContainer}/>
      )
    }

    const renderSendIcon = (props) =>{
      return (
        <Send {...props}>
            <Image
              source={require('../assets/icon.png')}
              style={styles.sendIcon}
            />
        </Send>
      )
    }

    const renderComposer = (props) =>{
      return (
        <Composer
          {...props}
          textInputStyle={styles.inputComposer}
          placeholder={"Messages..."}
        />
      )
    }

    

    const renderBubble = (props) =>{
      return (
        <Bubble
          {...props}
          textStyle={{
            right:{
              color: '#FFF'
            },
            left:{
              color: '#FFF'
            }
          }}
          wrapperStyle={{
            left:{
              backgroundColor: '#2f28f7'
            },
            right:{
              backgroundColor: '#30c6fc'
            }
          }}
        />
      )
    }
    
    return(
           <View style={{flex:1, backgroundColor: '#252252'}}>
             <StatusBar backgroundColor='#282534'/>
               <GiftedChat
                    placeholder="Messages..."
                    maxInputLength={50}
                    renderComposer={renderComposer}
                    renderUsernameOnMessage

                    renderBubble={renderBubble}
                    renderSend={renderSendIcon}
                    renderInputToolbar={renderInputToolbar}
                    messages={messages}
                    alwaysShowSend
                    
                    onSend={messages => {
                      dispatch({
                        type: "private_message", 
                        data: {message: messages[0], conversationId: userId}
                        })
                      dispatch({
                        type: "server/private_message",
                        data: {message: messages[0], conversationId: userId}
                      })  
                    }}
                      
                    user={{
                             _id: selfUser.userId,
                         }}  
                />
           </View>     
    )
}

const styles = StyleSheet.create({
  inputContainer:{
            height:45,
            marginTop:-3.5,
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 5,
            borderRadius: 50,

  },
  sendIcon:{
            width:30, 
            height: 30, 
            marginBottom:4.5, 
            marginRight:5,
  },
  inputComposer:{
            color:'#333',
            fontSize:17, 
            marginLeft:10,
            marginRight:10,
            marginBottom:2.5
  }
})

export default ChatScreen;