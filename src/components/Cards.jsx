function Cards({
  fetchedImages,
  loading,
  setCheck,
  check,
  setScore,
  score,
  setImagesId,
  imagesId,
  setTopScore,
  topScore,
}) {
  function shuffleArray(arr) {
    let copyArray = [...arr];
    let temp = 0;
    for (let i = copyArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      temp = copyArray[i];
      copyArray[i] = copyArray[j];
      copyArray[j] = temp;
    }
    setImagesId([...copyArray]);
  }

  const updateTopScore = () => {
    if (topScore < score) {
      setTopScore(score);
    }
  };

  const resetGame = () => {
    setCheck([]);
    setScore(0);
  };

  const handleCardClick = (imageId) => {
    if (check.includes(imageId)) {
      updateTopScore();
      resetGame();

      return;
    }

    setCheck((c) => [...c, imageId]);
    setScore((s) => s + 1);
    shuffleArray(imagesId);
  };

  return (
    <div className="cards-container">
      {loading ? (
        <p style={{ color: "red" }}>Loading images...</p>
      ) : (
        fetchedImages.map((element, index) => (
          <div
            key={index}
            className="card"
            onClick={() => handleCardClick(element.id)}
          >
            <img
              className="card_img"
              src={element.src.large}
              alt={`Image ${index}`}
            />
            <p className="card_p">{element.alt}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Cards;
