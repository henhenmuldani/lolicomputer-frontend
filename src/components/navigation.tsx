import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { cookies } from "@/modules/auth";
import { ShoppingBasket } from "lucide-react";

export function Navigation() {
  const navigate = useNavigate();
  const token = cookies.get("token");

  const handleLogout = () => {
    cookies.remove("token");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between">
      <Link to="/" className="flex items-center justify-center">
        <img
          src="logo_lolicomputer.png"
          alt="logo lolicomputer"
          className="h-16"
        />
        <h1 className="text-xl font-bold">Lolicomputer</h1>
      </Link>
      <nav className="flex items-center space-x-4">
        <Link to="/products">
          <p>Products</p>
        </Link>

        {token ? (
          <Link to="/cart">
            <ShoppingBasket />
          </Link>
        ) : null}

        {token ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </nav>
    </div>
  );
}
