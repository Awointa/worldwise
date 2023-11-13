import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";

export default function PageNav() {
	return (
		<nav className={styles.nav}>
			<Logo />
			<ul>
				<li>
					<NavLink to="/pricing">Pricing</NavLink>
				</li>
				<li>
					<NavLink to="/product">product</NavLink>
				</li>
				<li>
					<NavLink to="/login">Login</NavLink>
				</li>
			</ul>
		</nav>
	);
}
