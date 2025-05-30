
// * Libs Required

import Web_Socket_Connection from "../../libs/Web_Socket";
import { get_File_Hash } from "./libs/Calculator";

// * Interfaces Required

import { Chunk_Upload_Payload, Upload_Config } from "./interfaces/Cloud-Explorer";

class Cloud_Explorer {

    private static instance: Cloud_Explorer;

    public static connect(config: { token: string, client_type: string, project_id: string }): Cloud_Explorer {

        if (!Cloud_Explorer.instance) Cloud_Explorer.instance = new Cloud_Explorer(config);

        return Cloud_Explorer.instance;

    }

    private Web_Socket_Connection: Web_Socket_Connection;

    constructor(config: { token: string, client_type: string, project_id: string }) {

        this.Web_Socket_Connection = new Web_Socket_Connection(["cloud-explorer", config.token, config.client_type, config.project_id]);

    }

    public upload_File(directory_path: string, file: File, on_upload_progress_notifiy?: (progress: number) => void): Promise<{ uploaded: boolean }> {

        return new Promise(async (resolve, reject) => {

            try {

                const { file_hash } = await get_File_Hash(file);

                const Upload_Config: Upload_Config = {
                    name: file.name,
                    size: file.size,
                    path: directory_path,
                    mimeType: file.type,
                    chunks: Math.ceil(file.size / (256 * 1024)),
                    hash: file_hash
                }

                const { ready_To_Upload, upload_Session_ID } = await this.start_Upload_File_Process(Upload_Config);

                if (ready_To_Upload) {

                    const chunk_Size = 256 * 1024;
                    const total_chunks = Math.ceil(Upload_Config.size / chunk_Size);

                    for (let i = 0; i < total_chunks; i++) {

                        const raw_chunk = file.slice(i * chunk_Size, (i + 1) * chunk_Size);
                        const chunk_array_buffer = await raw_chunk.arrayBuffer();
                        const chunkUint8Array = new Uint8Array(chunk_array_buffer)
                        const chunk = Array.from(chunkUint8Array);

                        const chunk_Upload_Payload: Chunk_Upload_Payload = {
                            session_ID: upload_Session_ID,
                            index: i,
                            chunk: chunk
                        }

                        const chunk_upload_response = await this.upload_File_Chunk(chunk_Upload_Payload);

                        if (on_upload_progress_notifiy) on_upload_progress_notifiy(chunk_upload_response.progress);

                        if (chunk_upload_response.progress === 100) {

                            const { completed } = await this.validate_File_Upload_Integrity(upload_Session_ID);

                            if (completed) {

                                return resolve({ uploaded: true });

                            }

                        }

                    }

                } else {

                    return resolve({ uploaded: false });

                }

            } catch (error) {

                reject(error)

            }

        })

    }

    private start_Upload_File_Process(upload_configuration: Upload_Config): Promise<{ ready_To_Upload: boolean, upload_Session_ID: string }> {

        return new Promise((resolve, reject) => {

            const on_response = (response: unknown) => {

                const { reply } = response as { status_code: number, reply: { trigger: string, message: { ready: boolean, message: string, session_id: string } } };

                if (reply.message.message === "server is ready to receive file under the next channel") {

                    return resolve({ ready_To_Upload: true, upload_Session_ID: reply.message.session_id });

                }

                return resolve({ ready_To_Upload: false, upload_Session_ID: "" });

            }

            this.Web_Socket_Connection.send_Message("start-upload-process", { file_metadata: upload_configuration }, on_response, reject)

        })

    }

    private upload_File_Chunk(chunk_upload_Payload: Chunk_Upload_Payload): Promise<{ completed: boolean, progress: number }> {

        return new Promise((resolve, reject) => {

            const on_response = (response: unknown) => {

                const { reply } = response as { status_code: number, reply: { trigger: string, message: { progress: number } } };

                return resolve({ completed: reply.message.progress < 100 ? false : true, progress: reply.message.progress });

            }

            this.Web_Socket_Connection.send_Message("chunk-upload", chunk_upload_Payload, on_response, reject);

        })

    }

    private validate_File_Upload_Integrity(upload_Session_ID: string): Promise<{ completed: boolean }> {

        return new Promise((resolve, reject) => {

            const on_response = (response: unknown) => {

                const { reply } = response as { status_code: number, reply: { trigger: string, message: { completed: boolean } } };

                return resolve({ completed: reply.message.completed });

            }

            this.Web_Socket_Connection.send_Message("chunk-upload-complete", { session_ID: upload_Session_ID }, on_response, reject);

        })

    }

}

export default Cloud_Explorer