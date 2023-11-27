export enum EnumUserRole {
  admin = 'admin',
  garcom = 'garcom',
  cozinha = 'cozinha',
}

export type UserRole = keyof typeof EnumUserRole;
