import { NavLink } from "react-router-dom";

export default function PageNav() {
	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/">HomePage</NavLink>
				</li>
				<li>
					<NavLink to="/pricing">Pricing</NavLink>
				</li>
				<li>
					<NavLink to="/product">product</NavLink>
				</li>
			</ul>
		</nav>
	);
}