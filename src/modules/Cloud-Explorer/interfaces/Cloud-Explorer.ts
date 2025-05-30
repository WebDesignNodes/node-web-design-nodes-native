
export interface Upload_Config {
    name: string;
    size: number;
    path: string;
    mimeType: string;
    chunks: number;
    hash: string;
}

export interface Chunk_Upload_Payload {
    session_ID: string,
    index: number,
    chunk: number[]
}