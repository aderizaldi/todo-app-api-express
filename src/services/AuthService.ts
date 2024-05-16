import {
  INTERNAL_SERVER_ERROR_SERVICE_RESPONSE,
  ServiceResponse,
  UNAUTHORIZED_SERVICE_RESPONSE,
} from "$entities/Service";
import Logger from "$pkg/logger";
import { UserLoginDTO, UserRegisterDTO } from "$entities/User";
import { prisma } from "$utils/prisma.utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// secretKey from env
const secretKey = process.env.JWT_SECRET || "secret";

// Register function
export async function register(
  user: UserRegisterDTO
): Promise<ServiceResponse<{}>> {
  try {
    const { email, fullName, password } = user;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    await prisma.user.create({
      data: {
        email,
        fullName,
        password: hashedPassword,
      },
    });

    return {
      status: true,
    };
  } catch (err) {
    Logger.error(`TodoService.update : ${err}`);
    return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}

// Login function
export async function login(user: UserLoginDTO): Promise<ServiceResponse<{}>> {
  try {
    // Find the user by email
    const { email, password } = user;
    const userLogin = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // If user not found, return null
    if (!userLogin) {
      return UNAUTHORIZED_SERVICE_RESPONSE;
    }

    // Compare the password
    const isPasswordMatch = await bcrypt.compare(password, userLogin.password);
    if (!isPasswordMatch) {
      return UNAUTHORIZED_SERVICE_RESPONSE;
    }

    const token = jwt.sign({ id: userLogin.id }, secretKey, {
      expiresIn: "1h",
    });

    return {
      status: true,
      data: { user, token },
    };
  } catch (err) {
    Logger.error(`TodoService.update : ${err}`);
    return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}
