import { useState, useEffect } from "react";
import Cards from "./components/Cards.jsx";
import "./App.css";

function App() {
  const [imagesId, setImagesId] = useState([
    "6853116",
    "13243843",
    "16371568",
    "1314550",
    "15679533",
    "14492386",
    "12763226",
    "11880954",
    "17427661",
    "19616837",
  ]);
  const [check, setCheck] = useState([]);
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [fetchedImages, setFetchedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const arrayOfData = await Promise.all(
          //this will return array of data
          imagesId.map(async (id) => {
            const response = await fetch(
              `https://api.pexels.com/v1/photos/${id}`,
              {
                headers: {
                  Authorization: import.meta.env.VITE_PEXELS_API_KEY,
                },
              }
            );
            const data = await response.json();
            return data;
          })
        );
        setFetchedImages(arrayOfData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchImages();
  }, [imagesId]);

  return (
    <>
      <p className="top-score">Highest Score : {topScore}</p>
      <p className="score">Score : {score}</p>
      <Cards
        fetchedImages={fetchedImages}
        loading={loading}
        check={check}
        setCheck={setCheck}
        imagesId={imagesId}
        setImagesId={setImagesId}
        setScore={setScore}
        score={score}
        setTopScore={setTopScore}
        topScore={topScore}
      />
    </>
  );
}

export default App;
