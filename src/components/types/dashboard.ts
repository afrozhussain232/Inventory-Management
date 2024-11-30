export type InventoryData = {
    name: string;
    price: number;
    quantity: number;
    category: string;
    value: number;
    disabled: boolean;
};
export type InventoryDataResponse = {
    name: string;
    price: string;
    quantity: string;
    category: string;
    value: string;
};

export type MetricsData = {
    totalProducts: number;
    totalValue: number;
    totalCategories: number;
    OutOfStockProducts: number;
};