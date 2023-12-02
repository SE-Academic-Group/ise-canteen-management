// TODO: Refactor all of these functions to use a single function with a map

export function categoryToVietnamese(category) {
  const categoryMap = {
    food: "Đồ ăn",
    drink: "Nước uống",
    ingredient: "Nguyên liệu",
    spice: "Gia vị",
    other: "Khác",
  };
  const result = (categoryMap[category] || category).replace(/[_-]/g, " ");

  return result;
}

export function statusToVietnamese(status) {
  const vietnameseStatus = {
    completed: "Đã hoàn thành",
    cancelled: "Đã hủy",
    pending: "Đang chờ",
  };
  const result = (vietnameseStatus[status] || status).replace(/[_-]/g, " ");

  return result;
}

export function orderStatusToVietnamese(status) {
  const vietnameseStatus = {
    completed: "Đã hoàn thành",
    cancelled: "Đã hủy",
    pending: "Đang chờ",
  };
  const result = (vietnameseStatus[status] || status).replace(/[_-]/g, " ");

  return result;
}

export function roleToVietnamese(role) {
  const vietnameseRole = {
    admin: "Quản trị viên",
    staff: "Nhân viên",
    cashier: "Thu ngân",
    customer: "Khách hàng",
  };
  const result = (vietnameseRole[role] || role).replace(/[_-]/g, " ");

  return result;
}

export function unitToVietnamese(unit) {
  const vietnameseUnit = {
    bottle: "Chai",
    can: "Lon",
    box: "Thùng",
    piece: "Cái",
    kg: "Kg",
    g: "G",
    l: "L",
    ml: "Ml",
  };
  const result = (vietnameseUnit[unit] || unit).replace(/[_-]/g, " ");

  return result;
}
