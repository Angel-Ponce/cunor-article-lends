import { atom } from "jotai";
import { ReactNode } from "react";

interface App {
  title?: string;
  icon?: ReactNode;
}

const app = atom<App>({});

export { app };
