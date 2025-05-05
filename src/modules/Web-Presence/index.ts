
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

    constructor(config: { project_id: string, project_token: string, on_session_refresh?: () => void }) {

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

    /**
     ** This Method will create and return the account session.
     * @param email User Account Email
     * @param password User Account Password
     * @param keep_session_open Account Session Lifetime
     * @returns session tokens
     */

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

    /**
     ** This method will return the new session token 
     ** for session that can renovate the session token.
     * @param session_token Session Token
     * @param refresh_token Sestion Refresh Token
     * @returns newToken
     */

    private refresh_Email_Password_Session_Session_Token(session_token: string, refresh_token: string): Promise<{ new_Token: string, message: string }> {

        return new Promise((resolve, reject) => {

            this.API_Fetcher.Web_Presence.User.refresh_Email_Password_Account({ session_token: session_token, refresh_token: refresh_token }).then((fetch_response) => {

                return resolve(fetch_response);

            }).catch((err) => {

                reject("An error has ocurred while trying to refresh session token");
                throw Error(`An error has ocurred while trying to refresh session token: \n${err}`);

            })

        })

    }

    /**
     ** This method will close the account session.
     * @param session_token Session Token
     * @returns session status
     */

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

    /**
     ** The method will update the account attributes at the Users Database
     * @param session_token Session Token
     * @param account_ID Account ID
     * @param updated_attributes Account model new attributes value
     * @returns Update state
     */

    private update_Account(session_token: string, account_ID: string, updated_attributes: Record<string, any>): Promise<{ updated: boolean, message: string }> {

        return new Promise((resolve, reject) => {

            this.API_Fetcher.Web_Presence.User.update_Account({ session_token, account_ID, updated_attributes }).then((fetch_response) => {

                return resolve(fetch_response);

            }).catch((err) => {

                reject("An error has ocurred while trying to update the account data");
                throw Error(`An error has ocurred while trying to update the account data: \n${err}`);

            })

        })

    }

    /**
     ** This method will send a reset password througth an only
     ** if newsletter module setup is complete. 
     * @param email Account Email
     * @returns reset_email_sended state
     */

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

    /**
     ** This method will update the hash of the account.
     * @param session_token Session Token
     * @param account_ID Account ID
     * @param new_Password Account new Password
     * @returns Update status
     */

    private update_Email_Password_Account_Password(session_token: string, account_ID: string, new_Password: string): Promise<{ updated: boolean, message: string }> {

        return new Promise((resolve, reject) => {

            this.API_Fetcher.Web_Presence.User.update_Email_Password_Account_Password({ session_token: session_token, account_ID: account_ID, new_Password: new_Password }).then((fetch_response) => {

                return resolve(fetch_response);

            }).catch((err) => {

                reject("An error has ocurred while trying to update the account password");
                throw Error(`An error has ocurred while trying to update the account password: \n${err}`);

            })

        })

    }

    /**
     ** This method will return the data of the account requested
     * @param account_ID Account ID
     * @param data Data to retreive
     * @returns account data requested
     */

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

    /**
     ** This method will remove an account from the Web Presence
     ** Users Database.
     * @param session_token Session Token
     * @param account_ID Account
     * @returns Deletion state.
     */

    public delete_Account(session_token: string, account_ID: string): Promise<{ deleted: boolean, message: string }> {

        return new Promise((resolve, reject) => {

            this.API_Fetcher.Web_Presence.User.detele_Account({ session_token: session_token, account_ID: account_ID }).then((fetch_response) => {

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
        update_Account: (session_token: string, account_ID: string, updated_attributes: Record<string, any>) => this.update_Account(session_token, account_ID, updated_attributes),
        reset_Email_Password_Account_Password: (account_Email: string) => this.reset_Email_Password_Account_Password(account_Email),
        update_Email_Password_Account_Password: (session_token: string, account_ID: string, new_Password: string) => this.update_Email_Password_Account_Password(session_token, account_ID, new_Password),
        get_Account_Data: (account_ID: string, data: Record<string, number>) => this.get_Account_Data(account_ID, data),
        delete_Account: (session_token: string, account_ID: string) => this.delete_Account(session_token, account_ID)

    }

    // * Web Presence Database Methods

    private save_One_Document(database_name: string, document: Record<string, any>): Promise<{ acknowledged: boolean, _id: string }> {

        return new Promise((resolve, reject) => {

            this.API_Fetcher.Web_Presence.Database.save_One_Document({ database_name, document }).then((fetch_response) => {

                return resolve(fetch_response);

            }).catch((err) => {

                reject("An error has ocurred while trying to save the document");
                throw Error(`An error has ocurred while trying to save the document: \n${err}`);

            })

        })

    }

    private save_Many_Documents(database_name: string, documents: Record<string, any>[]): Promise<{ acknowledged: boolean }> {

        return new Promise((resolve, reject) => {

            this.API_Fetcher.Web_Presence.Database.save_Many_Document({ database_name, documents }).then((fetch_response) => {

                return resolve(fetch_response);

            }).catch((err) => {

                reject("An error has ocurred while trying to save the documents");
                throw Error(`An error has ocurred while trying to save the documents: \n${err}`);

            })

        })

    }

    private find_One_Document(database_name: string, filter: Record<string, any>, projection?: Record<string, number>): Promise<{ acknowledged: boolean, result: Record<string, any> }> {

        return new Promise((resolve, reject) => {

            this.API_Fetcher.Web_Presence.Database.find_One_Document({ database_name, filter, projection }).then((fetch_response) => {

                return resolve(fetch_response);

            }).catch((err) => {

                reject("An error has ocurred while trying to get the database content");
                throw Error(`An error has ocurred while trying to get the database content: \n${err}`);

            })

        })

    }

    private find_Many_Documents(database_name: string, filter: Record<string, any>, projection?: Record<string, number>, sort?: Record<string, any>, limit?: number): Promise<{ acknowledged: boolean, results: Record<string, any>[] }> {

        return new Promise((resolve, reject) => {

            this.API_Fetcher.Web_Presence.Database.find_Many_Documents({ database_name, filter, projection, sort, limit }).then((fetch_response) => {

                return resolve(fetch_response);

            }).catch((err) => {

                reject("An error has ocurred while trying to get the database content");
                throw Error(`An error has ocurred while trying to get the database content: \n${err}`);

            })

        })

    }

    private update_One_Document(database_name: string, filter: Record<string, any>, document_updates: Record<string, any>, options?: Record<string, any>): Promise<{ acknowledged: boolean, modifiedCount: number }> {

        return new Promise((resolve, reject) => {

            this.API_Fetcher.Web_Presence.Database.update_One_Document({ database_name, filter, document_updates, options }).then((fetch_response) => {

                return resolve(fetch_response);

            }).catch((err) => {

                reject("An error has ocurred while trying to update the database document");
                throw Error(`An error has ocurred while trying to update the database document: \n${err}`);

            })

        })

    }

    private update_Many_Documents(database_name: string, filter: Record<string, any>, document_updates: Record<string, any>, options?: Record<string, any>): Promise<{ acknowledged: boolean, modifiedCount: number }> {

        return new Promise((resolve, reject) => {

            this.API_Fetcher.Web_Presence.Database.update_Many_Documents({ database_name, filter, document_updates, options }).then((fetch_response) => {

                return resolve(fetch_response);

            }).catch((err) => {

                reject("An error has ocurred while trying to update the database documents");
                throw Error(`An error has ocurred while trying to update the database documents \n${err}`);

            })

        })

    }

    private delete_One_Document(database_name: string, filter: Record<string, any>): Promise<{ acknowledged: boolean, deletedCount: number }> {

        return new Promise((resolve, reject) => {

            this.API_Fetcher.Web_Presence.Database.delete_One_Document({ database_name, filter }).then((fetch_response) => {

                return resolve(fetch_response);

            }).catch((err) => {

                reject("An error has ocurred while trying to delete the document");
                throw Error(`An error has ocurred while trying to delete the document: \n${err}`);

            })

        })

    }

    private delete_Many_Documents(database_name: string, filter: Record<string, any>): Promise<{ acknowledged: boolean, deletedCount: number }> {

        return new Promise((resolve, reject) => {

            this.API_Fetcher.Web_Presence.Database.delete_Many_Documents({ database_name, filter }).then((fetch_response) => {

                return resolve(fetch_response);

            }).catch((err) => {

                reject("An error has ocurred while trying to delete the documents");
                throw Error(`An error has ocurred while trying to delete the documents: \n${err}`);

            })

        })

    }

    public Database = {

        save_One_Document: (database_name: string, document: Record<string, any>) => this.save_One_Document(database_name, document),
        save_Many_Documents: (database_name: string, documents: Record<string, any>[]) => this.save_Many_Documents(database_name, documents),
        find_One_Document: (database_name: string, filter: Record<string, any>, projection?: Record<string, number>) => this.find_One_Document(database_name, filter, projection),
        find_Many_Documents: (database_name: string, filter: Record<string, any>, projection?: Record<string, number>, sort?: Record<string, any>, limit?: number) => this.find_Many_Documents(database_name, filter, projection, sort, limit),
        update_One_Document: (database_name: string, filter: Record<string, any>, updates: Record<string, any>, options?: Record<string, any>) => this.update_One_Document(database_name, filter, updates, options),
        update_Many_Documents: (database_name: string, filter: Record<string, any>, updates: Record<string, any>, options?: Record<string, any>) => this.update_Many_Documents(database_name, filter, updates, options),
        delete_One_Document: (database_name: string, filter: Record<string, any>) => this.delete_One_Document(database_name, filter),
        delete_Many_Documents: (database_name: string, filter: Record<string, any>) => this.delete_Many_Documents(database_name, filter)
    }

}

export default Web_Presence