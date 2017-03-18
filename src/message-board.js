import {createStore} from 'redux';

const defaultState = {
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
    userStatus: 'ONLINE'
};

const store = createStore((state = defaultState)=>{
   return state;
});

const render = ()=>{
    const { messages, userStatus } = store.getState();
    document.getElementById('messages').innerHTML = messages
        .sort((a,b)=>b.date - a.date)
        .map(message=>(
            `<div>
            ${message.postedBy}: ${message.content}
            </div>`
            )).join("");
};

render();