import Logo from "./Logo";
import Footer from "./Footer";
import AppNav from "./AppNav";
import styles from "./SideBar.module.css";
import { Outlet } from "react-router-dom";

export default function Sidear() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />
			<Outlet />
			<Footer />
			""
		</div>
	);
}
