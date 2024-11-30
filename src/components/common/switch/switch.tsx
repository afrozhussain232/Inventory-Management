import { useState } from "react";
import styles from "./Switch.module.scss";

type SwitchProps = {
  isOn?: boolean;
  onToggle?: (isOn: boolean) => void;
};

const Switch = ({ isOn = false, onToggle }: SwitchProps) => {
  const [checked, setChecked] = useState(isOn);

  const handleClick = () => {
    setChecked(!checked);
    if (onToggle) {
      onToggle(!checked);
    }
  };

  return (
    <div
      className={`${styles.switch} ${checked ? styles.on : styles.off}`}
      onClick={handleClick}
    >
      <div className={styles.toggle} />
    </div>
  );
};

export default Switch;
