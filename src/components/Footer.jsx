import React from "react";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<p className={styles.copyright}>
				&copyright {new Date().getFullYear()} by worldwise Inc.
			</p>
		</footer>
	);
}
