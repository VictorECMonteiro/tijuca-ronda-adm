import Sidebar from "../components/Sidebar";
import Divhome from "../components/Divhome";
import styles from "../styles/pages/Home.module.css";

export const Home = () => {
return (
    <div className={styles.homeContainer}>
 <Sidebar/>
 <Divhome/>
 </div>

)
}

export default Home;