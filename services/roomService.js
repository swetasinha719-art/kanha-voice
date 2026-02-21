const { privateRooms } = require("../config");

function canJoin(roomId, rank) {
  if (!privateRooms[roomId]) return true; // public room
  return privateRooms[roomId].includes(rank);
}

module.exports = { canJoin };