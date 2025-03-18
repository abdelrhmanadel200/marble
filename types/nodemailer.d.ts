declare module "nodemailer" {
  export function createTransport(options: any): any;
  export const createTestAccount: any;
  export const getTestMessageUrl: any;
}
