
export interface create_Email_Password_Account_Payload {
    email: string;
    password: string;
    account_custome_attributes: unknown;
}

export interface login_Email_Password_Account_Payload {
    email: string;
    password: string;
    keep_session_open: boolean;
}

export interface refresh_Email_Password_Account_Session_Session_Token_Payload {
    session_token: string;
    refresh_token: string;
}

export interface logout_Payload {
    session_token: string;
}

export interface update_Account_Payload {
    session_token: string;
    account_ID: string;
    updated_attributes: Record<string, any>;
}

export interface reset_Email_Password_Account_Password_Payload {
    email: string;
}

export interface update_Email_Password_Account_Password_Payload {
    session_token: string;
    account_ID: string;
    new_Password: string;
}

export interface get_Account_Data_Payload {
    account_ID: string;
    data: Record<string, number>;
}

export interface delete_Account_Payload {
    session_token: string;
    account_ID: string;
}