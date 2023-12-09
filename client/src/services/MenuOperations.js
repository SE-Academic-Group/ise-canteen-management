export function calculateRevenue(menuItems) {
  const rev = menuItems.reduce((acc, item) => {
    const { price, totalQuantity, remainQuantity } = item;
    const soldQuantity = totalQuantity - remainQuantity;
    return acc + price * soldQuantity;
  }, 0);

  return rev;
}

export function createMenuSummary(menuItems) {
  const totalItems = menuItems.length;
  let soldItems = 0;
  let totalQuantity = 0;

  menuItems.forEach((item) => {
    totalQuantity += item.totalQuantity;
    soldItems += item.totalQuantity - item.remainQuantity;
  });

  const percentageSold = Math.round((soldItems / totalQuantity) * 100);

  return {
    message: `Có tổng cộng ${totalItems} mục trong thực đơn, đã bán được ${percentageSold}% tổng số lượng.`,
    totalItems,
    soldItems,
    totalQuantity,
    percentageSold,
  };
}
