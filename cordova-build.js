const dotenv = require('dotenv');
const {writeFileSync} = require("node:fs");
dotenv.config({ path: './.env' });

const xml = `<?xml version='1.0' encoding='utf-8'?>
<widget id="${process.env.APP_ID}" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>${process.env.APP_NAME}</name>
    <description>${process.env.APP_DESCRIPTION}</description>
    <author email="carlocappai@gmail.com" href="https://www.carlocappai.me">
        Carlo Cappai
    </author>
    <content src="index.html" />
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    <preference name="Orientation" value="landscape" />
    <icon src="www/icon.jpeg" />
    <platform name="android">
        <preference name="AndroidWindowSplashScreenBackground" value="#000000" />
        <preference name="SplashScreenDelay" value="200" />
    </platform>

</widget>
`;

//save xml in file
writeFileSync('./cordova/config.xml', xml);
