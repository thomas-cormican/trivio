import { useState, useEffect } from "react";
import Head from "next/head";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { getCategories } from "@/lib/requests";
import Link from "next/link";

const PrettoSlider = styled(Slider)({
  color: "#20c997",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

export default function Home({ categories, checkedCategoriesObj }) {
  const [sliderValue, setSliderValue] = useState(10);
  const [difficulty, setDifficulty] = useState("medium");
  const [checkedCategories, setCheckedCategories] =
    useState(checkedCategoriesObj);
  const [quizLink, setQuizLink] = useState(
    `/quiz/${difficulty}/${sliderValue}`
  );

  useEffect(() => {
    let link = `/quiz/${difficulty}/${sliderValue}`;
    let allCategories = Object.entries(categories).map(
      ([key, value]) => value[0]
    );

    let selectedCategories = Object.entries(checkedCategories)
      .filter(([key, value]) => {
        if (value == true) {
          return true;
        } else {
          return;
        }
      })
      .map(([key, value]) => categories[key][0]);

    let allSelected =
      JSON.stringify(allCategories) == JSON.stringify(selectedCategories);

    if (!allSelected) {
      selectedCategories.forEach((category, index) => {
        if (index == 0) {
          link += `?${category}`;
        } else {
          link += `&${category}`;
        }
      });
    } else {
      link = `/quiz/${difficulty}/${sliderValue}`;
    }

    setQuizLink(() => {
      return link;
    });
  }, [sliderValue, difficulty, checkedCategories]);

  return (
    <>
      <div className="text-black dark:text-white flex flex-col items-center text-center p-8 xs:p-4 xs:w-full m-auto rounded-md bg-white dark:bg-bgLight drop-shadow-xl ">
        <div>
          <h3 className="text-xl font-bold">Difficulty</h3>
          <div className="mt-4">
            <button
              className={`h-[60px] text-black font-[500] rounded-md w-28 xxs:m-[1px] xs:w-24 bg-gradient-to-r from-green to-greenLight  hover-hover:hover:from-greenDark hover-hover:hover:to-greenLight ${
                difficulty == "easy" && "border-4 border-tealDark"
              } `}
              onClick={() => {
                setDifficulty("easy");
              }}
            >
              Easy
            </button>
            <button
              className={`h-[60px]  mx-4 xxs:m-[1px] xs:mx-2 text-black font-[500] rounded-md w-28 xs:w-24 bg-gradient-to-r from-yellow to-yellowLight hover-hover:hover:from-yellowDark hover-hover:hover:to-yellowLight ${
                difficulty == "medium" && "border-4 border-tealDark"
              } hover:bg-yellowDark`}
              onClick={() => {
                setDifficulty("medium");
              }}
            >
              Medium
            </button>
            <button
              className={`h-[60px] text-black font-[500] rounded-md w-28 xxs:m-[1px] xs:w-24 bg-gradient-to-r from-red to-redLight hover-hover:hover:from-redDark hover-hover:hover:to-redLight ${
                difficulty == "hard" && "border-4 border-tealDark"
              }  hover:bg-redDark`}
              onClick={() => {
                setDifficulty("hard");
              }}
            >
              Hard
            </button>
          </div>
        </div>
        <div className="my-8 w-full">
          <h3 className="text-xl font-bold">Number of questions</h3>
          <p className="font-[500] mt-4">{sliderValue}</p>
          <PrettoSlider
            defaultValue={sliderValue}
            onChange={(e, newValue) => setSliderValue(newValue)}
            aria-label="Default"
            valueLabelDisplay="auto"
            step={10}
            marks
            max={100}
            min={10}
          />
        </div>
        <div>
          <h3 className="text-xl font-bold">Categories</h3>
          <div className="mt-4 flex flex-col items-start">
            {Object.entries(categories).map(([key, value]) => (
              <div className="flex items-center" key={value}>
                <input
                  className="mr-1.5 hover:cursor-pointer hidden"
                  type="checkbox"
                  checked={checkedCategories[key]}
                  onChange={(e) =>
                    setCheckedCategories((prev) => {
                      return {
                        ...prev,
                        [key]: !prev[key],
                      };
                    })
                  }
                  id={value}
                />
                <label
                  htmlFor={value}
                  className={`block border-2 h-[16px] w-[16px] border-teal mr-1 rounded-[10px] hover:cursor-pointer ${
                    checkedCategories[key] ? `bg-tealLight` : `bg-transparent`
                  }`}
                ></label>
                <label className="hover:cursor-pointer" htmlFor={value}>
                  {key}
                </label>
              </div>
            ))}
          </div>
        </div>
        <Link className="mt-8" href={quizLink}>
          <button className="font-[500] px-8 py-2 text-black bg-teal hover-hover:hover:bg-tealDark rounded-md">
            Start
          </button>
        </Link>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const categories = await getCategories();
  let checkedCategoriesObj = {};
  Object.entries(categories).forEach(([key, value]) => {
    checkedCategoriesObj[key] = true;
  });

  return {
    props: { categories: categories, checkedCategoriesObj },
  };
}
