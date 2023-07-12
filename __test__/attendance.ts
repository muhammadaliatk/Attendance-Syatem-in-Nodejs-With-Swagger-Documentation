import prisma from "../client";
interface Attendance {
  id: number;
  date: Date;
  presentStatus: boolean;
  userId: number;
}
interface Users {
  id: number;
  username: string;
  email: string;
  password: string;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
  attendance: Array<Attendance>;
}
export const addAttendance = async (attendance: Attendance) => {
  try {
    const addAttendance = await prisma.attendance.create({
      data: attendance,
    });
    return addAttendance;
  } catch (error) {
    return error;
  }
};
export const updateAttendance = async (attendance: Attendance) => {
  try {
    const id = attendance.id;

    let updateAttendance = await prisma.attendance.update({
      where: {
        id: Number(id),
      },
      data: {
        presentStatus: attendance.presentStatus,
        userId: attendance.userId,
      },
    });
    return updateAttendance;
  } catch (error) {
    return error;
  }
};
export const summary = async (users: Users) => {
  try {
    const attendance = await prisma.user.findMany({
      include: {
        attendance: true,
      },
    });
    return attendance;
  } catch (error) {
    console.log(error);
  }
};
export const getUserAttendance = async (users : Users) => {
  try {
    const attendance = await prisma.user.findUnique({
      where: {
        id: users.id,
      },
      include: {
        attendance: true,
      },
    });
    return attendance;
  } catch (error) {
    console.log(error);
  }
};


