# ADS-B RPC(Discord Rich Presence)

Just a simple rpc for showing ADS-B feed stats from adsb.ezz456ch.xyz

If you want to use this make sure you have Node.js installed

## How to use

## 1.First thing you need to have is a WeatherAPI key and a Client ID(Application ID)
You can get Client ID from [Discord Developer Portal](https://discord.com/developers/applications)
and WeatherAPI key from [WeatherAPI.com](https://www.weatherapi.com)

## 2.Put WeatherAPI key and client id in index.js and set latitude and longitude

it should be like this

```
const latlong = "13.6989449, 100.7480903"; // lat, long
const wtapikey = "0000000000000000000000000000000"; // weatherapi key
const clientId = "0000000000000000000"; // application id
```

## 3.Install axios and discord-rpc

```
npm i
```

## 4.Now open terminal and run it

```
node index.js
```

or if you have nodemon

```
nodemon
```