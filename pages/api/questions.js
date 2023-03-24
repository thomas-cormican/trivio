import axios from "axios";

export default async (req, res) => {
  const { difficulty, questions, ...cats } = req.query;
  const categoryString = Object.keys(cats).join(",");
  const apiRequest = `https://the-trivia-api.com/api/questions?limit=${questions}&difficulty=${difficulty}${
    Object.keys(cats) != 0 ? `&categories=${categoryString}` : ``
  }`;

  if (req.method == "GET" && questions) {
    const response = await axios.get(apiRequest);
    res.status(200).json({ response: response.data });
  }
};
