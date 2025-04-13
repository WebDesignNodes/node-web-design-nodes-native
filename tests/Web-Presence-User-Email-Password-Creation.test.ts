
import Web_Design_Nodes from "../src"

test("Creates a new Web Presence User Email-Password Account", async () => {

    const web_Presence_Connection = Web_Design_Nodes.Web_Presence.connect({ project_id: "", project_token: "" })

    const account_creation_result = await web_Presence_Connection.User.create_Email_Password_Account("test0@webdesignnodes.com", "QWERTY123456789", { username: "Test_User", profile_picture_url: "https://sc.webdesignnodes.com/Web_Design_Nodes/images/web_presence_default_user_profile_picture.webp", newsletter_suscriber: true });

    console.log(account_creation_result);

    expect(account_creation_result)

})