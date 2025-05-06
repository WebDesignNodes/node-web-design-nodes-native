
// * Routes Required

import { User_Manager_Routes } from "./routes/web-presence/users.routes";
import { Database_Routes } from "./routes/web-presence/database.routes";

// * Payload Interfaces Required

import * as Account_Payload from "./payload-interface/web-presence/user.payload";
import * as Database_Payload from "./payload-interface/web-presence/database.payload";

// * Response Interfaces Required

import * as Account_Response from "./response-interface/web-presence/user.response";
import * as Database_Response from "./response-interface/web-presence/database.response";

// * Class Exported

class Web_Presence_API_Fetcher {

    private API_URL = "https://api.webdesignnodes.com/v1/";
    private project_id: string;
    private project_token: string;
    private on_session_expirated?: () => Promise<{ new_Token: string }>;

    constructor(config: { project_id: string, project_token: string, on_session_expirated?: () => Promise<{ new_Token: string }> }) {

        this.project_id = config.project_id;
        this.project_token = config.project_token;
        this.on_session_expirated = config.on_session_expirated;

    }

    public send_Request<T>(endpoint: string, method: "GET" | "POST" | "PATCH" | "DELETE", payload: unknown): Promise<T> {

        return new Promise((resolve, reject) => {

            fetch(`${this.API_URL}${endpoint}`, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload as Object, project_id: this.project_id, project_token: this.project_token }) }).then((response) => {

                response.json().then(async (json_response) => {

                    // * Refresh Session Token

                    if (response.status === 400 && json_response.message === "session_token Expirated" && this.on_session_expirated !== undefined) {

                        const update_Result = await this.on_session_expirated();

                        fetch(`${this.API_URL}${endpoint}`, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload as Object, project_id: this.project_id, project_token: this.project_token, session_token: update_Result.new_Token }) }).then((response) => {

                            response.json().then((json_response) => {

                                return resolve(json_response);

                            }).catch((e) => {

                                reject(`Unable to parse json response.\n${e}`);

                            })


                        }).catch((e) => {

                            reject(`Web_Presence_API_Fetcher:send_Request: Error while fetching request.\n${e}`);

                        })

                    }else{

                        return resolve(json_response);

                    }


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
            save_One_Document: (payload: Database_Payload.save_One_Document_Payload): Promise<Database_Response.save_One_Document_Response> => this.send_Request(Database_Routes.save_One_Document, "POST", payload),
            save_Many_Document: (payload: Database_Payload.save_Many_Documents_Payload): Promise<Database_Response.save_Many_Documents_Response> => this.send_Request(Database_Routes.save_Many_Documents, "POST", payload),
            find_One_Document: (payload: Database_Payload.find_One_Document_Payload): Promise<Database_Response.find_One_Documents_Response> => this.send_Request(Database_Routes.find_One_Documents, "POST", payload),
            find_Many_Documents: (payload: Database_Payload.find_Many_Documents_Payload): Promise<Database_Response.find_Many_Documents_Response> => this.send_Request(Database_Routes.find_Many_Documents, "POST", payload),
            update_One_Document: (payload: Database_Payload.update_One_Document_Payload): Promise<Database_Response.update_One_Document_Response> => this.send_Request(Database_Routes.update_One_Document, "POST", payload),
            update_Many_Documents: (payload: Database_Payload.update_Many_Documents_Payload): Promise<Database_Response.update_Many_Documents_Response> => this.send_Request(Database_Routes.update_Many_Documents, "POST", payload),
            delete_One_Document: (payload: Database_Payload.delete_One_Document_Payload): Promise<Database_Response.delete_One_Document_Response> => this.send_Request(Database_Routes.delete_One_Document, "POST", payload),
            delete_Many_Documents: (payload: Database_Payload.delete_Many_Documents_Payload): Promise<Database_Response.delete_Many_Documents_Response> => this.send_Request(Database_Routes.delete_Many_Document, "POST", payload),
        }

    }

}

export default Web_Presence_API_Fetcher;