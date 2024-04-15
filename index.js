const axios = require('axios');
const rpc = require('discord-rpc');

const stats = 'https://api.ezz456ch.xyz/api/stats';
const latlong = ""; // lat, long
const wtapikey = ""; // weatherapi key
const wtapi = `https://api.weatherapi.com/v1/current.json?key=${wtapikey}&q=${latlong}&aqi=no`;

const clientId = ""; // application id
const client = new rpc.Client({ transport: 'ipc' });

// get weather data
async function weatherdata() {
    try {
        const responsewt = await axios.get(wtapi);
        const { current } = responsewt.data;
        return current;
    } catch (error) {
        return null;
    }
}

let current = null;

// update weather data
async function updateweatherdata() {
    current = await weatherdata();
    const now = new Date();
    const nowutcstring = now.toUTCString();
    let conditiontext = current ? (current.condition.text != null ? current.condition.text : "n/a") : "n/a";
    let temp_c = current ? (current.temp_c != null ? current.temp_c : "n/a") : "n/a";
    console.log(`[${nowutcstring}] ${conditiontext} ${temp_c}°C`);
}

async function setActivity() {
    try {
        const now = new Date();
        const y = now.getFullYear();
        const m = now.getMonth() + 1;
        const d = now.getDate();
        const dt = new Date(y, m - 1, d, 0, 0, 0);
        const start_time = dt.getTime() / 1000;

        current = await weatherdata();

        // use thaiteabot image if weather icon is undefied and n/a if data is null
        let conditionicon = current && current.condition && current.condition.icon ? `https:${current.condition.icon}` : "https://ezz456ch.xyz/ThaiTeaBot_512px.png";
        let conditiontext = current && current.condition && current.condition.text != null ? current.condition.text : "n/a";
        let temp_c = current && current.temp_c != null ? current.temp_c : "n/a";

        const i = `${conditionicon}`;
        const w = `${conditiontext} ${temp_c}°C`;

        const nowutcstring = now.toUTCString();

        const responsestats = await axios.get(stats);
        const datastats = responsestats.data;

        const username = datastats.clients.mlat[0]?.user ? datastats.clients.mlat[0].user : "n/a";
        const msg_s = datastats.clients.beast[0]?.msg_s ? datastats.clients.beast[0].msg_s : "n/a";
        const upload = datastats.clients.beast[0]?.kbps ? datastats.clients.beast[0].kbps : "n/a";


        const details = `${username}'s Receiver Stats`;
        const state = `Msg.: ${msg_s}/s  Upload: ${upload} Kbps`;

        client.setActivity({
            details: details,
            state: state,
            largeImageKey: i,
            largeImageText: w,
            startTimestamp: start_time,
            buttons: [
                {
                    label: `adsb.ezz456ch.xyz`,
                    url: `https://adsb.ezz456ch.xyz`
                },
                {
                    label: `WeatherAPI.com`,
                    url: `https://www.weatherapi.com`
                }
            ]
        });

        console.log(`[${nowutcstring}] ${details}`);
        console.log(`[${nowutcstring}] ${state}`);
    } catch (error) {
        const now = new Date();
        const nowutcstring = now.toUTCString();

        console.error(`[${nowutcstring}] Error occurred:`, error);
    }
}

client.on('ready', () => {
    console.log(`[INFO] RPC connected! (${client.user.username})`);
    setActivity();
    updateweatherdata();

    setInterval(() => {
        updateweatherdata();
    }, 450000); // update weather data every 7 minutes and 30 seconds

    setInterval(() => {
        setActivity();
    }, 60000); // update stats every 1 minutes
});

client.login({ clientId }).catch(console.error);
