import { axiosInstance } from "@/lib/axiosInstance";
import { Product } from "@/modules/products/type";
import { useLoaderData, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
          <Link to={`/products/${product.slug}`} key={product.id}>
            <Card>
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
              {/* <CardFooter className="justify-center">
              <Button>Add to cart</Button>
            </CardFooter> */}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
