export function blobToBuffer(blob: Blob): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
        const fileReader: FileReader = new FileReader();
        fileReader.onloadend = (event) => {
            if (fileReader.error) {
                return reject(fileReader.error);
            } else {
                return resolve(Buffer.from(fileReader.result as ArrayBuffer));
            }
        };

        fileReader.onerror = (event) => {
            fileReader.abort();
        };

        fileReader.readAsArrayBuffer(blob);
    });
}
