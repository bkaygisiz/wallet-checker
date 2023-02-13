import { REST, Routes } from 'discord.js';
import { config } from "dotenv";
import fs from "fs";

config()
const token = process.env.TOKEN;
const client_id = process.env.CLIENT_ID;
const guild_id = process.env.GUILD_ID;
console.log(token)
const commands = [];
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.mjs'));

for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    commands.push(command.default.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(client_id, guild_id),
            { body: commands },
        )

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();