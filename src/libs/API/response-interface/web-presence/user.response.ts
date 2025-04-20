
export interface create_Email_Password_Account_Response { created: boolean, account_ID: string | null, message: string };

export interface login_Email_Password_Account_Response { authenticated: boolean, session_token?: string, refresh_token?: string, message: string };

export interface refresh_Email_Password_Account_Session_Session_Token_Response { new_Token: string, message: string };

export interface logout_Response { closed: boolean, message: string };

export interface update_Account { updated: boolean, message: string };

export interface reset_Email_Password_Account_Password_Response { reset_email_sended: boolean, message: string };

export interface update_Email_Password_Account_Password_Response { updated: boolean, message: string };

export interface get_Account_Data_Response { found: boolean, data: Record<string, any>, message: string };

export interface delete_Account_Response { deleted: boolean, message: string };