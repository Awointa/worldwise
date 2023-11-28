import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";

import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "./context/CitiesContext";
import Message from "./Message";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
	const { createCity, isLoading } = useCities();
	const [lat, lng] = useUrlPosition();
	const navigate = useNavigate();

	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");
	const [emoji, setEmoji] = useState("");
	const [geocodingError, setGeoCodingError] = useState("");

	useEffect(
		function () {
			if (!lat && !lng) return;
			async function fetchCity() {
				try {
					setGeoCodingError("");
					setIsLoadingGeocoding(true);
					const res = await fetch(
						`${BASE_URL}?latitude=${lat}&longitude=${lng}`,
					);
					const data = await res.json();

					if (!data.countryCode)
						throw new Error(
							"That dosen't seem to be a city. Click somewhere else 😊",
						);
					setCityName(data.city || data.locality || "");
					setCountry(data.countryName);
					setEmoji(convertToEmoji(data.countryCode));
				} catch (err) {
					setGeoCodingError(err.message);
				} finally {
					setIsLoadingGeocoding(false);
				}
			}
			fetchCity();
		},
		[lat, lng],
	);

	async function handlesubmit(e) {
		e.preventDefault();

		if (!cityName || !date) return;

		const newCity = {
			cityName,
			country,
			emoji,
			date,
			notes,
			position: { lat, lng },
		};
		await createCity(newCity);
		navigate("/app");
	}

	if (isLoadingGeocoding) return <Spinner />;

	if (!lat && !lng)
		return <Message message="Start by clicking somewhere on the map" />;

	if (geocodingError) return <Message message={geocodingError} />;

	return (
		<form
			className={`${styles.form} ${isLoading ? styles.loading : ""}`}
			onSubmit={handlesubmit}
		>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input
					id="cityName"
					onChange={(e) => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				{/*<input
					id="date"
					onChange={(e) => setDate(e.target.value)}
					value={date}
	/>*/}
				<DatePicker
					onChange={(date) => setDate(date)}
					selected={date}
					dateFormat="dd/MM/yyyy"
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<textarea
					id="notes"
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button type="primary">Add</Button>
				<BackButton />{" "}
			</div>
		</form>
	);
}

export default Form;
