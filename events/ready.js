module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
      console.log(`Logged in as ${client.user.tag}!`);
      await client.user.setActivity('/help', {
        type: 'PLAYING'
      });
    },
  };