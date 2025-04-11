
// * Modules Required

import web_Presence_User_Methods from "../../../../../API/methods/web-presence/user";


class User_Manager {

    public static create_Email_Password_Account(email: string, password: string, account_custome_attributes?: unknown): Promise<{ account_ID: string }> {

        return web_Presence_User_Methods.create_Email_Password_Account({ email, password, account_custome_attributes })

    }

}

export default User_Manager