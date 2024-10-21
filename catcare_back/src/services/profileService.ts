import { PrismaClient } from "@prisma/client";

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
}

export default new ProfileService();
