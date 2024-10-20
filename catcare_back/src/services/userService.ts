import bcrypt from 'bcrypt';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

interface body {
  email: string;
  password: string;
}

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
  
  async loginUser(email: string, password: string): Promise<User | null> {
  try{
    //Verificar se o usuário existe
    const user = await prisma.user.findFirst({
      where: {email},
      include: {credentials: true} //inclui as credenciais do usuário
    });

    if (!user) {
      return res.status(404).json({error: 'Usuário não encontrado. Considere criar uma conta.'});
    }

    // Verifica se as credenciais existem
    // if (!user.credentials) {
    //   return res.status(400).json({ error: 'Credenciais não encontradas' });
    // }
    
    const isMatch = await bcrypt.compare(password, user.credentials.passwordHash);

    if (!isMatch) {
      return res.status(401).json({error: 'Senha incorreta'});
    }

    // Login bem-sucedido
    return res.status(200).json({ message: 'Login bem-sucedido', user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }

}

export default new UserService();
