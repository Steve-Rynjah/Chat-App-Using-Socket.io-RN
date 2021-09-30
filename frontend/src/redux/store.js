import {createStore, applyMiddleware} from 'redux'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'
import reducer from './reducer';
const socket = io("http://192.168.29.69:3001");
const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

store.subscribe(()=>{
    console.log("new state", store.getState())
})



export default store;

