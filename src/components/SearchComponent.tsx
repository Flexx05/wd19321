import { useState } from "react";
import IProduct from "../interface/product";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

interface SearchComponentProps {
  onProductSelect: (product: IProduct) => void;
}
function SearchComponent({ onProductSelect }: SearchComponentProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<IProduct[]>([]);

  const getProducts = async () => {
    if (!searchTerm) {
      setSuggestions([]);
      setProducts([]);
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/products?q=${searchTerm}`
      );
      if (Array.isArray(data)) {
        setProducts(data);
        setSuggestions(data.slice(0, 5));
      } else {
        toast.error("Lỗi", data);
        setProducts([]);
        setSuggestions([]);
      }
    } catch (error) {
      toast.error((error as AxiosError).message);
      setProducts([]);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };
  const handleProductSelect = (product: IProduct) => {
    setSearchTerm(product.title);
    setSuggestions([]);
    if (onProductSelect) {
      onProductSelect(product);
    }
  };
  return (
    <div>
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-light" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchComponent;
