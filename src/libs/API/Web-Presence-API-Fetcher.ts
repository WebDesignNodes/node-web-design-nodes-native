
// * Routes Required

import { User_Manager_Routes } from "./routes/web-presence/users.routes";
import { Database_Routes } from "./routes/web-presence/database.routes";

// * Payload Interfaces Required

import { create_Email_Password_Account_Payload } from "./payload-interface/web-presence/user.payload";
import { find_Database_Documents_Payload } from "./payload-interface/web-presence/database.payload";

// * Response Interfaces Required

import { create_Email_Password_Account_Response } from "./response-interface/web-presence/user.response";
import { find_Database_Documents_Response } from "./response-interface/web-presence/database.response";

// * Class Exported

class Web_Presence_API_Fetcher {

    private API_URL = "https://api.webdesignnodes.com/v1/";
    private project_id: string;
    private project_token: string;

    constructor(config: { project_id: string, project_token: string }) {

        this.project_id = config.project_id;
        this.project_token = config.project_token;

    }

    public send_Request<T>(endpoint: string, method: "GET" | "POST" | "PATCH" | "DELETE", payload: unknown): Promise<T> {

        return new Promise((resolve, reject) => {

            fetch(`${this.API_URL}${endpoint}`, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload as Object, project_id: this.project_id, project_token: this.project_token }) }).then((response) => {

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
        },

        Database: {
            find_Database_Documents: (payload: find_Database_Documents_Payload): Promise<find_Database_Documents_Response> => this.send_Request(Database_Routes.find_Database_Documents, "POST", payload)
        }

    }

}

export default Web_Presence_API_Fetcher;