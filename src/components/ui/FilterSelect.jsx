import { Select } from "@chakra-ui/react";

export const FilterSelect = ({ categories, setSelectedCategory }) => {
	return (
		<>
			<Select
				variant="flushed"
				fontSize={{ base: "md", md: "lg", lg: "lg" }}
				placeholder="Filter by category"
				onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
			>
				{categories.map((category) => (
					<option key={category.id} value={category.id}>
						{category.name}
					</option>
				))}
			</Select>
		</>
	);
};
