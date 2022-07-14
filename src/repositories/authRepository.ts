import prisma from "../database.js";

async function register(email: string, password: string) {
  await prisma.users.create({
    data: {
      email,
      password,
    },
  });
}

async function getUser(email: string) {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  return user;
}

async function createSession(userId: number, token: string) {
  await prisma.sessions.create({
    data: {
      userId,
      token,
    },
  });
}

const authRepository = { register, getUser, createSession };
export default authRepository;
