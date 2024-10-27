import { PrismaClient } from "@prisma/client";

interface onboardingProfile {
  userId: number;
  jobDesc: string;
  rating: number;
  price: number;
}

class ProfileService {
  prisma = new PrismaClient();

  async getProfile(userId: number) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
      select: {
        email: true,
        name: true,
      },
    });

    if (!user) {
      throw new Error("user not found");
    }

    return user;
  }

  async onboardingProfile_catsitter(body: onboardingProfile) {
    const { userId, jobDesc, rating, price } = body;
    const onboarding = await this.prisma.catSitter.create({
      data: {
        userId,     
        jobDesc, 
        rating,   
        price,
      },
    });
    //Atualiza o tipo do usuário para SITTER após o onboarding
    const userUpdate = await this.prisma.user.update({
      where: { id: userId },
      data: {
        type: "SITTER",
      },
    });

    return onboarding && userUpdate;
  }
}

export default new ProfileService();
