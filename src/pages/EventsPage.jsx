import { Container, Box, Heading, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { EventsCard } from "../components/ui/EventsCard";
import { AddEventBtn } from "../components/ui/AddEventBtn";
import { useEventContext } from "../context/EventsDataContext";
import { SearchInput } from "../components/ui/SearchInput";
import { FilterSelect } from "../components/ui/FilterSelect";

export const loader = async () => {
	const events = await fetch("http://localhost:3000/events");
	return { events: await events.json() };
};

export const EventsPage = () => {
	const { updateEvents, categories } = useEventContext();
	const [selectedActivity, setSelectedActivity] = useState(null);
	const [eventsData, setEventsData] = useState([]);
	const { events: initialEvents } = useLoaderData();
	const [searchText, setSearchText] = useState(""); // Initialize searchText state
	const [selectedCategory, setSelectedCategory] = useState(null); // Initialize selectedCategory state

	const fetchEvents = async () => {
		try {
			const response = await fetch("http://localhost:3000/events");
			const data = await response.json();
			setEventsData(data); // Update the local events data
		} catch (error) {
			console.error("Error fetching events:", error);
		}
	};

	useEffect(() => {
		if (initialEvents) {
			setEventsData(initialEvents);
		} else {
			fetchEvents();
		}
	}, [initialEvents, updateEvents, eventsData]);

	const filterEvents = (events, category, searchText) => {
		let filteredEvents = events;

		if (category) {
			filteredEvents = filteredEvents.filter((event) =>
				event.categoryIds.includes(category)
			);
		}

		if (searchText) {
			filteredEvents = filteredEvents.filter((event) =>
				event.title.toLowerCase().includes(searchText.toLowerCase())
			);
		}

		return filteredEvents;
	};

	if (
		!eventsData ||
		eventsData.length === 0 ||
		!categories ||
		categories.length === 0
	) {
		return <div>Loading...</div>;
	} else {
		const filteredEvents = filterEvents(
			eventsData,
			selectedCategory,
			searchText
		);

		return (
			<Container maxW="auto" bg="gray.50" centerContent mt="">
				<Box padding="4" bg="gray.50" color="black" w="80%">
					<Flex justifyContent="space-between" alignItems="center">
						<Heading
							as="h2"
							size={{ base: "lg", md: "2xl", lg: "3xl" }}
							my="12"
							color="#0d445e"
						>
							List of all activities
						</Heading>
						<AddEventBtn setEvents={fetchEvents} />
					</Flex>
					<Flex gap="12" justifyContent="space-between">
						{/* Pass the value and onChange props to the SearchInput component */}
						<SearchInput
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
						/>
						{/* Add a conditional check to ensure categories is defined before rendering */}
						{categories && categories.length > 0 ? (
							<FilterSelect
								categories={categories}
								setSelectedCategory={setSelectedCategory}
							/>
						) : null}
					</Flex>
					<div>
						{filteredEvents.map((event) => (
							<Link key={event.id} to={`event/${event.id}`}>
								<EventsCard
									event={event}
									categories={categories}
									onClick={() => setSelectedActivity(event)}
								></EventsCard>
							</Link>
						))}
					</div>
				</Box>
			</Container>
		);
	}
};
