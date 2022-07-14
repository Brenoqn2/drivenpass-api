import prisma from "../database.js";

async function register(email: string, password: string) {
  await prisma.users.create({
    data: {
      email,
      password,
    },
  });
}

async function checkEmail(email: string) {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  return user;
}

const authRepository = { register, checkEmail };
export default authRepository;
