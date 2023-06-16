import bcrypt from "bcrypt";

const generateHash = async function (word) {
    let salt = await bcrypt.genSalt(10);
    return bcrypt.hash(word, salt);
}

const verifyHash = function (word, crypt) {
    return bcrypt.compareSync(word, crypt);
}

export default { generateHash, verifyHash }