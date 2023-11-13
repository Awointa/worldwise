export default function PageNav() {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">HomePage</Link>
				</li>
				<li>
					<Link to="/pricing">Pricing</Link>
				</li>
				<li>
					<Link to="/product">product</Link>
				</li>
			</ul>
		</nav>
	);
}
