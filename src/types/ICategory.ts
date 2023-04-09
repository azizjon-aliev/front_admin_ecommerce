export interface ICategory {
    id?: number;
    title: string;
}

export interface ICategoryDetails extends ICategory {
    description: string;
    image: string;
    parent: Array<ICategory>;
}