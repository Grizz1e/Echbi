const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client, player) {
        
        if (interaction.isCommand()) {

            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            // execution and error handling
            try {
                await command.execute(interaction, client, player);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true
                });
                console.log(error)
            }
        }
    },
};