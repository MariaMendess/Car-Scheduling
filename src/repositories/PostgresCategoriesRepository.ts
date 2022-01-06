import { Category } from "../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";

class PostregresCategoriesRepsitory implements ICategoriesRepository {
    create({name, description }: ICreateCategoryDTO): void {
        return null
    }
    findByName(name: string): Category {
        return null
    }
    list(): Category[] {
        return null
    }
}

export { PostregresCategoriesRepsitory }