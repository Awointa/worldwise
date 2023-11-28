import { createContext, useEffect, useState, useContext } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:3000";

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCity, setCurrentCity] = useState({});

	useEffect(function () {
		setIsLoading(true);
		async function fetchCities() {
			try {
				const res = await fetch(`${BASE_URL}/cities/`);
				const data = await res.json();
				setCities(data);
			} catch {
				alert("There was an error loading Data ");
			} finally {
				setIsLoading(false);
			}
		}
		fetchCities();
	}, []);

	async function getCity(id) {
		setIsLoading(true);
		try {
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			setCurrentCity(data);
			console.log(data);
		} catch {
			alert("There was an error loading Data ");
		} finally {
			setIsLoading(false);
		}
	}

	async function createCity(newCity) {
		setIsLoading(true);
		try {
			const res = await fetch(`${BASE_URL}/cities`, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();

			console.log(data);
		} catch {
			alert("There was an error loading Data ");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<CitiesContext.Provider
			value={{ cities, isLoading, currentCity, getCity, createCity }}
		>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);
	if (context === undefined)
		throw new Error("CitiesContext was used outside the CitiesProvider");
	return context;
}

export { CitiesProvider, useCities };
