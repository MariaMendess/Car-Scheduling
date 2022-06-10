import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
	sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError("Token is missing", 401);
	}

	const [, token] = authHeader.split(" ");

	try {
		const { sub: user_id } = verify(token, "38cd4a0f20ccd974b57785092bf4fc59") as IPayload;
		const usersRepository = new UsersRepository();
		const user = usersRepository.findById(user_id);

		if (!user) {
			throw new AppError("User not found", 401);
		}
		next();
	} catch (error) {
		throw new AppError("Invalid token", 401);
	}
}
