import React from "react";
import { Edit2, Trash2 } from "lucide-react";

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="product-card">
      <div className="card-header">
        <h3 className="card-title">{product.name}</h3>
        <span
          className={`status-badge ${
            product.isActive ? "status-active" : "status-inactive"
          }`}
        >
          {product.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <p className="card-description">{product.description}</p>

      <div className="card-details">
        <div className="detail-row">
          <span className="detail-label">Price:</span>
          <span className="detail-value">₹{product.price}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Stock:</span>
          <span className="detail-value">{product.stock} units</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Category:</span>
          <span className="category-text">{product.category}</span>
        </div>
      </div>

      <div className="tags-container">
        {product.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="card-actions">
        <button
          onClick={() => onEdit(product)}
          className="card-btn edit-card-btn"
        >
          <Edit2 size={14} />
          <span>Edit</span>
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="card-btn delete-card-btn"
        >
          <Trash2 size={14} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

const ProductGrid = ({ products, onEdit, onDelete }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
