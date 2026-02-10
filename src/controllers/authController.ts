import { Request, Response } from 'express';
import { comparePassword, generateToken } from '../utils/auth';
import { User } from '../models/User'; // Importa a classe User

export const login = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  try {
    // Usa o método estático da classe User
    const user = await User.getUserByName(name);
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compara a senha fornecida com a senha armazenada
    const isPasswordValid = await comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Gera um token JWT
    const token = generateToken(user.id, user.name, user.role);  // Note: user.name, não user.username
    
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
};