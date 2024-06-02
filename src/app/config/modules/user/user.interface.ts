type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: "admin" | "student" | "faculty";
  status: "is-progress" | "blocked";
  isDeleted: boolean;
};
