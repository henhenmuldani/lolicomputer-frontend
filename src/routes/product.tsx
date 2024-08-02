import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axiosInstance";
import { Product } from "@/modules/products/type";
import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const { slug } = params;
    const response = await axiosInstance.get(`/products/${slug}`);
    console.log("Data fetched:", response.data);
    const product: Product = await response.data;
    return { product };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { product: {} as Product };
  }
}

export function ProductRoute() {
  const { product } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <Card className="m-4">
      {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
      <CardHeader>
        <div className="flex justify-center overflow-hidden rounded-md">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-auto w-auto object-cover transition-all hover:scale-105"
          />
        </div>
        <CardTitle className="line-clamp-2 text-lg">{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2">{product.description}</p>
        <CardDescription className="text-lg font-bold">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(product.price)}
        </CardDescription>
      </CardContent>
      <CardFooter className="justify-end">
        <Link to={`/cart`} key={product.id}>
          <Button>Add to cart</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
