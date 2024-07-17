import { axiosInstance } from "@/lib/axiosInstance";
import { Product } from "@/modules/products/type";
import { useLoaderData } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export async function loader() {
  try {
    const response = await axiosInstance.get("/products");
    console.log("Data fetched:", response.data);
    const products: Product[] = await response.data;
    return { products };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { products: [] };
  }
}

export function ProductsRoute() {
  const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div>
      <h1 className="text-lg font-bold">Products</h1>
      {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
      <div className="grid grid-cols-3 gap-2">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="overflow-hidden rounded-md">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-auto w-auto object-cover transition-all hover:scale-105"
                />
              </div>
              <CardTitle className="line-clamp-2 text-lg">
                {product.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-2">{product.description}</p>
              <CardDescription className="text-lg font-bold">
                Rp {product.price}
              </CardDescription>
            </CardContent>
            <CardFooter className="justify-center">
              <Button>Add to cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
