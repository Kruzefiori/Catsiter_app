import { PrismaClient, Prisma } from "@prisma/client";

interface catAdd {
    name: string;
    age: number;
    gender: string;
    owner: number;
    breed: string;
    weight: number;
}

class CatService {
    prisma = new PrismaClient();

    async addCat(body: catAdd) {
        const { name, age, gender, owner, breed, weight } = body;
        try {
            await this.prisma.cat.create({
                data: {
                    name,
                    age,
                    gender,
                    owner: {
                        connect: { id: owner }
                    },
                    breed,
                    weight
                }
            });
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                throw new Error(err.message);
            }
        }
        return;
    }
}

export default new CatService();