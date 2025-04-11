
import Web_Design_Nodes from "../src"

test("Creates a new Web Presence User Email-Password Account", async () => {

    const web_Presence_Connection = Web_Design_Nodes.Web_Presence.connect({ project_id: "", project_token: "" })
    
    const account_creation_result = await web_Presence_Connection.User.create_Email_Password_Account("test0@webdesignnodes.com", "QWERTY123456789");

    console.log(`Account ID: ${account_creation_result.account_ID}`);
    

    expect(account_creation_result.account_ID).toBeTruthy()

})