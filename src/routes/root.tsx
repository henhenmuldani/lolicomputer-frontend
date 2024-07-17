import { Outlet } from "react-router-dom";
import { Navigation } from "@/components/navigation";

export function RootRoute() {
  return (
    <div className="m-4 mx-auto max-w-2xl">
      <Navigation />
      <Outlet />
    </div>
  );
}
