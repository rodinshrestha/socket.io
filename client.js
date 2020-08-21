const socket = io("http://localhost:8000");
//asdconsole.log("asd");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
const onlineContainer = document.querySelector(".onlineStatusContainer");
const onlineUsers = [];

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
};

const onlineUserList = (userName) => {
  //alert(userName);
  const OnlineUserElement = document.createElement("div");
  OnlineUserElement.innerHTML = ` &#9679; ${userName}`;
  onlineContainer.appendChild(OnlineUserElement);
};

function getUserName(name) {
  console.log(name);
  if (!name) {
    name = prompt("enter your name to join the live chat server");
    getUserName(name);
  }
  return name;
}

let name = getUserName("");
socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  //alert(name);
  onlineUsers.push(name);
  //console.log(onlineUsers);
  append(`${name} joined the chat`, "middle");
  onlineUserList(name);
});

socket.on("receive", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

socket.on("leave", (name) => {
  append(`${name} left the chat`, "middle");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`you : ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});
