const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserService {
  async registerUser(email, name, password) {
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

module.exports = new UserService();