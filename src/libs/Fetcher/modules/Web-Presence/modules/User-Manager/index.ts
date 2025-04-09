
// * Modules Required

import HTTP_Fetcher from "../../../.."


class User_Manager {

    public static create_Email_Password_Account(email: string, password: string, account_custome_attributes?: unknown): Promise<{ account_ID: string }> {

        return new Promise((resolve, reject) => {

            HTTP_Fetcher.send_Request("Web-Presence", "Users", "create_Email_Password_Account", { email, password, account_custome_attributes }).then((response) => {

                console.log(response);

            }).catch((err) => {

                reject(err);

            })


        })

    }

    public static Account_Email_Password_Login(email: string, password: string, keep_session_alive: boolean): Promise<{ token: string, refresh_token: string }> {

        return new Promise((resolve, reject) => {

            setTimeout(() => {

                return resolve({ token: "TOKEN", refresh_token: "REFRESH TOKEN" });

            })

        })

    }

}

export default User_Manager