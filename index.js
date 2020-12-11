const http = require('http');
const express = require('express');
const app = express();
var server = require('http').createServer(app);
app.get('/', (request, response) => {
	console.log(Date.now() + ' Ping Received');
	response.sendStatus(200);
});
const listener = server.listen(process.env.PORT, function() {
	console.log('Your app is listening on port ' + listener.address().port);
});
setInterval(() => {
	http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
//
const path = require('path');
const fs = require('fs');
// Only import the Client class from Discord.js
const { Client } = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client();

// Super fancy config loader/validator
const config = (() => {
	// Make sure the config file exists
	if (!fs.existsSync('config.json')) {
		// They must not have copied the config-example.json file yet,
		// so just exit
		console.error(
			'Please copy the config-example.json file and rename it to config.json, filling out all required fields.'
		);
		process.exit(1);
	}

	let json;
	try {
		// Parse the JSON file
		json = JSON.parse(fs.readFileSync('config.json').toString());
	} catch (error) {
		// Catch any parser errors or read errors and exit
		console.error(`Failed to load/parse the config.json file: ${error}`);
		process.exit(1);
	}

	// If there isn't a token, the bot won't start, but if there is then
	// we want to make sure it's a valid bot token
	if (json.token && !/^[a-zA-Z0-9_\.\-]{59}$/.test(json.token)) {
		console.error(
			'The token you entered is invalid! Please carefully re-enter the token and restart the bot.'
		);
		process.exit(1);
	}

	return json;
})();

// Store the commands in a Map (slightly better than a raw object)
const commands = new Map();
// Create the client
const bot = new Client({ disableEveryone: true });
// Store the config and commands on the bot variable so as to make them
// easily accessible in commands and other files
bot.config = config;
bot.commands = commands;

// Read every file in ./commands and filter out the non-JS files
fs.readdirSync(path.resolve(__dirname, 'commands'))
	.filter(f => f.endsWith('.js'))
	.forEach(f => {
		// Attempt to load the file
		console.log(`Loading command ${f}`);
		try {
			// Require the raw file
			let command = require(`./commands/${f}`);
			// Validate that there's a run function and a valid help object
			if (typeof command.run !== 'function') {
				throw 'Command is missing a run function!';
			} else if (!command.help || !command.help.name) {
				throw 'Command is missing a valid help object!';
			}
			// Store the command in the map based on its name
			commands.set(command.help.name, command);
		} catch (error) {
			// Log any errors from the validator or from requiring the file
			console.error(`Failed to load command ${f}: ${error}`);
		}
	});

bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag} (ID: ${bot.user.id})`);
	bot.user.setStatus('available');
	bot.user.setPresence({
		game: {
			name: '$도움 | 야동',
			type: 'WATCHING',
			url: ''
		}
	});
});

bot.on('message', msg => {
	if (msg.content === '엄') {
		msg.channel.send('준\n식');
	}
});

bot.on('message', message => {
	if (message.author.bot || !message.guild) {
		return;
	}

	let { content } = message;

	if (!content.startsWith(config.prefix)) {
		return;
	}
	let split = content.substr(config.prefix.length).split(' ');
	let label = split[0];
	let args = split.slice(1);
	if (commands.get(label)) {
		commands.get(label).run(bot, message, args);
	}
});

config.token && bot.login(config.token).catch(console.error);
