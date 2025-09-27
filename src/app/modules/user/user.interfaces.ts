
export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    DEACTIVATED = 'DEACTIVATED',
    BLOCKED = 'BLOCKED',
    RESTRICTRED = 'RESTRICTED'
}

export interface IUser{
    fullName: string,
    email: string,
    password: string,
    phone: string,
    picture: string,
}