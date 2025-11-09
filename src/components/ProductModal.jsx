import React, { useState } from "react";

import { Check, X } from "lucide-react";

export const ProductModal = ({ product, onClose, onSave, isEdit }) => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState(
    product || {
      id: Date.now(),
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      isActive: true,
      tags: [],
    }
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = "Name is required";
    }

    if (!formData.category || formData.category.trim() === "") {
      newErrors.category = "Category is required";
    }

    // Price validation
    if (!formData.price || formData.price === "") {
      newErrors.price = "Price is required";
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    // Stock validation
    if (
      formData.stock !== "" &&
      (isNaN(formData.stock) || Number(formData.stock) < 0)
    ) {
      newErrors.stock = "Stock must be a non-negative number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const dataToSave = {
        ...formData,
        price: Number(formData.price),
        stock: formData.stock === "" ? 0 : Number(formData.stock),
      };
      onSave(dataToSave);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h2>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? "error" : ""}`}
              placeholder="Enter product name"
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`form-input ${errors.price ? "error" : ""}`}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
              {errors.price && (
                <div className="error-message">{errors.price}</div>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className={`form-input ${errors.stock ? "error" : ""}`}
                placeholder="0"
                min="0"
              />
              {errors.stock && (
                <div className="error-message">{errors.stock}</div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Category *</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`form-input ${errors.category ? "error" : ""}`}
              placeholder="Enter category"
            />
            {errors.category && (
              <div className="error-message">{errors.category}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="form-textarea"
              placeholder="Enter product description (optional)"
            />
          </div>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="checkbox-input"
            />
            <label className="form-label" style={{ margin: 0 }}>
              Active
            </label>
          </div>

          <div className="modal-actions">
            <button onClick={handleSubmit} className="save-btn">
              <Check size={18} />
              Save Changes
            </button>
            <button onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
