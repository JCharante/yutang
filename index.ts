import { stringify } from 'qs';
import axios from 'axios';

class Reddit {
    private username: string;
    private password: string;
    private appId: string;
    private appSecret: string;
    private userAgent: string;
    constructor(username: string, password: string, appId: string, appSecret: string, userAgent: string) {
        this.username = username;
        this.password = password;
        this.appId = appId;
        this.appSecret = appSecret;
        this.userAgent = userAgent;
    }

    async requestToken() {
        const resp = await axios({
            method: 'POST',
            url: 'https://www.reddit.com/api/v1/access_token',
            data: stringify({
                grant_type: 'password',
                username: this.username,
                password: this.password,
            }),
            auth: {
                username: this.appId,
                password: this.appSecret,
            },
            headers: {
                'User-Agent': this.userAgent
            },
        })
        console.log(resp);
    }

}

async function main() {
    const client = new Reddit(process.env.RDT_USERNAME, process.env.RDT_PASSWORD, process.env.RDT_APPID, process.env.RDT_APPSC, 'yutang');
    await client.requestToken();
}

main();
