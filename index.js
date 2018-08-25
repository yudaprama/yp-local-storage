import {NativeModules} from 'react-native';

const Storage = NativeModules.AsyncRocksDBStorage ||
  NativeModules.AsyncSQLiteDBStorage ||
  NativeModules.AsyncLocalStorage;

export const getItem = (key: string, cb: Function) => {
	return new Promise((resolve, reject) => {
	  Storage.multiGet([key], function(errors, result) {
	    // Unpack result to get value from [[key,value]]
	    let value = (result && result[0] && result[0][1]) ? JSON.parse(result[0][1]) : null;
	    resolve(value)
	    cb && cb(value)
	  });
	});
}

export const setItem = (key: string, value: any, cb: Function) => {
	return new Promise((resolve, reject) => {
		Storage.multiSet([
			[key, JSON.stringify(value)]
		], () => {
			resolve()
			cb && cb()
		})
	});
}
