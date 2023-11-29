export function categoryToVietnamese(category) {
  const categoryMap = {
    food: "Đồ ăn",
    drink: "Nước uống",
    other: "Khác",
  };

  return categoryMap[category] || category;
}
