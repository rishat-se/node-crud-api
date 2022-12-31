
export const getReqBody = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => { resolve(body); })
            req.on('error', (err) => { throw new Error(err); })
        } catch (err) {
            reject(err);
        }
    })
}
