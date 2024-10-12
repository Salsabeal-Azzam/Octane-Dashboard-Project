export type UserData = {
  id: string;
  username: string;
  email: string;
  role: "Admin" | "User" | "Guest";
  isActive: boolean;
};

export type UserApiResponse = {
  data: UserData[];
};
