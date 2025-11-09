import { Grid, Plus, Search, Table } from "lucide-react";
import ProductTable from "../../components/ProductTable";
import ProductGrid from "../../components/ProductGrid";
import { ProductModal } from "../../components/ProductModal";
import { useDebouceSearch } from "../../hooks";
import { PRODUCTS_DATA } from "../../assets/data/productData";
import { useState } from "react";
const Products = () => {
  const [products, setProducts] = useState(PRODUCTS_DATA);
  const [mode, setMode] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const debouncedSearch = useDebouceSearch(searchValue, 500); //5sec stop typing customHook

  const filteredProducts = products.filter((product) => {
    const searchLower = debouncedSearch.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  });

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsAddMode(false);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setIsAddMode(true);
  };

  const handleSave = (updatedProduct) => {
    if (isAddMode) {
      const maxId =
        products.length > 0 ? Math.max(...products.map((p) => p.id)) : 0;
      const newProduct = { ...updatedProduct, id: maxId + 1 };
      setProducts((prev) => [...prev, newProduct]);
    } else {
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
    }
    setEditingProduct(null);
    setIsAddMode(false);
  };

  const handleClose = () => {
    setEditingProduct(null);
    setIsAddMode(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <>
      <div className="app-container">
        <div className="content-wrapper">
          <h1 className="page-title">Products</h1>

          <div className="search-container">
            <div className="search-controls">
              <div className="search-wrapper">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search products by name, category, or tags..."
                  className="search-input"
                />
              </div>

              <div className="header-actions">
                <button onClick={handleAdd} className="add-product-btn">
                  <Plus size={18} />
                  <span>Add Product</span>
                </button>

                <button
                  onClick={() => setMode(!mode)}
                  className="view-toggle-btn"
                >
                  {mode ? <Grid size={18} /> : <Table size={18} />}
                  <span>{mode ? "Grid View" : "Table View"}</span>
                </button>
              </div>
            </div>

            <div className="results-count">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-results">
              <p className="no-results-text">
                No products found matching your search.
              </p>
            </div>
          ) : mode ? (
            <ProductTable
              products={filteredProducts}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <ProductGrid
              products={filteredProducts}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}

          {(editingProduct || isAddMode) && (
            <ProductModal
              product={editingProduct}
              onClose={handleClose}
              onSave={handleSave}
              isEdit={!!editingProduct}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
