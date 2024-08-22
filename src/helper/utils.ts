import bcrypt from 'bcrypt';
const saltRounds = 10;

export const hashPasswordHelper = async(plainPassword: string) => {
    try {
        return await bcrypt.hash(plainPassword, saltRounds);
    } catch (error) {
        throw new Error(error);
    }
}

