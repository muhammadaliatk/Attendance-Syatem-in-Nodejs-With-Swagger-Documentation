import { prismaMock } from "./../singleton";
import { createUser,getUser, updateUser, deleteUser} from "./user";
const users: any = {
    id: 1,
    username: "xyz",
    email: "xyz@gmail",
    password: "1234",
    lastLogin: "2022-08-23T13:19:31.945Z",
    createdAt: "2022-09-23T13:19:31.945Z",
    updatedAt: "2022-10-23T13:19:31.945Z",
  };
  describe("test users ", () => {
    test("should create users", async () => {
      prismaMock.user.create.mockResolvedValue(users);
      await expect(createUser(users)).resolves.toEqual(true);
    });
    test("should get all user", async () => {
        prismaMock.user.findMany.mockResolvedValue(users);
        await expect(getUser()).resolves.toEqual(users);
    });
    test("should updated", async () => {
        prismaMock.user.update.mockResolvedValue(users);
        await expect(updateUser(users)).resolves.toEqual(users)
    });
    test("should updated", async () => {
        prismaMock.user.delete.mockResolvedValue(users);
        await expect(deleteUser(users)).resolves.toEqual(users)
    });
  });