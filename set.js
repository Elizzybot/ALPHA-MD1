const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNExxaHErczNoVzhhd0VIeFY0MmVKMlpLbElaUytvd2Y5aHE3WjF2U1BYZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiczg4VEQwc0NlQmZoTG5yc1RGWmIvS0VBWkg5WXBjeWpScTB5MXBuN0p4TT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzSTFwSWhKWnYreGd1ZVJtQWg3aU4zbktCdUtjWFBEWnM4Z0JvN2RpUjBZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnYmFEQmwxY054V05RQ3JKUTVOWDVUT2lyL3laTjJtSHM4WHRsYmhaZVNJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBNdmlsNGt3cmJFbEloczFXYmNXTm9hVTVISXhZNTAxR0hWNldxM3lTMU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllnaENIUENOL3ZqZUpOcVZSUVpYbWVHNHJGYzB3R0lhdjViU3N5QmJiSFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0xvbXlDNEtzRVZFdExLR0xMSk9kdjNyclU2VFgyN1I5eVdVTFF0ZGpIaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTTVkVklNbG9waWNWcXk2SEFMeno1cUU0ZW5IUS9YRzNncUVHeGtiaFRWND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjF1SnVUS2hDZXRVYXVYeDBpZUlWeEhCd0pxckdxd0tuZDdDbDZjbHp1MHN1eGs3Y1pHWjZmL1R3Q2I2S0JYb21yZllhcjNJVXhwSjc3SmdEZmlMQmd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OSwiYWR2U2VjcmV0S2V5IjoidWNOaFNVVkpsVHB6YjJRVTl6VUN1cndEbnpxSXZEdXBKWTVjN1VBRUhIVT0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiYWFnSmtNbjRUOFNFdWlJTkZFWW9yUSIsInBob25lSWQiOiIxNGJkMjRmMC1hNGEzLTQ2ODItOTA5NS02ODI5OTg3ZGY4MGEiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0ZuTVBIdXpjV0Zram1ORmxRZlhOSGJIMW9jPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImN5VjVTNDdDaVpVUEhFNEVsL05QaG9iZDJSVT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJBVjJZWVBXWCIsIm1lIjp7ImlkIjoiMjM0NzAzODQ5NDk5NzoxMEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJHUkVZLUhFQVJULVRFQ0gifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0k3NGl0SUdFTXJZNzdZR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjJSQUtjQUp0WFk5M2VmdnZVR0NFZ3hFbXVmNTdEeFJFU20zTGU0YUY0M1k9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImpYZzhDQmtndGo0ZlQrY3BhdXRza2tKNzRRNUN1eDJlWUF4d3FrWGJpeFJ2R3c4M3B3TFRoSW0yUE5QNzJXQjV3ZGtidzZETDlZWHlVZHhwcGMwb0FBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJyaGo2VGpnbEF6NlNrQlNIQytZRlVlNWRiaGNGT1ZKU0J6cnUzU3dVbmE1djNKUnpoN1paVVA0TnB4N1RzTU9NQkVmNWR2UFVrUGZtd0JJNktXVTZndz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwMzg0OTQ5OTc6MTBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZGtRQ25BQ2JWMlBkM243NzFCZ2hJTVJKcm4rZXc4VVJFcHR5M3VHaGVOMiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNTY4ODkyMH0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "GREY-HEART-TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 2347038494997",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'LOVE-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/40d55d0be6d6e4b7fd6ba.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
