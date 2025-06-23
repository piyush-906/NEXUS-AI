




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID ||'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUc1UkZaUFk2R3VLa0VCQkdJMGxGZVdQSXZ5S3U0RFRYUFRESHZud3Qydz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic1Y5S1ZsWnpFME11cm1aUjZOWWFYMmUvZjh0N0dWVWJDODVvdUoyaGtURT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2TjJKaE9KY3hSb2F3Q21UVGh0Qm9oUGdDbG9JemN6Ly9haVUrdkJadlVJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzbVUwWnRQKysrUFkvVmhDV2hLaFVnT2NtOW1JS1VwQ0lVVjBwTklTZ2tnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktDWkhNaEk1UXVYRG0xenB5NW9yYWY5WmFZVHFYaDRXYVFXOWNTd25ZMVU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im03cXRNQ0N1Y3cxaTR2TDV2c1gxdHVueE95ZFBhVHREZ0E0SzgvQ1lEQjA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaURvUzVmUXN6Ujh5c2EwN3pIc2hyeG15aUtiSUVhSXhtbkFCWllwY0pYST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNmxpWGFCZ3FFT0dKclpXNDZZcVFCNGd5K1kwY0wrei9PTzFzbTVLSHQyaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNObzBWRUV3UHRVZ1Q1MS9mTURkRkRydXRkUHltUmhhVU9jY0pQd3VUR1J2dDA4V1F4bml4OVpmdkI0VlZMckdPK3RjaGZCaCtONlRHUytJRGhtbmhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQxLCJhZHZTZWNyZXRLZXkiOiJDQlVhR1VTWVk1TEU3QWhwY3paNnhTZzNLdEsyQVh5RFc1RVNTSFMyNmJNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkxOTA5MzYzMjQ5N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3NUVFRDFBMDE5NDFGQjFGRUYwRTc3MjU2RTRBQjZDOCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUwNTE4MDYzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MTkwOTM2MzI0OTdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOTQ0RDU4QjNFMTZFODU4NEJDN0IzNjRENzUzMzFFMkEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDUxODA2NH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiOU1OMUdZTjUiLCJtZSI6eyJpZCI6IjkxOTA5MzYzMjQ5NzoxNUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjIzNjE0NjUxMjY1NDU4NjoxNUBsaWQiLCJuYW1lIjoi44CO8J+HrvCfh7PjgI/kupfvvKzvvLXvvKPPn++8ps6e77yyIOS5iE9QIOKBtuKBuSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSzdmamJrSEVKYVMyOElHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidzNBOXRtTDJIV0xQTEdWb0xaSWhHaXBLUmpobmhZUFVWUjhZTkZxV2N5ND0iLCJhY2NvdW50U2lnbmF0dXJlIjoib2NkWHZBZzFGUngxa3pPMnFMdkJpT1l3OTdpQWpDM0w4OGc5d2ZWSDQrTGx6NFE2N1VPOHk2WVhKVk9PdEZaUG5oVFJDSFd6RjV4UXBFajNzeUExQ1E9PSIsImRldmljZVNpZ25hdHVyZSI6IlhaaXZ6ZHRoTDVGWm9WRVJnRTNUUUFKQTlxYU5rZm5tb0NNNnJRMGk3NHZDOFZQUmpLYStwTURGQjlTUkpSMTdTSnMzWi9vblRlVlpFclJXay9KRGlRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTE5MDkzNjMyNDk3OjE1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmNOd1BiWmk5aDFpenl4bGFDMlNJUm9xU2tZNFo0V0QxRlVmR0RSYWxuTXUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCSUlCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MDUxODA1MSwibGFzdFByb3BIYXNoIjoiNFpSUDZTIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFNREYifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || " 『🇮🇳』亗ＬＵＣϟＦΞＲ 么OP ⁶⁹",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'LUCIFER_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "yes",
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
