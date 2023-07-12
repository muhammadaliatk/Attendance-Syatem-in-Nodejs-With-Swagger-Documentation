import prisma from "../client";
const jsonwebtoken = require("jsonwebtoken");
interface Users {
  id: number;
  username: string;
  email: string;
  password: string;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const createUser = async (users: Users) => {
  try {
    var user = await prisma.user.create({
      data: users,
    });
    if (user) {
      var tokenGenerator: any = {
        id: user.id,
        email: user.email,
        name: user.username,
      };
      let token = generateAccessToken(tokenGenerator);
      if (token) {
        return true;
      } else {
        return false;
      }
    } else {
      console.log("user not created");
    }
  } catch (error) {
    return error;
  }
};
export const getUser = async () => {
    try {
      const user = await prisma.user.findMany();
      return user
    } catch (error) {
      return error;
    }
  };
  export const updateUser = async (users:Users) => {
    try {
      const id  = users.id;
  
      let user = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          username: users.username,
          email: users.email,
        },
      });
      return user;
    } catch (error) {
      return error
    }
  };
  export const deleteUser = async (users:Users) => {
    try {
      const id  = users.id;
      const user = await prisma.user.delete({
        where: {
          id: Number(id),
        },
      });
      return user;
    } catch (error) {
      return error
    }
  };
function generateAccessToken(token: any) {
  return jsonwebtoken.sign(token, "secret");
}
