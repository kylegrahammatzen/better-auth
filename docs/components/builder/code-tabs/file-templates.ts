import { js_beautify } from "js-beautify";
import { signInString } from "../sign-in";
import { signUpString } from "../sign-up";

export interface AuthFile {
  id: string;
  name: string;
  content: string;
}

export interface AuthOptions {
  email?: boolean;
  forgetPassword?: boolean;
  magicLink?: boolean;
  passkey?: boolean;
  socialProviders: string[];
}

export const generateAuthFile = (options: AuthOptions): string => `
import { betterAuth } from 'better-auth';
${options.magicLink || options.passkey ? `import { ${options.magicLink ? "magicLink, " : ""}${options.passkey ? "passkey" : ""} } from "better-auth/plugins";` : ''}

export const auth = betterAuth({
  ${options.socialProviders.length ? `socialProviders: ${JSON.stringify(
    options.socialProviders.reduce((acc, provider) => ({
      ...acc,
      [provider]: {
        clientId: `process.env.${provider.toUpperCase()}_CLIENT_ID`,
        clientSecret: `process.env.${provider.toUpperCase()}_CLIENT_SECRET`,
      },
    }), {}
  ), null, 2).replace(/"/g, '')},` : ''}${options.magicLink || options.passkey ? `plugins: [
    ${options.magicLink ? 'magicLink(),' : ''}
    ${options.passkey ? 'passkey(),' : ''}
  ]` : ''}
});
`;

export const generateAuthClientFile = (options: AuthOptions): string => `
import { createAuthClient } from "better-auth/react";
${options.magicLink || options.passkey ? `import { ${options.magicLink ? "magicLinkClient, " : ""}${options.passkey ? "passkeyClient" : ""} } from "better-auth/client/plugins";` : ''}
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,${options.magicLink || options.passkey ? `
  plugins: [${options.magicLink ? 'magicLinkClient(), ' : ''}${options.passkey ? 'passkeyClient()' : ''}],` : ''}
});

export const { signIn, signOut, signUp, useSession } = authClient;
`;

export const createInitialFiles = (options: AuthOptions): AuthFile[] => {
  const files: AuthFile[] = [
    {
      id: '1',
      name: 'auth.ts',
      content: generateAuthFile(options)
    },
    {
      id: '2',
      name: 'auth-client.ts',
      content: generateAuthClientFile(options)
    },
    {
      id: '3',
      name: 'sign-in.tsx',
      content: signInString(options)
    }
  ];

  if (options.email) {
    files.push({
      id: '4',
      name: 'sign-up.tsx',
      content: signUpString
    });
  }

  return files;
};

export const updateFile = (
  files: AuthFile[],
  fileId: string,
  updates: Partial<AuthFile>
): AuthFile[] => {
  return files.map(file => 
    file.id === fileId ? { ...file, ...updates } : file
  );
};

export const beautifyCode = (code: string): string => {
  return js_beautify(code, { indent_size: 2 });
};

