module.exports = {
  allowedRanks: ["member", "vip", "admin"],
  privateRooms: {
    "vip-room": ["vip", "admin"],
    "admin-room": ["admin"]
  }
};