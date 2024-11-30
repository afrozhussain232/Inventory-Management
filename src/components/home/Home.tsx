import TopBar from "../base/Topbar";
import style from "./home.module.scss";
import Dashboard from "../dashboard/Dashboard";

const Home = () => {
  return (
    <div className={style.home}>
      <TopBar />
      <Dashboard />
    </div>
  );
};

export default Home;
