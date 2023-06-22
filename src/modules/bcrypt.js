import bcrypt from "bcrypt";

const generateHash = async function (word) {
    let salt = await bcrypt.genSalt(10);
    return bcrypt.hash(word, salt);
}

const verifyHash = async function (word, crypt) {
    return await bcrypt.compare(word, crypt);
}

export default { generateHash, verifyHash }