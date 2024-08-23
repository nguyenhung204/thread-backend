import bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
const saltRounds = 10;

export const hashPasswordHelper = async(plainPassword: string) => {
    try {
        return await bcrypt.hash(plainPassword, saltRounds);
    } catch (error) {
        throw new Error(error);
    }
}

export const comparePasswordHelper = async(plainPassword: string, hashPassword: string) => {
    try {
        console.log(">> check compare",hashPassword, plainPassword);
        return await bcrypt.compare(plainPassword,hashPassword);
        
    } catch (error) {
        throw new Error(error);
    }
}

export function plainToClass<T>(cls: new (...args: any[]) => T, obj: any): T {
    return plainToInstance(cls, obj, { excludeExtraneousValues: true });
}


