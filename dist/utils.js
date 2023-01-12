export const getReqBody = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk) => body += chunk);
            req.on('end', () => { resolve(body); });
            req.on('error', (err) => { if (err instanceof Error)
                throw new Error(err.message); });
        }
        catch (err) {
            reject(err);
        }
    });
};
