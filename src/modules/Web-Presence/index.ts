
// * Modules Required

import User_Manager from "./modules/User-Manager"

class Web_Presence {

    private static instance: Web_Presence;

    // * This method will create the singletone class instance.

    public static connect(config: { project_id: string, project_token: string }): Web_Presence {

        if (!Web_Presence.instance) Web_Presence.instance = new Web_Presence(config);

        return Web_Presence.instance;

    }

    // * This method will return the singlestone class instance.

    public static get_Connection(): Web_Presence {

        if (!Web_Presence.instance) throw new Error("Web Presence Instance is not initialyzed.");

        return Web_Presence.instance;

    }

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

    // * Web Presence Users Methods

    public User = User_Manager;

}

export default Web_Presence