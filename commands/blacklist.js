const { Blacklist } = require('../db');

module.exports = async (i) => {
  const action = i.options.getString('action');
  const gid = i.options.getString('groupid');

  if (action === 'add') {
    await Blacklist.create({ groupId: gid });
    return i.reply({ content: 'Added to blacklist', ephemeral: true });
  }

  if (action === 'remove') {
    await Blacklist.deleteOne({ groupId: gid });
    return i.reply({ content: 'Removed from blacklist', ephemeral: true });
  }
};
