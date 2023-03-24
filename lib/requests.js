import axios from "axios";

export const getCategories = async () => {
  let categories = await axios.get("https://the-trivia-api.com/api/categories");
  return categories.data;
};
