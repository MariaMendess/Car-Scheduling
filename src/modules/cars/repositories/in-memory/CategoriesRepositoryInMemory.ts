import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
	categories: Category[] = [];

	create({ name, description }: ICreateCategoryDTO): void {
		const category = new Category();

		Object.assign(category, { name, description });

		this.categories.push(category);
	}
	async findByName(name: string): Promise<Category> {
		const category = this.categories.find((category) => category.name === name);
		return category;
	}
	list(): Promise<Category[]> {
		const all = this.categories;
		return Promise.resolve(all);
	}
}

export { CategoriesRepositoryInMemory };
