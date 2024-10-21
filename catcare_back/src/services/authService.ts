import bcrypt from "bcrypt";
import { Prisma, PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

class authService {
  prisma = new PrismaClient();

  async signUp(email: string, name: string, password: string) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    try {
      await this.prisma.user.create({
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

      return;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw new Error("email already exists");
        }
      }

      return;
    }
  }

  async signIn(email: string, password: string) {
    try {
      const user = await this.prisma.user.findFirst({
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

      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET not defined");
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        issuer: "catcare",
        expiresIn: "7d",
        algorithm: "HS256",
      });

      return token;
    } catch (error) {
      throw error;
    }
  }
}
export default new authService();
