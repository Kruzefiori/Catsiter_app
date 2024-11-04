import bcrypt from "bcrypt";
import prisma from "../client";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";

class authService {
  prisma = prisma;

  async signUp(email: string, name: string, password: string) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    try {
      const existingUser = await this.prisma.user.findFirst({
        where: { email },
        include: { UserCredentials: true },
      });

      if (existingUser) {
        // Verificar se o usuário pode atualizar suas credenciais
        if (!existingUser.googleId || existingUser.UserCredentials.length > 0) {
          throw new Error("email already exists");
        }

        // Atualizar o usuário existente com as novas credenciais
        await this.prisma.user.update({
          where: { email },
          data: {
            name,
            UserCredentials: {
              upsert: {
                where: { userId: existingUser.id },
                create: {
                  passwordHash,
                  salt,
                },
                update: {
                  passwordHash,
                  salt,
                },
              },
            },
          },
        });
      } else {
        // Criar um novo usuário
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
      }

      return;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw new Error("email already exists");
        }
      }

      throw err;
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

      if (user.UserCredentials.length === 0) {
        throw new Error("please sign in with your google account");
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

  async googleSignIn(email: string, name: string, googleId: string) {
    try {
      let user = await this.prisma.user.findFirst({
        where: { email },
      });

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email,
            name,
            googleId,
          },
        });
      } else {
        // Atualizar o googleId se o usuário já existir
        user = await this.prisma.user.update({
          where: { email },
          data: { googleId },
        });
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
      throw new Error("Erro ao salvar usuário no banco de dados");
    }
  }
}

export default new authService();
