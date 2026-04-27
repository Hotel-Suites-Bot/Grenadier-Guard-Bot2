const { getUserId, getGroups } = require('../roblox');

module.exports = async (i) => {
  const username = i.options.getString('username');

  const id = await getUserId(username);
  if (!id) return i.editReply("User not found.");

  const groups = await getGroups(id);

  return i.editReply(`User is in ${groups.length} groups.`);
};
