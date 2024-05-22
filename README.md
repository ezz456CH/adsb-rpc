# ADS-B RPC(Discord Rich Presence)

Just a simple rpc for showing ADS-B feed stats from adsb.ezz456ch.xyz and weather data

If you want to use this make sure you have Node.js installed

## How to use

## 1. The first thing you need to have is a WeatherAPI key and a Client ID(Application ID)
You can get a Client ID from [Discord Developer Portal](https://discord.com/developers/applications)
and a WeatherAPI key from [WeatherAPI.com](https://www.weatherapi.com)

## 2. Put the WeatherAPI key, Client ID and latitude and longitude in .env(example in .env_example)

it should be like this

```
latlong="13.6989449, 100.7480903";
wtapikey="0000000000000000000000000000000";
clientId="0000000000000000000";
```

## 3. Install axios and discord-rpc with npm

```
npm i
```

## 4. Now open a terminal and run it

```
node index.js
```

or if you have nodemon

```
nodemon
```
