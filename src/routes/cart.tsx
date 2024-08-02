import { axiosInstance } from "@/lib/axiosInstance";
import { cookies } from "@/modules/auth";
import { useLoaderData } from "react-router-dom";

type Cart = {
  id: number;
  items: [];
};

export async function loader() {
  try {
    const token = cookies.get("token");
    const response = await axiosInstance.get("/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Data fetched:", response.data);
    const cart: Cart = response.data;
    return { cart };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export function CartRoute() {
  const cart = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  return (
    <div>
      <h1>Cart</h1>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
    </div>
  );
}
