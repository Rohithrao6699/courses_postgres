export type SignupData = {
  email: string;
  password: string;
  name?: string;
  role: "user" | "admin";
};

export type SignInData = {
  email: string;
  password: string;
};
