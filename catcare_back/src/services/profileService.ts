import { PrismaClient } from "@prisma/client";

interface onboardingProfile {
  userId: number;
  jobDesc: string;
  price: number;
}

interface rating {
  userId: number;
  rate: number;
  review: string;
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
    const { userId, jobDesc, price } = body;
    const onboarding = await this.prisma.catSitter.create({
      data: {
        userId,     
        jobDesc, 
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

  async addReview(body: rating) {
    const { userId, rate , review} = body;
    const ratingData = await this.prisma.rating.create({
      data: {
        userId,
        rate,
        review ,
      },
    });

    const averageRating = await this.prisma.rating.aggregate({
      where: { userId: userId },
      _avg: {
        rate: true,
      },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        overallRating: averageRating._avg.rate ?? 0,
      },
    });

    return averageRating._avg.rate;
  }

  async getReviews(userId: number) {
    const reviews = await this.prisma.rating.findMany({
      where: { userId: userId },
    });

    return reviews;
  }
}

export default new ProfileService();
