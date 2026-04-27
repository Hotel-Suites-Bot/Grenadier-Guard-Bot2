const axios = require('axios');

exports.getUserId = async (username) => {
  const res = await axios.post('https://users.roblox.com/v1/usernames/users', { usernames: [username] });
  return res.data.data[0]?.id;
};

exports.getUserInfo = async (id) => (await axios.get(`https://users.roblox.com/v1/users/${id}`)).data;

exports.getGroups = async (id) => (await axios.get(`https://groups.roblox.com/v2/users/${id}/groups/roles`)).data.data;

exports.getFriends = async (id) => (await axios.get(`https://friends.roblox.com/v1/users/${id}/friends/count`)).data.count;

exports.getBadges = async (id) => (await axios.get(`https://badges.roblox.com/v1/users/${id}/badges?limit=100`)).data.data.length;

exports.getAvatar = async (id) => {
  const res = await axios.get(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${id}&size=150x150&format=Png`);
  return res.data.data[0]?.imageUrl;
};
