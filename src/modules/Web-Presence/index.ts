
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

    private create_Email_Password_Account(email: string, password: string, account_custome_attributes?: unknown): Promise<{ created: boolean, account_ID: string | null, message: string }> {

        return new Promise((resolve, reject) => {

            this.API_Fetcher.Web_Presence.User.create_Email_Password_Account({ email: email.toLowerCase().trim(), password: password.trim(), account_custome_attributes }).then((fetch_response) => {

                return resolve(fetch_response);

            }).catch((err) => {

                reject("An error has ocurred while trying to create a new User Email-Password Account");
                throw Error(`An error has ocurred while trying to create a new User Email-Password Account: \n${err}`);

            });

        })

    }

    private login_Email_Password_Account(email: string, password: string, keep_session_open: boolean): Promise<{ authenticated: boolean, message: string, session_token?: string, refresh_token?: string }> {

        return new Promise((resolve, reject) => {

            this.API_Fetcher.Web_Presence.User.login_Email_Password_Account({ email: email.toLowerCase().trim(), password: password.trim(), keep_session_open: keep_session_open }).then((fetch_response) => {

                return resolve(fetch_response);

            }).catch((err) => {

                reject("An error has ocurred while trying to login into the User Email-Password Account");
                throw Error(`An error has ocurred while trying to login into the User Email-Password Account: \n${err}`);

            })

        })

    }

    private refresh_Email_Password_Session_Session_Token(session_token: string, refresh_token: string): Promise<{ new_Token: string }> {

        return new Promise((resolve, reject) => {

            this.API_Fetcher.Web_Presence.User.refresh_Email_Password_Account({ session_token: session_token, refresh_token: refresh_token }).then((fetch_response) => {

                return resolve(fetch_response);

            }).catch((err) => {

                reject("An error has ocurred while trying to refresh session token");
                throw Error(`An error has ocurred while trying to refresh session token: \n${err}`);

            })

        })

    }

    private logout(session_token: string): Promise<{ closed: boolean, message: string }> {

        return new Promise((resolve, reject) => {

            this.API_Fetcher.Web_Presence.User.logout({ session_token: session_token }).then((fetch_response) => {

                return resolve(fetch_response);

            }).catch((err) => {

                reject("An error has ocurred while trying to logout");
                throw Error(`An error has ocurred while trying to logout: \n${err}`);

            })

        })

    }

    private reset_Email_Password_Account_Password(email: string): Promise<{ reset_email_sended: boolean }> {

        return new Promise((resolve, reject) => {

            this.API_Fetcher.Web_Presence.User.reset_Email_Password_Account_Password({ email: email }).then((fetch_response) => {

                return resolve(fetch_response)

            }).catch((err) => {

                reject("An error has ocurred while trying to send account password reset email");
                throw Error(`An error has ocurred while trying to send account password reset email: \n${err}`);

            })

        })

    }

    private update_Email_Password_Account_Password(account_ID: string, new_Password: string): Promise<{ updated: boolean, message: string }> {

        return new Promise((resolve, reject) => {

            this.API_Fetcher.Web_Presence.User.update_Email_Password_Account_Password({ account_ID: account_ID, new_Password: new_Password }).then((fetch_response) => {

                return resolve(fetch_response);

            }).catch((err) => {

                reject("An error has ocurred while trying to update the account password");
                throw Error(`An error has ocurred while trying to update the account password: \n${err}`);

            })

        })

    }

    public get_Account_Data(account_ID: string, data: Record<string, number>): Promise<{ found: boolean, data: Record<string, any>, message: string }> {

        return new Promise((resolve, reject) => {

            this.API_Fetcher.Web_Presence.User.get_Account_Data({ account_ID, data }).then((fetch_response) => {

                return resolve(fetch_response);

            }).catch((err) => {

                reject("An error has ocurred while trying to get the account data");
                throw Error(`An error has ocurred while trying to get the account data: \n${err}`);

            })

        })

    }

    public delete_Account(account_ID: string): Promise<{ deleted: boolean, message: string }> {

        return new Promise((resolve, reject) => {

            this.API_Fetcher.Web_Presence.User.detele_Account({ account_ID }).then((fetch_response) => {

                return resolve(fetch_response);

            }).catch((err) => {

                reject("An error has ocurred while trying to delete the account");
                throw Error(`An error has ocurred while trying to delete the account: \n${err}`);

            })

        })

    }

    public User = {

        create_Email_Password_Account: (email: string, password: string, account_custome_attributes?: unknown) => this.create_Email_Password_Account(email, password, account_custome_attributes),
        login_Email_Password_Account: (email: string, password: string, keep_session_open: boolean) => this.login_Email_Password_Account(email, password, keep_session_open),
        refresh_Email_Password_Session_Session_Token: (session_token: string, refresh_token: string) => this.refresh_Email_Password_Session_Session_Token(session_token, refresh_token),
        logout: (session_token: string) => this.logout(session_token),
        update_Account: (email: string, password: string, account_custome_attributes?: unknown) => this.create_Email_Password_Account(email, password, account_custome_attributes),
        reset_Email_Password_Account_Password: (account_Email: string) => this.reset_Email_Password_Account_Password(account_Email),
        update_Email_Password_Account_Password: (account_ID: string, new_Password: string) => this.update_Email_Password_Account_Password(account_ID, new_Password),
        get_Account_Data: (account_ID: string, data: Record<string, number>) => this.get_Account_Data(account_ID, data),
        delete_Account: (account_ID: string) => this.delete_Account(account_ID)

    }

    // * Web Presence Database Methods

    private find_Database_Documents(database_name: string, filter: Record<string, any>): Promise<{ acknowledged: boolean }> {

        return new Promise((resolve, reject) => {

            this.API_Fetcher.Web_Presence.Database.find_Database_Documents({ database_name, filter }).then((fetch_response) => {

                return resolve(fetch_response);

            }).catch((err) => {

                reject("An error has ocurred while trying to get the database content");
                throw Error(`An error has ocurred while trying to get the database content: \n${err}`);

            })

        })

    }

    public Database = {

        find: (database_name: string, filter: Record<string, any>) => this.find_Database_Documents(database_name, filter),

    }

}

export default Web_Presence