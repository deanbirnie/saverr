import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // prisma client queries here
  const users = await prisma.user.findMany();
  console.log(users);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    console.log("Disconnecting...");
    await prisma.$disconnect();
  });
