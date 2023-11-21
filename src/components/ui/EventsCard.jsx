import React, { useState, useEffect } from "react";
import {
	Heading,
	Card,
	Image,
	Stack,
	Flex,
	CardBody,
	Text,
	Tag,
	CardFooter,
} from "@chakra-ui/react";

export const EventsCard = ({ event, categories, onClick }) => {
	// State to hold the event data
	const [currentEvent, setCurrentEvent] = useState(event);

	// Use useEffect to update the event data when it changes
	useEffect(() => {
		setCurrentEvent(event);
	}, [event]);

	const timeOptions = {
		weekday: "long",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	};

	return (
		<Card
			key={event.id}
			direction={{ base: "column", sm: "row" }}
			overflow="hidden"
			variant="outline"
			my={5}
			minH={"350px"}
			cursor="pointer"
			_hover={{
				transform: "scale(1.03)",
				transition: "transform 0.2s ease-in",
			}}
			onClick={onClick}
		>
			<Image
				objectFit="cover"
				maxW={{ base: "100%", lg: "35%", md: "35%", sm: "200px" }}
				src={event.image}
				alt="Activity image"
			/>

			<Stack pl={7}>
				<CardBody>
					<Heading size="xl" color="teal.500" mb="2">
						{event.title}
					</Heading>

					<Text as="em" fontSize="lg" color="gray.600">
						{event.description}
					</Text>
					<Flex
						h="full"
						direction="column"
						justifyContent="space-evenly"
						mt={{ base: "0", md: "", lg: "xl" }}
					>
						<div>
							<Text
								fontWeight="semibold"
								as="u"
								fontSize={{ base: "md", md: "lg", lg: "19px" }}
							>
								Location:
							</Text>
							<Text fontSize={{ base: "md", md: "lg", lg: "19px" }}>
								{event.location}
							</Text>
						</div>
						<div>
							<Text
								fontWeight="semibold"
								fontSize={{ base: "md", md: "lg", lg: "18px" }}
							>
								Starts:
								<Text fontWeight="thin" ml={1} display="inline">
									{new Date(event.startTime).toLocaleString(
										"en-US",
										timeOptions
									)}
								</Text>
							</Text>
							<Text
								fontWeight="semibold"
								fontSize={{ base: "md", md: "lg", lg: "18px" }}
							>
								Ends:
								<Text fontWeight="thin" ml={1} display="inline">
									{new Date(event.endTime).toLocaleString("en-US", timeOptions)}
								</Text>
							</Text>
						</div>
					</Flex>
				</CardBody>

				<CardFooter>
					<Text
						fontWeight="semibold"
						fontSize={{ base: "md", md: "lg", lg: "19px" }}
						as="u"
						mt="8"
					>
						Categories:
						{(event.categoryIds || []).map((categoryId, index) => {
							const category = categories.find((c) => c.id === categoryId);
							return (
								<Tag
									key={index}
									size={{ base: "md", md: "md", lg: "lg" }}
									variant="outline"
									colorScheme="purple"
									ml="0.5em"
								>
									{category ? category.name : ""}
								</Tag>
							);
						})}
					</Text>
				</CardFooter>
			</Stack>
		</Card>
	);
};
