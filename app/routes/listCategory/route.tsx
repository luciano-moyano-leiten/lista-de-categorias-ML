import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type Category = {
    id: string;
    name: string;
};

export const loader: LoaderFunction = async () => {
    const response = await fetch("https://api.mercadolibre.com/sites/MLA/categories");
    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }
    const categories: Category[] = await response.json();
    return { categories };
};

export default function ListCategories() {
    const { categories } = useLoaderData<{ categories: Category[] }>();

    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <strong>ID:</strong> {category.id} <br />
                        <strong>Name:</strong> {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}