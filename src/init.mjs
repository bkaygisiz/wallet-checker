import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const init = async () => {
    config();
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const commandsPATH = path.join(__dirname, "commands");
    const commandFiles = fs.readdirSync(commandsPATH).filter(file => file.endsWith(".mjs"));
    const client = new Client({ intents: GatewayIntentBits.Guilds });

    client.commands = new Collection();
    for (const file of commandFiles) {
        const command = await import(path.join(commandsPATH, file));
        client.commands.set(command.default.data.name, command);
    }
    console.log(client.commands);
    client.once(Events.ClientReady, c => {
        console.log(`Logged in as ${c.user.tag}!`);
    });

    client.login(process.env.TOKEN);
    return client;
}


