import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

interface IRequest {
	user_id: string;
	avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: UsersRepository
	) {}

	async execute({ user_id, avatar_file }: IRequest): Promise<void> {
		const user = await this.usersRepository.findById(user_id);
		if (user.avatar) {
			await deleteFile(`./tmp/avatar/${user.avatar}`);
		}
		user.avatar = avatar_file;
		return this.usersRepository.create(user);
	}
}

export { UpdateUserAvatarUseCase };
