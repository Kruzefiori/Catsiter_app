import bcrypt from 'bcrypt';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

class UserService {
  async registerUser(email: string, name: string, password: string): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        credentials: {
          create: {
            passwordHash,
            salt,
          },
        },
      },
    });

    return user;
  }
}

export default new UserService();
