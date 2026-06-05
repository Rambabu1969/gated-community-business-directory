export default function StarRating({ rating }) {
  const rounded = Math.round(rating * 2) / 2;
  const stars = [];
  for (let i = 1; i <= 5; i += 1) {
    if (i <= rounded) stars.push("full");
    else if (i - 0.5 === rounded) stars.push("half");
    else stars.push("empty");
  }

  return (
    <span className="star-rating" aria-label={`Rated ${rating} out of 5`}>
      {stars.map((type, idx) => (
        <span key={idx} className={`star star--${type}`}>
          ★
        </span>
      ))}
      <span className="star-rating__value">{rating.toFixed(1)}</span>
    </span>
  );
}
