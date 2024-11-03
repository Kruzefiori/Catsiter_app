import { PrismaClient, Prisma } from "@prisma/client";

interface catAdd {
    name: string;
    age: number;
    gender: string;
    owner: number;
    breed: string;
    weight: number;
    castrated: boolean;
    conditions: string;
    protectionScreen: boolean;
    streetAccess: boolean;
}

export interface catUpdate {
    name?: string;
    age?: number;
    gender?: string;
    owner?: number;
    breed?: string;
    weight?: number;
    castrated?: boolean;
    conditions?: string;
    protectionScreen?: boolean;
    streetAccess?: boolean;
}

class CatService {
    prisma = new PrismaClient();

    async addCat(body: catAdd) {
        const { name, age, gender, owner, breed, weight, castrated, conditions, protectionScreen, streetAccess } = body;
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
                    weight,
                    castrated,
                    conditions,
                    streetAccess,
                    protectionScreen
                }
            });
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                throw new Error(err.message);
            }
        }
        return;
    }

    async updateCat(catId: number, userId: number, data: catUpdate) {
        const { name, age, gender, owner, breed, weight, castrated, conditions, protectionScreen, streetAccess} = data;

        const cat = await this.prisma.cat.findUnique({
            where: { id: catId }
        });


        if (!cat) {
            throw new Error("Gato não encontrado");
        }

    
        if (cat.ownerId !== userId) {
            throw new Error("Você não tem permissão para editar este gato");
        }

        try {
            await this.prisma.cat.update({
                where: { id: catId },
                data: {
                    name: name? name:cat.name,
                    age: age? age:cat.age,
                    gender: gender? gender:cat.gender,
                    breed: breed? breed:cat.breed,
                    weight: weight? weight:cat.weight,
                    castrated: castrated? castrated:cat.castrated,
                    conditions: conditions? conditions:cat.conditions,
                    protectionScreen: protectionScreen? protectionScreen:cat.protectionScreen,
                    streetAccess: streetAccess? streetAccess:cat.streetAccess
                }
            });
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                throw new Error(err.message);
            }
            throw new Error("Erro ao atualizar o gato");
        }
    }

    async deleteCat(catId: number, userId: number) {
        const cat = await this.prisma.cat.findUnique({
            where: { id: catId },
            include: { owner: true }
        });

        if (!cat) {
            throw new Error("Gato não encontrado");
        }

        if (cat.ownerId !== userId) {
            throw new Error("Você não tem permissão para deletar este gato");
        }

        try {
            await this.prisma.cat.delete({
                where: { id: catId }
            });
        
        } catch (err) {
            console.log(err);
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                throw new Error(err.message);
            } 
            throw new Error("Erro ao deletar o gato");
        }
    }
}

export default new CatService();