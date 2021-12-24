const socket = io('http://localhost:8000')

const form = document.getElementById('send-container');
const messageInput = document.getElementById('msgInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('ting.mp3');

const append = (message, position)=>{
    const msgElement=document.createElement('div');
    msgElement.innerHTML=message;
    msgElement.classList.add('message');
    msgElement.classList.add(position);
    messageContainer.append(msgElement);
    if(position=='left'){
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = msgInp.value;
    append(`You : ${message}`,'right');
    socket.emit('send',message);
    msgInp.value='';
})

const name = prompt("Enter your name to join");
socket.emit("new-user-joined",name);

socket.on("user-joined",name=>{
    append(`--- ${name} joined ---`,'right');
})

socket.on("receive",data=>{
    append(`${data.name} : ${data.message}`,'left');
})

socket.on("left",name=>{
    append(`--- ${name} left the chat ---`,'right');
})