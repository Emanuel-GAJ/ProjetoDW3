import bcrypt from 'bcrypt';


class CryptPassword {
    constructor() {
        this.saltRounds = Number(process.env.API_HASH_SALT) || 10;
    }

    async hashPassword(password) {
        const hash = await bcrypt.hash(password, this.saltRounds);
        return hash;
    }

    async comparePassword(password, hash) {
        const result = await bcrypt.compare(password, hash);
        return result;
    }
}

export default new CryptPassword();
