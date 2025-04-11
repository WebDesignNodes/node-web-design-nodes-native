
// * Class Exported

class API_Core {

    private static API_URL = process.env.API_URL;

    public static send_Request<T>(endpoint: string, method: "GET" | "POST" | "PATCH" | "DELETE", payload: unknown): Promise<T> {

        return new Promise((resolve, reject) => {

            fetch(`${this.API_URL}${endpoint}`, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).then((response) => {

                response.json().then((json_response) => {

                    return resolve(json_response);

                }).catch((e) => {

                    reject(`Unable to parse json response.\n${e}`);

                })

            }).catch((e) => {

                reject(`API_Core:send_Request: Error while fetching request.\n${e}`);

            })

        })


    }

}

export default API_Core;