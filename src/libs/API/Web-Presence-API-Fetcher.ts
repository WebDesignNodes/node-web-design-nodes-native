
// * Routes Required

import { User_Manager_Routes } from "./routes/web-presence/users.routes";
import { Database_Routes } from "./routes/web-presence/database.routes";

// * Payload Interfaces Required

import * as Account_Payload from "./payload-interface/web-presence/user.payload";
import { find_Database_Documents_Payload } from "./payload-interface/web-presence/database.payload";

// * Response Interfaces Required

import * as Account_Response from "./response-interface/web-presence/user.response";
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
            create_Email_Password_Account: (payload: Account_Payload.create_Email_Password_Account_Payload): Promise<Account_Response.create_Email_Password_Account_Response> => this.send_Request(User_Manager_Routes.create_email_password_account, "POST", payload),
            login_Email_Password_Account: (payload: Account_Payload.login_Email_Password_Account_Payload): Promise<Account_Response.login_Email_Password_Account_Response> => this.send_Request(User_Manager_Routes.login_email_password_account, "POST", payload),
            refresh_Email_Password_Account: (payload: Account_Payload.refresh_Email_Password_Account_Session_Session_Token_Payload): Promise<Account_Response.refresh_Email_Password_Account_Session_Session_Token_Response> => this.send_Request(User_Manager_Routes.refresh_session_token, "POST", payload),
            logout: (payload: Account_Payload.logout_Payload): Promise<Account_Response.logout_Response> => this.send_Request(User_Manager_Routes.logout, "POST", payload),
            update_Account: (payload: Account_Payload.update_Account_Payload): Promise<Account_Response.update_Account> => this.send_Request(User_Manager_Routes.update_account, "POST", payload),
            reset_Email_Password_Account_Password: (payload: Account_Payload.reset_Email_Password_Account_Password_Payload): Promise<Account_Response.reset_Email_Password_Account_Password_Response> => this.send_Request(User_Manager_Routes.reset_email_password_account_password, "POST", payload),
            update_Email_Password_Account_Password: (payload: Account_Payload.update_Email_Password_Account_Password_Payload): Promise<Account_Response.update_Email_Password_Account_Password_Response> => this.send_Request(User_Manager_Routes.update_email_password_account_password, "POST", payload),
            get_Account_Data: (payload: Account_Payload.get_Account_Data_Payload): Promise<Account_Response.get_Account_Data_Response> => this.send_Request(User_Manager_Routes.get_account_data, "POST", payload),
            detele_Account: (payload: Account_Payload.delete_Account_Payload): Promise<Account_Response.delete_Account_Response> => this.send_Request(User_Manager_Routes.delete_account, "POST", payload)
        },

        Database: {
            find_Database_Documents: (payload: find_Database_Documents_Payload): Promise<find_Database_Documents_Response> => this.send_Request(Database_Routes.find_Database_Documents, "POST", payload)
        }

    }

}

export default Web_Presence_API_Fetcher;