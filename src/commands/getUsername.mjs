import { SlashCommandBuilder } from "discord.js";
import axios from "axios";
import OAuth from "oauth-1.0a";
import crypto from "crypto";

const api_key = process.env.API_KEY;
const api_secret_key = process.env.API_KEY_SECRET;
const access_token = process.env.ACCESS_TOKEN;
const access_token_secret = process.env.ACCESS_TOKEN_SECRET;

export default {
    data: new SlashCommandBuilder()
        .setName("getusername")
        .setDescription("Get the username of a user")
        .addUserOption(option => option.setName("user").setDescription("The user")),
    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const oauth = OAuth({
            consumer: {
                key: api_key,
                secret: api_secret_key
            },
            signature_method: "HMAC-SHA1",
            hash_function(base_string, key) {
                return crypto
                    .createHmac("sha1", key)
                    .update(base_string)
                    .digest("base64");
            }
        });
        const token = {
            key: access_token,
            secret: access_token_secret
        };
        const header = oauth.toHeader(oauth.authorize({ url: "https://api.twitter.com/2/users/by/username/Bent940", method: "GET" }, token));
        const response = await axios.get(`https://api.twitter.com/2/users/by/username/Bent940`, {
            headers: {
                ...header,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        console.log(response.data.data);
        await interaction.reply(`The username of ${user} is ${response.data.data.username}`);
    }
}