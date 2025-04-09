
// * Modules Required

import Web_Presence from "./modules/Web-Presence"

class HTTP_Fetcher {

    public static Web_Presence = Web_Presence;

    public static send_Request(module: string, sub_module: string, route: string, payload: unknown): Promise<{ response: string }> {

        return new Promise((resolve, reject) => {



        })

    }

    private API_URL: string = "";

    constructor() {

        

    }

}

export default HTTP_Fetcher