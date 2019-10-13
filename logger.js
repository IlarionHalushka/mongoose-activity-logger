const LogsModel = require('./models/Logs');

const logLevels = {
	LOG: 'LOG',
	ERROR: 'ERROR'
};

const env = process.env.NODE_ENV;

// TODO TODO TODO TODO this probably should be a separate repository for this kind of logger TODO TODO TODO TODO
class Logger {
	static saveLog({ level, message }) {
		// TODO add plugin option to turn off logging on some process.
		//     if (!message || ['local', 'test'].includes(process.env.NODE_ENV)) return null;
		if (!message) return null;

		const formattedMessage = typeof message === 'object' ? JSON.stringify(message) : message;

		return new LogsModel({ level, message: formattedMessage, env }).save();
	}

	static log(message) {
		return this.saveLog({ level: logLevels.LOG, message });
	}

	static error(message) {
		return this.saveLog({ level: logLevels.ERROR, message });
	}
}

module.exports = Logger;
