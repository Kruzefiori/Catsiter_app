import { PrismaClient, Prisma } from "@prisma/client";

class CatService {
    prisma = new PrismaClient();

    async addCat(body: any) {
        const { name, age, gender, owner, breed, weight } = body;
        console.log(name, age, gender, owner, breed, weight);   
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
            console.log("cat added");
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                throw new Error(err.message);
            }
            console.log(err);
        }
        return;
    }
}

export default new CatService();