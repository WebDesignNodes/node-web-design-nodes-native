
// * Libraries Required

import HTTP_Fetcher from "../../../../libs/Fetcher";

class User_Manager {

    private project_id: string;
    private project_token: string;

    constructor(project_id: string, project_token: string) {

        this.project_id = project_id;
        this.project_token = project_token;


    }

    /**
     ** This method will create a new User Account at your Project,
     ** The account password will be hashed and stored safely.
     * @param email User Account Email
     * @param password User Account Password in Plaintext
     */

    public create_Email_Password_Account(email: string, password: string, account_custom_attributes?: unknown): Promise<{ account_ID: string }> {

        return new Promise((resolve, reject) => {

            HTTP_Fetcher.Web_Presence.User.create_Email_Password_Account(email.toLowerCase().trim(), password.trim(), account_custom_attributes).then((fetch_response) => {

                return resolve(fetch_response);

            }).catch((err) => {

                reject("An error has ocurred while trying to create a new User Email-Password Account");
                throw Error(`An error has ocurred while trying to create a new User Email-Password Account: \n${err}`);

            });

        })

    }

    /**
     ** This funtion will return the User Account Sesion Token and the Refresh Session Token if aplicable
     * @param email Account Email
     * @param password Account Password
     * @param keep_session_alive Session Type
     * @returns Token Refresh_Token
     */

    public Email_Password_Login(email: string, password: string, keep_session_alive: boolean): Promise<{ token: string, refresh_token: string }> {

        return new Promise((resolve, reject) => {

            // HTTP_Fetcher.Web_Presence.User.Account_Email_Password_Login(email, password, keep_session_alive).then((fetch_response) => {

            //     return resolve(fetch_response);

            // }).catch((err) => {

            //     reject("An error has ocurred while trying to create an account session");
            //     throw Error(`An error has ocurred while trying to create an account session: \n${err}`);

            // })

        })

    }

}

export default User_Manager