
export interface User_Manager_Routes_Interface {
    create_email_password_account: string;
    login_email_password_account: string;
    refresh_session_token: string;
    logout: string;
    update_account: string;
    reset_email_password_account_password: string;
    update_email_password_account_password: string;
    get_account_data: string;
    delete_account: string;
}

export const User_Manager_Routes: User_Manager_Routes_Interface = {
    create_email_password_account: "web-presence/account/create-email-password-account",
    login_email_password_account: "web-presence/account/email-password-login",
    refresh_session_token: "web-presence/account/refresh",
    logout: "web-presence/account/logout",
    update_account: "web-presence/account/update-account",
    reset_email_password_account_password: "web-presence/account/reset-email-password-account-password",
    update_email_password_account_password: "web-presence/account/update-email-password-account-password",
    get_account_data: "web-presence/account/get-account-data",
    delete_account: "web-presence/account/delete-account"
}