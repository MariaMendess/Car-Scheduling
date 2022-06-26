import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface IResquest {
	name: string;
	description: string;
}

@injectable()
class CreateCategoryUseCase {
	constructor(
		@inject("CategoriesRepository")
		private categoriesRepository: ICategoriesRepository
	) {}

	async execute({ name, description }: IResquest): Promise<void> {
		const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

		if (categoryAlreadyExists) {
			throw new AppError("Category Already Exists!");
		}

		this.categoriesRepository.create({ name, description });
	}
}

export { CreateCategoryUseCase };
