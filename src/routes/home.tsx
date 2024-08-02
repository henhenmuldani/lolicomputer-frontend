import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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

export function HomeRoute() {
  const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div className="flex flex-col items-center">
      <Carousel className="w-1/2">
        <CarouselContent>
          {products.slice(0, 3).map((product) => (
            <CarouselItem key={product.id}>
              <Link to={`/products/${product.slug}`} key={product.id}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square flex-col items-center justify-center p-6">
                      <div className="overflow-hidden rounded-md">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-auto w-auto object-cover transition-all hover:scale-105"
                        />
                      </div>
                      <span className="text-xl font-semibold">
                        {product.name}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div>
        <h1 className="text-lg font-bold">Products</h1>
        {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
        <div className="grid grid-cols-3 gap-2">
          {products.slice(0, 3).map((product) => (
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
    </div>
  );
}
