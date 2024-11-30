import style from "./metrics.module.scss";
import { formatNumber } from "../../../utils/number";
import { MetricsData } from "../../types/dashboard";
import { ReactComponent as Cart } from "../../../assets/icons/cart.svg";
import { ReactComponent as Revenue } from "../../../assets/icons/revenue.svg";
import { ReactComponent as Stock } from "../../../assets/icons/stock.svg";
import { ReactComponent as Category } from "../../../assets/icons/category.svg";
import React from "react";

type MetricCardProps = {
  title: string;
  value: number;
  icon: keyof typeof MetricIcons;
};

type MetricsProps = {
  metrics: MetricsData;
};

const MetricIcons = {
  cart: Cart,
  revenue: Revenue,
  stock: Stock,
  category: Category,
};

const MetricCard = ({ title, value, icon }: MetricCardProps) => {
  return (
    <div>
      <div className={style.metricCard}>
        <div className={style.icon}>
          {React.createElement(MetricIcons[icon])}
        </div>
        <div className={style.details}>
          <p className={style.title}>{title}</p>
          <h2 className={style.value}>{formatNumber(value)}</h2>
        </div>
      </div>
    </div>
  );
};

const Metrics = ({ metrics }: MetricsProps) => {
  return (
    <div className={style.metrics}>
      <MetricCard
        title="Total products"
        value={metrics.totalProducts}
        icon="cart"
      />
      <MetricCard
        title="Total Store value"
        value={metrics.totalValue}
        icon="revenue"
      />
      <MetricCard
        title="Out of stocks"
        value={metrics.OutOfStockProducts}
        icon="stock"
      />
      <MetricCard
        title="No of Category"
        value={metrics.totalCategories}
        icon="category"
      />
    </div>
  );
};

export default Metrics;
