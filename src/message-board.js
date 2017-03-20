import { createStore, combineReducers } from 'redux';
export const ONLINE = 'ONLINE';
export const AWAY = 'AWAY';
export const BUSY = 'BUSY';
export const OFFLINE = 'OFFLINE';
export const UPDATE_STATUS = 'UPDATE_STATUS';
export const CREATE_NEW_MESSAGE = 'CREATE_NEW_MESSAGE'
const defaultState = {
    // todos: [{
    //     text: 'Eat food',
    //     completed: true
    // }, {
    //     text: 'Exercise',
    //     completed: false
    // }],
    // visibilityFilter: 'SHOW_COMPLETED'
    messages: [{
        date: new Date('2017-03-17 10:10:14'),
        postedBy: 'Mahesh',
        content: 'I m new on Redux'
    }, {
        date: new Date('2017-03-17 10:12:14'),
        postedBy: 'Suresh',
        content: 'I m learning Redux'
    }, {
        date: new Date('2017-03-17 10:14:14'),
        postedBy: 'Mukesh',
        content: 'I will complete it very soon'
    }],
    userStatus: ONLINE
};
 // FIRST REDUCER
// const reducer = (state = defaultState, {type, value})=>{
//     switch (type){
//         case UPDATE_STATUS:
//         return {...state, userStatus:value};
//         break;
//     }
//     return state;
// };
const userStatusReducer = (state = defaultState.userStatus, { type, value }) => {
    switch (type) {
        case UPDATE_STATUS:
            return value;
            break;
    }
    return state;
};
const messageReducer = (state = defaultState.messages, { type, value, postedBy, date }) => {
    switch (type) {
        case CREATE_NEW_MESSAGE:
            const newState = [{ date, postedBy, content: value }, ...state];
            return newState;
    }
    return state;
};
const combinedReducer = combineReducers({
    userStatus: userStatusReducer,
    messages: messageReducer
});
const store = createStore(combinedReducer);

document.forms.newMessage.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = e.target.newMessage.value;
    const username = localStorage[`preferences`] ? JSON.parse(localStorage[`preferences`]).userName : 'JIM';
    store.dispatch(newMessageAction(value, username));
})
const render = () => {
    const { messages, userStatus } = store.getState();
    document.getElementById('messages').innerHTML = messages
        .sort((a, b) => {
            b.date - a.date
        }).map(message => (` <div>
        ${message.postedBy} : ${message.content}
        </div>
   `)).join("")
    document.forms.newMessage.fields.disabled = (userStatus === OFFLINE);
    document.forms.newMessage.newMessage.value = "";
};
const statusUpdateAction = (value) => {
    return {
        type: UPDATE_STATUS,
        value
    }
};
const newMessageAction = (content, postedBy) => {
    const date = new Date();
    return {
        type: CREATE_NEW_MESSAGE,
        value: content,
        postedBy,
        date
    }
};
document.forms.selectStatus.status.addEventListener('change', (e) => {
    store.dispatch(statusUpdateAction(e.target.value));
});
 render();

store.subscribe(render);



// function visibilityFilter(state = defaultState , action) {
//     if (action.type === 'SET_VISIBILITY_FILTER') {
//         return action.filter;
//     } else {
//         return state;
//     }
// }
//const store = createStore(visibilityFilter);
//store.subscribe(render);












// import {createStore} from 'redux';
//
// export const ONLINE = 'ONLINE';
// export const AWAY = 'AWAY';
// export const BUSY = 'BUSY';
// export const OFFLINE = 'OFFLINE';
//
// export const UPDATE_STATUS = 'UPDATE_STATUS';
//
// const defaultState = {
//     messages: [{
//         date: new Date('2017-03-17 10:10:14'),
//         postedBy: 'Mahesh',
//         content: 'I m new on Redux'
//     }, {
//         date: new Date('2017-03-17 10:12:14'),
//         postedBy: 'Suresh',
//         content: 'I m learning Redux'
//     }, {
//         date: new Date('2017-03-17 10:14:14'),
//         postedBy: 'Mukesh',
//         content: 'I will complete it very soon'
//     }],
//     userStatus: ONLINE
// };
//
// const reducer = (state = defaultState, {type, value})=>{
//     switch (type){
//         case UPDATE_STATUS:
//             return {...state, userStatus: value};
//             break;
//     }
//     return state;
// };
//
// const store = createStore(reducer);
//
// const render = ()=>{
//     const { messages, userStatus } = store.getState();
//     document.getElementById('messages').innerHTML = messages
//         .sort((a,b)=>b.date - a.date)
//         .map(message=>(
//             `<div>
//             ${message.postedBy}: ${message.content}
//             </div>`
//             )).join("");
//
//     document.forms.newMessage.fields.disabled = (userStatus === OFFLINE);
// };
//
// const statusUpdateAction = (value)=>{
//     return {
//         type: UPDATE_STATUS,
//         value
//     }
// };
//
// document.forms.selectStatus.status.addEventListener('change', (e)=>{
//     store.dispatch(statusUpdateAction(e.target.value));
// });
//
// render();
//
// store.subscribe(render);