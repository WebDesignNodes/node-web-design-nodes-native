
// * Class Required

import API_Core from "../../core"

// * Routes Required

import { User_Manager_Routes } from "../../routes/web-presence/users.routes"

// * Payload Interfaces Required

import { create_Email_Password_Account_Payload } from "../../payload-interface/web-presence/user.payload"

// * Response Interfaces Required

import { create_Email_Password_Account_Response } from "../../response-interface/web-presence/user.response"

const web_Presence_User_Methods = {
    create_Email_Password_Account: (payload: create_Email_Password_Account_Payload): Promise<create_Email_Password_Account_Response> => API_Core.send_Request(User_Manager_Routes.create_email_password_account, "POST", payload)
}

export default web_Presence_User_Methods;