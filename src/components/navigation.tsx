import { Button } from "./ui/button";
import { Link } from "react-router-dom";
export function Navigation() {
  return (
    <div className="flex items-center justify-between">
      <h1>LoliComputer</h1>
      <nav className="flex items-center space-x-4">
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/products">
          <p>Products</p>
        </Link>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </nav>
    </div>
  );
}
