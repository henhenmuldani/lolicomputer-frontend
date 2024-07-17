import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ProductRoute() {
  return (
    <Card className="m-4">
      <CardHeader>
        <div className="flex justify-center overflow-hidden rounded-md">
          <img
            src={"https://placehold.co/400x400"}
            alt={"name"}
            className="h-auto w-auto object-cover transition-all hover:scale-105"
          />
        </div>
        <CardTitle className="line-clamp-2 text-lg">name</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2">description</p>
        <CardDescription className="text-lg font-bold">
          Rp price
        </CardDescription>
      </CardContent>
      <CardFooter className="justify-end">
        <Button>Add to cart</Button>
      </CardFooter>
    </Card>
  );
}
