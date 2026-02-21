const socket = io();
const params = new URLSearchParams(window.location.search);

const user = {
  name: params.get("name"),
  uuid: params.get("uuid"),
  rank: params.get("rank")
};

document.getElementById("username").innerText = user.name;

let localStream;
let isMuted = false;

async function initAudio() {
  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
}

function joinRoom(roomId) {
  socket.emit("join-room", { roomId, user });
  initAudio();
}

function toggleMute() {
  if (!localStream) return;
  isMuted = !isMuted;
  localStream.getAudioTracks()[0].enabled = !isMuted;
}

function leaveRoom() {
  location.reload();
}

socket.on("access-denied", () => {
  alert("You don't have permission for this room.");
});