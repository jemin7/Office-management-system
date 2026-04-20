import crypto from 'crypto'


const generatetoken = () => {
    const rawtoken = crypto.randomBytes(32).toString("hex")
    const hashedtoken = crypto
    .createHash("sha256")
    .update(rawtoken)
    .digest("hex")

    return {rawtoken,hashedtoken}
}