export const formatReviewCount = (count: number) => {
  const formattedReviewCount = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 0,
  }).format(count);
  return formattedReviewCount;
};
