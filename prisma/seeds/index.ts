import { PrismaClient } from "@prisma/client";
import { seedAdmin } from "./seedAdmin";

const prisma = new PrismaClient();

async function seed() {
  //call function from seedAdmin.ts file
  await seedAdmin(prisma);
}

seed().then(() => {
  console.log("ALL SEEDING DONE");
});
