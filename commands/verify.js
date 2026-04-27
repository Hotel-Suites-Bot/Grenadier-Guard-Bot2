const Verified = require('../models/Verified');
const { getUserId } = require('../roblox');

function generateCode() {
  return 'BritishArmy-' + Math.floor(1000 + Math.random() * 9000);
}

module.exports = async (i) => {
  const username = i.options.getString('username');

  const robloxId = await getUserId(username);
  if (!robloxId) return i.editReply("User not found.");

  const code = generateCode();

  await Verified.findOneAndUpdate(
    { discordId: i.user.id },
    { discordId: i.user.id, robloxId, username, code },
    { upsert: true }
  );

  return i.editReply(
    `Put this in your Roblox bio:\n\n**${code}**\n\nThen run verify again.`
  );
};
