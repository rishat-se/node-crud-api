import { IncomingMessage } from "http";

export const getReqBody = (req: IncomingMessage): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            let body: string = '';
            req.on('data', (chunk: string) => body += chunk);
            req.on('end', () => { resolve(body); })
            req.on('error', (err: unknown) => { if (err instanceof Error) throw new Error(err.message); })
        } catch (err) {
            reject(err);
        }
    })
}
