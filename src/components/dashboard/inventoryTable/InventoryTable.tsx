import style from "./inventoryTable.module.scss";
import { ReactComponent as Edit } from "../../../assets/icons/edit.svg";
import { ReactComponent as Delete } from "../../../assets/icons/delete.svg";
import { ReactComponent as Vis } from "../../../assets/icons/visibility.svg";
import { ReactComponent as VisOff } from "../../../assets/icons/visibility_off.svg";
import { useContext } from "react";
import { userRoleContext } from "../../../context/userRoleContext";
import { InventoryData } from "../../types/dashboard";

type InventoryTableProps = {
  inventoryItems: InventoryData[];
  onEdit: (product: InventoryData) => void;
  onDelete: (name: string) => void;
  onToggleDisable: (name: string) => void;
};
interface Column {
  key: keyof InventoryData;
  label: string;
}

const InventoryTable = ({
  inventoryItems,
  onEdit,
  onDelete,
  onToggleDisable,
}: InventoryTableProps) => {
  const { role } = useContext(userRoleContext);

  const columns: Column[] = [
    { key: "name", label: "Name" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price" },
    { key: "quantity", label: "Quantity" },
    { key: "value", label: "Value" },
  ];

  return (
    <div className={style.inventoryTable}>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>
                <span>{column.label}</span>
              </th>
            ))}
            <th>
              <span>Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((product) => (
            <tr key={product.name}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={product.disabled ? style.disabled : ""}
                >
                  <span>{product[column.key]}</span>
                </td>
              ))}
              <td>
                <button
                  className={`${style.action} ${style.edit} ${
                    product.disabled || role === "user" ? style.disabled : ""
                  }`}
                  disabled={role === "user" || product.disabled}
                  onClick={() => {
                    onEdit(product);
                  }}
                >
                  <Edit width={20} height={20} className="edit" />
                </button>
                <button
                  className={`${style.action} ${style.visibility} ${
                    role === "user" ? style.disabled : ""
                  }`}
                  disabled={role === "user"}
                  onClick={() => {
                    onToggleDisable(product.name);
                  }}
                >
                  {product.disabled ? (
                    <VisOff width={20} height={20} />
                  ) : (
                    <Vis width={20} height={20} />
                  )}
                </button>
                <button
                  className={`${style.action} ${style.delete} ${
                    role === "user" ? style.disabled : ""
                  }`}
                  disabled={role === "user"}
                  onClick={() => {
                    onDelete(product.name);
                  }}
                >
                  <Delete width={20} height={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
