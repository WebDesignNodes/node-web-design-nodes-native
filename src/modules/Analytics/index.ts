
// * Libs Required

import Web_Socket_Connection from "../../libs/Web_Socket";

class Analytics {

    private static instance: Analytics;

    public static connect(config: { project_id: string, location: string, referrer: string }): Analytics {

        if (!Analytics.instance) Analytics.instance = new Analytics(config);

        return Analytics.instance

    }

    private connection_data: { location: string, referrer: string }
    private Web_Socket_Connection: Web_Socket_Connection;

    constructor(config: { project_id: string, location: string, referrer: string }) {

        this.connection_data = { location: config.location, referrer: config.referrer };
        this.Web_Socket_Connection = new Web_Socket_Connection(["analytics", config.project_id]);
        this.save_Connection_Initial_Flow();
    }

    private save_Connection_Initial_Flow() {

        const on_response = (response: any) => { }

        const on_reject = (err: any) => { }

        this.Web_Socket_Connection.send_Message("new-connection", { location: this.connection_data.location, referrer: this.connection_data.referrer }, on_response, on_reject);


    }

    public update_Connection_Flow(location: string) {

        const on_response = (response: any) => { }

        const on_reject = (err: any) => { }

        this.Web_Socket_Connection.send_Message("navegation-update", { location: location }, on_response, on_reject);

    }

}

export default Analytics