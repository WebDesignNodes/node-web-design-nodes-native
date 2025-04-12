
// * Modules Required

import Web_Presence_API_Fetcher from "../../libs/API/Web-Presence-API-Fetcher";

class Web_Presence {

    private static instance: Web_Presence;

    // * This method will create the singletone class instance.

    public static connect(config: { project_id: string, project_token: string }): Web_Presence {

        if (!Web_Presence.instance) Web_Presence.instance = new Web_Presence(config);

        return Web_Presence.instance;

    }

    // * This method will return the singlestone class instance.

    public static get_Connection(): Web_Presence {

        if (!Web_Presence.instance) throw new Error("Web Presence Instance is not initialyzed.");

        return Web_Presence.instance;

    }




    private API_Fetcher: Web_Presence_API_Fetcher;

    constructor(config: { project_id: string, project_token: string }) {

        this.API_Fetcher = new Web_Presence_API_Fetcher(config);

    }

    // * Web Presence Users Methods

    /**
    ** This method will create a new User Account at your Project,
    ** The account password will be hashed and stored safely.
    * @param email User Account Email
    * @param password User Account Password in Plaintext
    */

    private create_Email_Password_Account(email: string, password: string, account_custome_attributes?: unknown): Promise<{ account_ID: string }> {

        return new Promise((resolve, reject) => {

            this.API_Fetcher.Web_Presence.User.create_Email_Password_Account({ email: email.toLowerCase().trim(), password: password.trim(), account_custome_attributes }).then((fetch_response) => {

                return resolve(fetch_response);

            }).catch((err) => {

                reject("An error has ocurred while trying to create a new User Email-Password Account");
                throw Error(`An error has ocurred while trying to create a new User Email-Password Account: \n${err}`);

            });

        })

    }

    public User = {

        create_Email_Password_Account: (email: string, password: string, account_custome_attributes?: unknown) => this.create_Email_Password_Account(email, password, account_custome_attributes),

    }

}

export default Web_Presence