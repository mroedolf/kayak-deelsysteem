import {
	logger,
	consoleTransport,
	fileAsyncTransport,
} from 'react-native-logs';
import * as FileSystem from 'expo-file-system';

const today = new Date();
const date = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

type loggerType = {
	log: (message: string, data?: unknown) => void;
	info: (message: string, data?: unknown) => void;
	warn: (message: string, data?: unknown) => void;
	error: (message: string, data?: unknown) => void;
};

const config = {
	transport: __DEV__ ? consoleTransport : fileAsyncTransport,
	severity: __DEV__ ? 'debug' : 'error',
	transportOptions: {
		colors: {
			info: 'blueBright',
			warn: 'yellowBright',
			error: 'redBright',
		},
		FS: FileSystem,
		fileName: `logs_${date}-${month}-${year}`,
		printDate: true,
		dateFormat: 'time',
	},
};

const log = logger.createLogger(config) as unknown as loggerType;

export { log };
