import { atom } from "jotai";

export interface Options {
  email: boolean;
  passkey: boolean;
  socialProviders: string[];
  magicLink: boolean;
  signUp: boolean;
  label: boolean;
  rememberMe: boolean;
  forgetPassword: boolean;
}

export const optionsAtom = atom<Options>({
  email: true,
  passkey: false,
  socialProviders: ["google", "github"],
  magicLink: false,
  signUp: true,
  label: true,
  rememberMe: true,
  forgetPassword: true,
});
