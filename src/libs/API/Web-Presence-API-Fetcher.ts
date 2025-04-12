
// * Routes Required

import { User_Manager_Routes } from "./routes/web-presence/users.routes";

// * Payload Interfaces Required

import { create_Email_Password_Account_Payload } from "./payload-interface/web-presence/user.payload";

// * Response Interfaces Required

import { create_Email_Password_Account_Response } from "./response-interface/web-presence/user.response";

// * Class Exported

class Web_Presence_API_Fetcher {

    private API_URL = process.env.API_URL;
    private project_id: string;
    private project_token: string;

    constructor(config: { project_id: string, project_token: string }) {

        this.project_id = config.project_id;
        this.project_token = config.project_token;

    }

    public send_Request<T>(endpoint: string, method: "GET" | "POST" | "PATCH" | "DELETE", payload: unknown): Promise<T> {

        return new Promise((resolve, reject) => {

            fetch(`https://api.webdesignnodes.com/v1/${endpoint}`, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload as Object, project_id: this.project_id, project_token: this.project_token }) }).then((response) => {

                response.json().then((json_response) => {

                    return resolve(json_response);

                }).catch((e) => {

                    reject(`Unable to parse json response.\n${e}`);

                })

            }).catch((e) => {

                reject(`Web_Presence_API_Fetcher:send_Request: Error while fetching request.\n${e}`);

            })

        })


    }

    public Web_Presence = {

        User: {
            create_Email_Password_Account: (payload: create_Email_Password_Account_Payload): Promise<create_Email_Password_Account_Response> => this.send_Request(User_Manager_Routes.create_email_password_account, "POST", payload)
        }

    }

}

export default Web_Presence_API_Fetcher;