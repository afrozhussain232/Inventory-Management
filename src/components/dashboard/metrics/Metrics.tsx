import style from "./metrics.module.scss";
import { formatNumber } from "../../../utils/number";
import { MetricsData } from "../../types/dashboard";

type MetricCardProps = {
  title: string;
  value: number;
  icon: string;
};

type MetricsProps = {
  metrics: MetricsData;
};

const MetricCard = ({ title, value, icon }: MetricCardProps) => {
  return (
    <div>
      <div className={style.metricCard}>
        <div className={style.icon}>
          <img src={`src/assets/icons/${icon}.svg`} alt={icon} />
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
