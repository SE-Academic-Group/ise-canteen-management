/**
 * Calculates the revenue generated from the menu items.
 *
 * @param {Array} menuItems - The array of menu items.
 * @returns {number} The total revenue generated.
 */
export function calculateRevenue(menuItems) {
  const rev = menuItems.reduce((acc, item) => {
    const { price, totalQuantity, remainQuantity } = item;
    const soldQuantity = totalQuantity - remainQuantity;
    return acc + price * soldQuantity;
  }, 0);

  return rev;
}

/**
 * Creates a menu summary based on the given menu items.
 * @param {Array} menuItems - The array of menu items.
 * @returns {Object} - The menu summary object containing the total items, sold items, total quantity, and percentage sold.
 */
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
