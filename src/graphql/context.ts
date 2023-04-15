import { prisma } from "../prisma/client";
import { PrismaClient } from "@prisma/client";

export interface Context {
  prisma: PrismaClient;
  token?: string;
}

export const context = {
  prisma,
};
