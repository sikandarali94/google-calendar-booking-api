const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

class GoogleCalendar {
    constructor() {
        this.authorizeClient(process.env.CREDENTIALS_PATH, process.env.TOKEN_PATH);
        this.authToken = null;
    }

    authorizeClient(credentialsPath, tokenPath) {
        fs.readFile(credentialsPath, (error, credentials) => {
            if (error) {
                return console.error('Error loading client secret file: ', error);
            }
            this.authorize(JSON.parse(credentials.toString()), tokenPath);
        });
    }

    authorize(credentials, tokenPath) {
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

        fs.readFile(tokenPath, (error, token) => {
            if (error) {
                return this.getAccessToken(oAuth2Client, tokenPath);
            }
            oAuth2Client.setCredentials(JSON.parse(token.toString()));
            this.authToken = oAuth2Client;
        })
    }

    getAccessToken(oAuth2Client, tokenPath) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: process.env.SCOPE
        });
        console.log('Authorize this app by visiting this url: ', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Enter the code from that page here: ', code => {
            rl.close();
            oAuth2Client.getToken(code, (error, token) => {
                if (error) {
                    return console.error('Error retrieving access token', error);
                }
                oAuth2Client.setCredentials(token);
                fs.writeFile(tokenPath, JSON.stringify(token), error => {
                    if (error) {
                        return console.error(error);
                    }
                    console.log('Token stored to', tokenPath);
                });
                this.authToken = oAuth2Client;
            });
        });
    }
}

module.exports = GoogleCalendar;