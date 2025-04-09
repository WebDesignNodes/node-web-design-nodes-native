
// * Modules Required

import User_Manager from "./modules/User-Manager"

class Web_Presence {

    private project_id: string;
    private project_token: string;

    /**
     ** Initialyze the connection to your project
     * @param config { project_id: Your project public id, project_token: Your project connection token }
     */

    constructor(config: { project_id: string, project_token: string }) {

        this.project_id = config.project_id;
        this.project_token = config.project_token;

    }

    User = User_Manager;

}

export default Web_Presence