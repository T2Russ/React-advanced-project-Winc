import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heading, Box, Flex, Input, FormControl, FormLabel, Stack, Checkbox } from "@chakra-ui/react";
import { EventCard } from "../components/EventCard";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchInput, setsearchInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchCategories();
  }, []);

  const fetchEvents = async () => {
    const response = await fetch("http://localhost:3000/events");
    const eventsData = await response.json();
    setEvents(eventsData);
  };

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:3000/categories");

    const categoryData = await response.json();
    setCategories(categoryData);
  };

  const filteredEvents = events.filter(
    (event) =>
      (event.title.toLowerCase().includes(searchInput.toLowerCase()) && selectedCategories.length === 0) ||
      event.categoryIds.some((id) => selectedCategories.includes(id))
  );

  const handleCategoryChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  return (
    <Box
      as={"main"}
      minHeight={"100vh"}
      minWidth={"100%"}
      display={"flex"}
      alignItems={"center"}
      flexDirection={"column"}
      padding={"0 1rem 0 1rem"}>
      <Heading as={"h1"} marginTop={"1.7rem"}>
        Event management
      </Heading>

      <Input
        variant={"flushed"}
        borderColor={"rgb(150, 3, 150)"}
        margin={"1rem 0"}
        backgroundColor={"white"}
        width={"md"}
        type="text"
        name="search"
        value={searchInput}
        onChange={(e) => setsearchInput(e.target.value)}
      />

      <FormControl
        alignItems={"center"}
        flexDirection={"row"}
        gap={"2rem"}
        justifyContent={"center"}
        display={"flex"}
        textAlign={"center"}>
        <FormLabel margin={"0"}>Categories:</FormLabel>
        {categories.map((category) => (
          <Checkbox
            display={"flex"}
            justifyContent={"center"}
            key={category.id}
            isChecked={selectedCategories.includes(category.id)}
            onChange={() => handleCategoryChange(category.id)}
            css={{
                "&:hover": {                
                  "& > span": {
                    borderColor: "white",
                  },
                },
              }}
            >
            {category.name}
          </Checkbox>
        ))}
      </FormControl>

      <Flex
        marginTop={"2rem"}
        height={"100%"}
        maxWidth={"1200px"}
        flexWrap={"wrap"}
        gap={"1.30rem"}
        justifyContent={"center"}
        alignItems={"center"}>
        {categories.length >= 1 &&
          events.length >= 1 &&
          filteredEvents.map((event) => (
            <Link key={event.id} to={`/event/${event.id}`}>
              <EventCard event={event} categories={categories} />
            </Link>
          ))}
      </Flex>
    </Box>
  );
};
