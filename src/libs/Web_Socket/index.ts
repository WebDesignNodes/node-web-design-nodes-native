
// * Types and Interfaces Required

type MessageRequest = {
    endpoint: string;
    message_payload: unknown;
    resolve: (data: { status_code: number, reply: { path: string, response: unknown } }) => void;
    reject: (error: unknown) => void;
};

class Web_Socket_Connection {

    private state: "connecting" | "ready";
    private ws_connection: WebSocket;

    private messageQueue: MessageRequest[] = [];
    private currentRequest: MessageRequest | null = null;
    private readyToSend: boolean = false;

    constructor(config: { project_id: string, on_connection_ready: () => void }) {

        this.state = "connecting";

        this.ws_connection = new WebSocket("https://api.webdesignnodes.com/ws/", ["analytics", config.project_id]);

        this.ws_connection.onopen = () => {

            config.on_connection_ready();

        };

        // Evento: Recibir mensaje del servidor
        this.ws_connection.onmessage = (event) => {

            const connection_reply = JSON.parse(event.data) as { trigger: string, message: string }

            // * Connection Middlewares Handler

            if (connection_reply.trigger === "connection_middleware") {

                if (connection_reply.message === "Connection Ready") {

                    this.readyToSend = true;

                    if (!this.currentRequest && this.messageQueue.length > 0) {

                        const nextMessage = this.messageQueue.shift()!;
                        this.sendQueuedMessage(nextMessage);

                    }

                }

            } else if (this.currentRequest) {

                // * Returning Reply to Request

                try {

                    this.currentRequest.resolve({ status_code: 200, reply: JSON.parse(event.data) });
                    this.currentRequest = null

                } catch (error) {

                    console.error(error);

                    if (this.currentRequest) {

                        this.currentRequest.reject("Error al parsear la respuesta del servidor.");
                        this.currentRequest = null;

                    }

                } finally {

                    this.readyToSend = true;

                    if (this.messageQueue.length > 0) {

                        const nextMessage = this.messageQueue.shift()!;
                        this.sendQueuedMessage(nextMessage);

                    }

                }

            }

        };

        // Evento: Error en la conexión
        this.ws_connection.onerror = (error) => {

            console.error("Error en la conexión WebSocket:", error);

        };

        // Evento: Conexión cerrada
        this.ws_connection.onclose = () => {

            console.log("Conexión WebSocket cerrada");

        };

    }

    public send_Message(endpoint: string, message_payload: unknown, resolve: (data: { status_code: number, reply: unknown }) => void, reject: (error: unknown) => void) {

        const request: MessageRequest = { endpoint, message_payload, resolve, reject };

        if (this.readyToSend && !this.currentRequest) {

            this.sendQueuedMessage(request);

        } else {

            this.messageQueue.push(request);

        }

    }

    private sendQueuedMessage(request: MessageRequest) {

        this.currentRequest = request;
        this.readyToSend = false;

        this.ws_connection.send(JSON.stringify({ endpoint: request.endpoint, payload: request.message_payload }));

    }

}

export default Web_Socket_Connection