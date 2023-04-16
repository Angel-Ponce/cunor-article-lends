import { User } from "@prisma/client";
import { atom } from "jotai";

const user = atom<Omit<Omit<User, "password">, "deletedAt"> | null>(null);

export { user };
