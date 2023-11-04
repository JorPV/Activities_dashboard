import {
	Container,
	Center,
	Box,
	Flex,
	Heading,
	Text,
	Image,
	Spacer,
	Avatar,
	Tag,
} from "@chakra-ui/react";
import { Button as DeleteButton } from "@chakra-ui/react";
import { Button as EditButton } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { useEventContext } from "../context/EventsDataContext";

export const loader = async ({ params /*deleteEvent*/ }) => {
	const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
	return {
		event: await event.json(),
	};
};

const handleDelete = async () => {
	try {
		//   await deleteEvent(event.id);
		console.log("test delete");
	} catch (error) {
		console.error("Error deleting event:", error);
	}
};

export const EventPage = ({ deleteActivity }) => {
	const { event } = useLoaderData();
	const { categories } = useEventContext();
	const { users } = useEventContext();

	const timeOptions = {
		weekday: "long",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	};

	const createdByUser = users.find((user) => user.id === event.createdBy);

	if (!createdByUser) {
		return <div>Matching user not found</div>; // Handle the case where no matching user is found
	}

	return (
		<Container maxW="75%">
			<Spacer m={8} />
			<Center boxShadow="md" rounded="md" w="full">
				<Box m="8">
					<Flex justifyContent={"space-between"}>
						<div>
							<Heading mb="3">{event.title}</Heading>
							<Text fontSize="xl" mb="2">
								{event.description}
							</Text>
						</div>
						<Flex justifyContent="center" alignItems="center">
							<div>
								<Text fontSize="xl" mr="5">
									Created by:
								</Text>
								<Text>{createdByUser.name}</Text>
							</div>
							<Avatar
								size="xl"
								name={createdByUser.name}
								src={createdByUser.image}
							/>
						</Flex>
					</Flex>
					<Spacer h={9} />
					<Image
						borderRadius="3%"
						boxSize="auto"
						src={event.image}
						alt="Event image"
					/>
					<div>
						<Text mt="3">
							<Text as="b">Starts: </Text>
							<span>
								{new Date(event.startTime).toLocaleString("en-US", timeOptions)}
							</span>
						</Text>
					</div>
					<div>
						<Text mt="2">
							<Text as="b">Finishes: </Text>:
							<span>
								{new Date(event.endTime).toLocaleString("en-US", timeOptions)}
							</span>
						</Text>
					</div>
					<Text mt="2em">
						Categories:
						{(event.categoryIds || []).map((categoryId, index) => {
							const category = categories.find((c) => c.id === categoryId);
							return (
								<Tag
									key={index}
									variant="outline"
									colorScheme="purple"
									ml="0.5em"
								>
									{category ? category.name : ""}
								</Tag>
							);
						})}
					</Text>
				</Box>
			</Center>
			<Flex my="8" justifyContent="right" gap="4">
				<EditButton size="lg" bg="#cc6bb7">
					Edit event
				</EditButton>
				<DeleteButton size="lg" bg="red" color="white" onClick={handleDelete}>
					Delete event
				</DeleteButton>
			</Flex>
		</Container>
	);
};
