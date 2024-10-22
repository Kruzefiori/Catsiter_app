import { PrismaClient, Prisma } from "@prisma/client";

class CatService {
    prisma = new PrismaClient();

    async addCat(body: any) {
        const { name, age, gender, owner, breed, weight } = body;
        try {
            await this.prisma.cat.create({
                data: {
                    name,
                    age,
                    gender,
                    owner :{
                        connect: {id: owner}
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