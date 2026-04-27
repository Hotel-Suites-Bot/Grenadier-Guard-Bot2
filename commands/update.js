const update = require('../utils/updateRoles');

module.exports = async (i) => {
  await update(i.member);
  i.reply({ content: 'Updated.', ephemeral: true });
};
