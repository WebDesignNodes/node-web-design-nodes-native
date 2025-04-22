
// * Dependencies Required

import Web_Design_Nodes from "../../src";
import { decode } from "jsonwebtoken";

describe("Web Presence Email-Password Account Workflow", () => {

    const web_Presence_Connection = Web_Design_Nodes.Web_Presence.connect({ project_id: "joseirasso-network", project_token: "9558ef3b61152c4752de4cbc296426427b561db6119cf964e1dac8eb3bd31845" })
    const account_email = "test3@webdesignnodes.com";
    const account_password = "QWERTY123456789"
    const account_new_password = "Pfjvuf519SJhuf"
    let session_token: string = "";
    let refresh_token: string = "";
    let Account_ID: string = "";

    // * Creates a new Web Presence User Email-Password Account

    test("Creates a new Web Presence User Email-Password Account", async () => {

        const account_creation_result = await web_Presence_Connection.User.create_Email_Password_Account(account_email, account_password, { username: "Test_User", profile_picture_url: "https://sc.webdesignnodes.com/Web_Design_Nodes/images/web_presence_default_user_profile_picture.webp", newsletter_suscriber: true });
        console.log(account_creation_result);

        expect(account_creation_result.created === true)

    });

    // * Start an Web Presence Account Session through Email-Password Login

    test("Start an Web Presence Account Session through Email-Password Login", async () => {

        const account_login_result = await web_Presence_Connection.User.login_Email_Password_Account(account_email, account_password, true);
        console.log(account_login_result);

        if (account_login_result.session_token !== undefined) session_token = account_login_result.session_token;
        if (account_login_result.refresh_token !== undefined) refresh_token = account_login_result.refresh_token;

        const token_decoded = decode(session_token) as { account_id: string, issuedBy: string };
        Account_ID = token_decoded.account_id;

        expect(account_login_result.authenticated === true);


    });

    // * Updates the Web Presence Account Data

    test("Updates the Web Presence Account Data", async () => {

        await new Promise(resolve => setTimeout(resolve, 5000));

        const update_result = await web_Presence_Connection.User.update_Account(session_token, Account_ID, { $set: { username: "New_Test_User_Username" } });
        console.log(update_result);

        expect(update_result.updated === true);


    }, 10000);

    // * Refresh the Web Presence Account Session Token

    test("Refresh the Web Presence Account Session Token", async () => {

        const refresh_result = await web_Presence_Connection.User.refresh_Email_Password_Session_Session_Token(session_token, refresh_token);
        console.log(refresh_result);

        session_token = refresh_result.new_Token;

        expect(refresh_result.message === "Succesfull Session Token Refresh");

    });

    // * Update the Web Presence Account Password

    test("Update the Web Presence Account Password", async () => {

        const update_result = await web_Presence_Connection.User.update_Email_Password_Account_Password(session_token, Account_ID, account_new_password);
        console.log(update_result);

        expect(update_result.updated === true);

    })

    // * Web Presence Account Session Logout

    test("Web Presence Account Session Logout", async () => {

        const logout_result = await web_Presence_Connection.User.logout(session_token);
        console.log(logout_result);

        expect(logout_result.closed === true);

    })

    // * Getting Data from Web Presence Account

    test("Getting Data from Web Presence Account", async () => {

        const get_data_result = await web_Presence_Connection.User.get_Account_Data(Account_ID, { username: 1, profile_picture_url: 1 });
        console.log(get_data_result);

        expect(get_data_result.found === true);

    })

    // * Start an Web Presence Account Session through Email-Password Login after password update

    test("Start an Web Presence Account Session through Email-Password Login after password update", async () => {

        const account_login_result = await web_Presence_Connection.User.login_Email_Password_Account(account_email, account_new_password, true);
        console.log(account_login_result);

        if (account_login_result.session_token !== undefined) session_token = account_login_result.session_token;
        if (account_login_result.refresh_token !== undefined) refresh_token = account_login_result.refresh_token;

        const token_decoded = decode(session_token) as { account_id: string, issuedBy: string };
        Account_ID = token_decoded.account_id;

        expect(account_login_result.authenticated === true);


    });

    // * Delete Web Presence Account

    test("Delete Web Presence Account", async () => {

        await new Promise(resolve => setTimeout(resolve, 10000));

        const delete_result = await web_Presence_Connection.User.delete_Account(session_token, Account_ID);
        console.log(delete_result);

        expect(delete_result.deleted === true);

    }, 15000)

})