// AddEventBtn.jsx
import { Button as NewEventBtn } from "@chakra-ui/react";
import React, { useState } from "react";
import { NewEventModal } from "./NewEventModal";

export const AddEventBtn = ({ setEvents }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			<NewEventBtn variant="solid" colorScheme={"purple"} onClick={handleOpen}>
				Add new activity
			</NewEventBtn>
			<NewEventModal isOpen={isOpen} onClose={handleClose} />
		</>
	);
};
