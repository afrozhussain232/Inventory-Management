import style from "./dashboard.module.scss";
import Metrics from "./metrics/Metrics";
import InventoryTable from "./inventoryTable/InventoryTable";
import Modal from "../common/modal/Modal";
import ProductEditForm from "./productEditForm/productEditForm";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ReactComponent as Loading } from "../../assets/icons/loading.svg";
import {
  InventoryData,
  InventoryDataResponse,
  MetricsData,
} from "../types/dashboard";

const Dashboard = () => {
  const [inventory, setInventory] = useState<InventoryData[]>([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<InventoryData | null>();

  const { isLoading, data, error } = useQuery("inventoryData", () =>
    fetch("https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory").then(
      (res) => res.json()
    )
  );

  useEffect(() => {
    if (data) {
      handleInventory(data);
    }
  }, [data]);

  const handleInventory = (data: InventoryDataResponse[]) => {
    // convert price and quantity, value to number
    const inventoryData = data.map((item) => ({
      ...item,
      price: Number(item.price.replace("$", "")),
      quantity: Number(item.quantity),
      value: Number(item.value.replace("$", "")),
      disabled: false,
    }));
    setInventory(inventoryData);
  };

  const getMetrics = useCallback((): MetricsData => {
    // calculate total products, total value, total categories, out of stock products from inventory which are not disabled
    const totalProducts = inventory.filter((item) => !item.disabled).length;
    const totalValue = inventory
      .filter((item) => !item.disabled)
      .reduce((acc, item) => acc + item.value, 0);
    const totalCategories = new Set(
      inventory.filter((item) => !item.disabled).map((item) => item.category)
    ).size;
    const OutOfStockProducts = inventory.filter(
      (item) => !item.disabled && item.quantity === 0
    ).length;

    return {
      totalProducts,
      totalValue,
      totalCategories,
      OutOfStockProducts,
    };
  }, [inventory]);

  const handleOnEdit = (item: InventoryData) => {
    setShowEditForm(true);
    setSelectedProduct(item);
  };

  const handleDeleteProduct = (name: string) => {
    const updatedInventory = inventory.filter((item) => item.name !== name);
    setInventory(updatedInventory);
  };

  const handleSave = (product: InventoryData) => {
    // update product in inventory
    const updatedInventory = inventory.map((item) =>
      item.name === product.name ? product : item
    );
    setInventory(updatedInventory);
    setShowEditForm(false);
    setSelectedProduct(null);
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedProduct(null);
  };

  const handleToggleDisable = (name: string) => {
    const updatedInventory = inventory.map((item) =>
      item.name === name ? { ...item, disabled: !item.disabled } : item
    );
    setInventory(updatedInventory);
  };
  if (isLoading)
    return (
      <div className={style.loadingState}>
        <Loading />
      </div>
    );
  else if (error && inventory.length === 0) {
    return (
      <div className={style.loadingState}>
        <h1>Something went wrong</h1>
      </div>
    );
  } else {
    return (
      <div className={style.dashboard}>
        <div className={style.header}>
          <h1 className={style.title}>Inventory stats</h1>
          <Metrics metrics={getMetrics()} />
        </div>
        <InventoryTable
          onToggleDisable={handleToggleDisable}
          onDelete={handleDeleteProduct}
          onEdit={handleOnEdit}
          inventoryItems={inventory}
        />
        <Modal isOpen={showEditForm}>
          {selectedProduct && (
            <ProductEditForm
              onSave={handleSave}
              product={selectedProduct as InventoryData}
              onClose={handleCloseEditForm}
            />
          )}
        </Modal>
      </div>
    );
  }
};

export default Dashboard;
