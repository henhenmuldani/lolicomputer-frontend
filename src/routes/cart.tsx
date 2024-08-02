import { axiosInstance } from "@/lib/axiosInstance";
import { cookies } from "@/modules/auth";

export async function loader() {
  try {
    const token = cookies.get("token");
    const response = await axiosInstance.get("/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Data fetched:", response.data);
    return null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export function CartRoute() {
  return <div>cart</div>;
}
