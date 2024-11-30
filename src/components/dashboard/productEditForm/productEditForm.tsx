import { InventoryData } from "../../types/dashboard";
import style from "./productForm.module.scss";
import { useState } from "react";

type ProductEditFormProps = {
  onClose: () => void;
  onSave: (product: InventoryData) => void;
  product: InventoryData;
};

const ProductEditForm = ({
  onClose,
  product,
  onSave,
}: ProductEditFormProps) => {
  const [productData, setProductData] = useState<InventoryData>(product);

  const handleProductDataUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setProductData((prev) => {
      // get new product value if id is price or quantity

      let productValue = prev.value;
      if (id === "price") {
        productValue = Number(value) * prev.quantity;
      } else if (id === "quantity") {
        productValue = Number(value) * prev.price;
      }
      return {
        ...prev,
        [id]: value,
        value: productValue,
      };
    });
  };

  const handleSave = () => {
    onSave(productData);
  };

  return (
    <div className={style.editProduct}>
      <div className={style.header}>
        <div className={style.detail}>
          <h3 className={style.title}>Edit Product</h3>
          <p>{productData.name}</p>
        </div>
        <div className={style.close} onClick={onClose}>
          <button>x</button>
        </div>
      </div>
      <div className={style.form}>
        <div className={style.inputWrapper}>
          <label htmlFor="name">Category</label>
          <input
            onChange={handleProductDataUpdate}
            value={productData.category}
            type="text"
            id="category"
          />
        </div>
        <div className={style.inputWrapper}>
          <label htmlFor="name">Price</label>
          <input
            onChange={handleProductDataUpdate}
            value={productData.price}
            type="number"
            id="price"
          />
        </div>
        <div className={style.inputWrapper}>
          <label htmlFor="name">Quantity</label>
          <input
            onChange={handleProductDataUpdate}
            value={productData.quantity}
            type="number"
            id="quantity"
          />
        </div>
        <div className={style.inputWrapper}>
          <label htmlFor="name">Value</label>
          <input value={productData.value} type="number" disabled id="name" />
        </div>
      </div>
      <div className={style.footer}>
        <button className={style.cancel} onClick={onClose}>
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={
            productData.category === "" || Number(productData.price) === 0
              ? true
              : false
          }
          className={style.save}
        >
          Save
        </button>
      </div>
    </div>
  );
};
export default ProductEditForm;
