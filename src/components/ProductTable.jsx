import React from "react";
import { Edit2, Trash2 } from "lucide-react";

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="product-table">
          <thead className="table-header">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {products.map((product) => (
              <tr key={product.id}>
                <td style={{ color: "#6b7280" }}>{product.id}</td>
                <td>
                  <div className="product-name">{product.name}</div>
                  <div className="product-desc">{product.description}</div>
                </td>
                <td className="category-text">{product.category}</td>
                <td className="price-text">₹{product.price}</td>
                <td style={{ color: "#6b7280" }}>{product.stock}</td>
                <td>
                  <span
                    className={`status-badge ${
                      product.isActive ? "status-active" : "status-inactive"
                    }`}
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => onEdit(product)}
                      className="action-btn edit-btn"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="action-btn delete-btn"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProductTable;
