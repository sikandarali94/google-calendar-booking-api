const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'token.json';
const CREDENTIALS_PATH = 'credentials.json';

class GoogleCalendar {
    constructor(credentialsPath, tokenPath, scope) {
        this.authorizeClient(credentialsPath, tokenPath, scope);
        this.authToken = null;
    }

    authorizeClient(credentialsPath, tokenPath, scope) {
        fs.readFile(CREDENTIALS_PATH, (error, credentialsPath) => {
            if (error) {
                return console.error('Error loading client secret file: ', error);
            }
            this.authorize(JSON.parse(credentialsPath.toString()), tokenPath, scope);
        });
    }

    authorize(credentials, tokenPath, scope) {
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

        fs.readFile(tokenPath, (error, tokenPath) => {
            if (error) {
                return this.getAccessToken(oAuth2Client, tokenPath, scope);
            }
            oAuth2Client.setCredentials(JSON.parse(tokenPath.toString()));
            this.authToken = oAuth2Client;
        })
    }

    getAccessToken(oAuth2Client, tokenPath, scope) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope
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

class Singleton {
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new GoogleCalendar(SCOPES, TOKEN_PATH, CREDENTIALS_PATH);
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

module.exports = Singleton;