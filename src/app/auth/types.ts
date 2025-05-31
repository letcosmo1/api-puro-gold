export type LoginResponse = {
  success: boolean,
  token: string, 
  user: {
    id: string,
    email: string 
  }
}