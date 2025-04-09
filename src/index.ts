
// * Modules Required

import Web_Presence from "./modules/Web-Presence";

// * Main Class

class Web_Design_Nodes {

    static Web_Presence(config: { project_id: string, project_token: string }) { return new Web_Presence(config) }

}

export default Web_Design_Nodes