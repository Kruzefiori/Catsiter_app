import bcrypt from "bcrypt";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

class UserService {
  async registerUser(
    email: string,
    name: string,
    password: string
  ): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        UserCredentials: {
          create: {
            passwordHash,
            salt,
          },
        },
      },
    });

    return user;
  }

  async loginUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await prisma.user.findFirst({
        where: { email },
        include: { UserCredentials: true },
      });

      if (!user) {
        throw new Error("user not found");
      }

      const { passwordHash } = user.UserCredentials[0];

      const isMatch = await bcrypt.compare(password, passwordHash);

      if (!isMatch) {
        throw new Error("password incorrect");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
export default new UserService();
