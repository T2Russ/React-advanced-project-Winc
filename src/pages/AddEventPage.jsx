import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Input, Select, FormLabel, Stack, useToast, FormControl, Center, Checkbox, Button, Box,} from "@chakra-ui/react";
import { handleChange, handleUserChange, handleCheckboxChange } from "../Functions";

export const Loader = async ({ params }) => {
  const users = await fetch(`http://localhost:3000/users`);
  const categories = await fetch(`http://localhost:3000/categories`);

  return {
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const UpcomingEventPage = () => {
  const { users, categories } = useLoaderData();
  const toast = useToast();
  const navigator = useNavigate();

  const [formData, setFormData] = useState({
    id: Math.floor(Math.random() * 10000),
    createdBy: "",
    title: "",
    description: "",
    image: "",
    categoryIds: [],
    location: "",
    startTime: "",
    endTime: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.categoryIds.length === 0) {
        throw new Error("Select atleast 1 category please");
      }

      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "New event created",
          description: "Your new event has been successfully created!",
          status: "Success",
          duration: 5000,
          isClosable: true,
        });
        navigator("/");
        setFormData({
          id: Math.floor(Math.random() * 10000),
          createdBy: "",
          title: "",
          description: "",
          image: "",
          categoryIds: [],
          location: "",
          startTime: "",
          endTime: "",
        });
      }
    } catch (error) {
      console.error("Error creating new event:", error.message);
      toast({
        title: "An error occurred while creating new event",
        description: "Failed to create new event",
        status: "Error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Center height={"100vh"} backgroundColor={"#3b6b7a"}>
      <Box
        as="form"
        marginTop={"2rem"}
        onSubmit={handleSubmit}
        height={"100%"}
        display={"flex"}
        justifyContent={"center"}
        minWidth={"100%"}
        padding={"0 1rem 0 1rem"}>
        <Stack height={"100%"} spacing={"0.5rem"}>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              variant={"flushed"}
              borderColor={"rgb(190, 220, 230)"}
              backgroundColor={"white"}
              name="title"
              value={formData.title}
              onChange={(e) => handleChange(e, formData, setFormData)}
            />
          </FormControl>
          <FormControl id="image" isRequired>
            <FormLabel>Image link</FormLabel>
            <Input
              variant={"flushed"}
              borderColor={"rgb(190, 220, 230)"}
              backgroundColor={"white"}
              name="image"
              value={formData.image}
              onChange={(e) => handleChange(e, formData, setFormData)}
            />
          </FormControl>
          <FormControl id="description" isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              variant={"flushed"}
              borderColor={"rgb(190, 220, 230)"}
              backgroundColor={"white"}
              name="description"
              value={formData.description}
              onChange={(e) => handleChange(e, formData, setFormData)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Categories</FormLabel>
            <Stack spacing={2}>
              {categories.map((category) => (
                <Checkbox
                  key={category.id}
                  isChecked={formData.categoryIds.includes(category.id)}
                  onChange={() => handleCheckboxChange(category.id, formData, setFormData)}>
                  {category.name}
                </Checkbox>
              ))}
            </Stack>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>User</FormLabel>
            <Select
              placeholder="Select a user"
              value={formData.createdBy}
              onChange={(e) => handleUserChange(e.target.value, formData, setFormData)}>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="location" isRequired>
            <FormLabel>Location</FormLabel>
            <Input
              variant={"flushed"}
              borderColor={"rgb(190, 220, 230)"}
              backgroundColor={"white"}
              name="location"
              value={formData.location}
              onChange={(e) => handleChange(e, formData, setFormData)}
            />
          </FormControl>
          <FormControl id="startTime" isRequired>
            <FormLabel>Start Date</FormLabel>
            <Input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={(e) => handleChange(e, formData, setFormData)}
            />
          </FormControl>
          <FormControl id="endTime" isRequired>
            <FormLabel>End Date</FormLabel>
            <Input
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={(e) => handleChange(e, formData, setFormData)}
            />
          </FormControl>
          <Button width={"xl"} type="submit" colorScheme="cyan" mt={4}>
            Create Event
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}; 