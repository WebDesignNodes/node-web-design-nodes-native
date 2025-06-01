
// * Dependencies Required

import { algo, lib, enc } from 'crypto-js';

export const get_File_Hash = (file: File): Promise<{ file_hash: string }> => {
    
    return new Promise((resolve, reject) => {

        const chunkSize = 4 * 1024 * 1024;
        const fileSize = file.size;
        let offset = 0;

        const sha256 = algo.SHA256.create();

        const fileReader = new FileReader();

        const loadNextChunk = () => {

            const slice = file.slice(offset, offset + chunkSize);
            fileReader.readAsArrayBuffer(slice);

        };

        fileReader.onload = (event) => {

            const result = event.target?.result;

            if (result) {

                const wordArray = lib.WordArray.create(result as ArrayBuffer);

                sha256.update(wordArray);

                offset += chunkSize;
                if (offset < fileSize) {

                    loadNextChunk();

                } else {

                    const hash = sha256.finalize().toString(enc.Hex);
                    resolve({ file_hash: hash });
                }

            } else {

                reject("Error al leer el fragmento del archivo.");

            }

        };

        fileReader.onerror = (error) => {

            reject(error);

        };

        loadNextChunk();

    });

};
