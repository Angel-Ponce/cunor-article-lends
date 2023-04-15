import { prisma } from "../prisma/client";
import { PrismaClient, User } from "@prisma/client";

export interface Context {
  prisma: PrismaClient;
  user?: User;
}

export const context = {
  prisma,
};
