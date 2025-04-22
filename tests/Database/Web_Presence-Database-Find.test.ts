
import Web_Design_Nodes from "../src"

test("Load Web Presence Database Content", async () => {

    const web_Presence_Connection = Web_Design_Nodes.Web_Presence.connect({ project_id: "web-design-nodes-news-feed", project_token: "b4add9fd4a04b478b1a70da2d8ebd33905efad0ad72fc5d686c62bc0b9f2cfd0" })

    const search_Result = await web_Presence_Connection.Database.find("domains", {});

    console.log(search_Result);

    expect(search_Result)

})