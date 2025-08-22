import Sidebar from "../components/Sidebar";
import Divhome from "../components/Divhome";
import styles from "../styles/pages/Home.module.css";
import hamburguer from "../assets/img/list.svg"
import { useState } from "react";

export const Home = () => {
    const [isSideOpen, setIsSideOpen] = useState(false)



return (
    <div className={styles.homeContainer}>
    <div className={styles.hamburguer}>
        <a onClick={()=>{setIsSideOpen(!isSideOpen)}} className={styles.sideButton}>
          <img src={hamburguer} alt="" />
        </a>
    </div>
      <Sidebar isOpen={isSideOpen} closeSide={setIsSideOpen}/>
      <div className={styles.containerHome}>
        <Divhome/>
      </div>
 </div>

)
}

export default Home