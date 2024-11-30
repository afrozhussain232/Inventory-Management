import style from "./topbar.module.scss";
import Switch from "../common/switch/switch";
import { userRoleContext } from "../../context/userRoleContext";
import { useContext } from "react";
const TopBar = () => {
  const { role, setRole } = useContext(userRoleContext);
  return (
    <div className={style.topBar}>
      <div className={style.userSwitch}> User</div>
      <Switch
        isOn={role == "user" ? true : true}
        onToggle={() => {
          setRole(role == "user" ? "admin" : "user");
        }}
      />
      <div className={style.userSwitch}>Admin </div>
    </div>
  );
};

export default TopBar;
