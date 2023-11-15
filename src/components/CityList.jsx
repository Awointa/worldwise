import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";

export default function CityList({ cities, isLoading }) {
	if (isLoading) return <Spinner />;
	return (
		<div className={styles.cityList}>
			{cities.map((city) => (
				<CityItem city={city} key={city.id} />
			))}
		</div>
	);
}
