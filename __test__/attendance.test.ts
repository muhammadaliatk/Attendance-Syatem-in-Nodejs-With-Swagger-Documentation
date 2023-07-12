import { prismaMock } from "./../singleton";
import { addAttendance, updateAttendance, summary,getUserAttendance } from "./attendance";
const attendance: any = {
  id: 1,
  date: "2022-08-23T13:19:31.945Z",
  presentStatus: true,
  userId: 1
};
const users: any = [
  {
    id: 1,
    username: "xyz",
    email: "xyz@gmail",
    password: "1234",
    lastLogin: "2022-08-23T13:19:31.945Z",
    createdAt: "2022-09-23T13:19:31.945Z",
    updatedAt: "2022-10-23T13:19:31.945Z",
    attendance: [{ id: 1, date: "2022-08-23T13:19:31.945Z", presentStatus: true, userId: 1 }]
  },
  {
    id: 2,
    username: "abc",
    email: "abc@gmail",
    password: "1234",
    lastLogin: "2022-08-23T13:19:31.945Z",
    createdAt: "2022-09-23T13:19:31.945Z",
    updatedAt: "2022-10-23T13:19:31.945Z",
    attendance: [{ id: 2, date: "2022-08-23T13:19:31.945Z", presentStatus: false, userId: 2 }]
  }
];
describe("test Attendance ", () => {
  test("should addAttendance", async () => {
    prismaMock.attendance.create.mockResolvedValue(attendance);
    await expect(addAttendance(attendance)).resolves.toEqual(attendance);
  });
  test("should updated", async () => {
    prismaMock.attendance.update.mockResolvedValue(attendance);
    await expect(updateAttendance(attendance)).resolves.toEqual(attendance)
  });
  test("should get summary", async () => {
    prismaMock.user.findMany.mockResolvedValue(users);
    await expect(summary(users)).resolves.toEqual(users)
  });
  test("should get userAttendance by ID", async () => {
    prismaMock.user.findUnique.mockResolvedValue(users);
    await expect(getUserAttendance(users)).resolves.toEqual(users)
  });
});