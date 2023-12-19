import { useState } from "react";
import { useTodayMenu } from "../today-menu/useTodayMenu";
import { useCreateOrder } from "../orders/useCreateOrder";

import ErrorLoading from "../../ui/ErrorLoading";
import ButtonGroup from "../../ui/ButtonGroup";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import Empty from "../../ui/Empty";
import CreateOrderSummary from "./CreateOrderSummary";
import CreateOrderForm from "./CreateOrderForm";

function CreateOrderContent() {
  const { isLoading, error, count, menuItems } = useTodayMenu();
  const { isCreating, createOrder } = useCreateOrder();
  const [addedItems, setAddedItems] = useState(new Map());

  function handleCreateOrder() {
    function onSuccess() {
      handleReset();
    }

    const orderItemsArray = Array.from(addedItems.values());
    createOrder(orderItemsArray, { onSuccess });
  }

  function handleAddItem(item) {
    const { _id: id, productId, quantity, price, name } = item;
    addedItems.set(id, {
      productId,
      quantity: 1,
      price,
      name,
      availableQuantity: quantity,
      id,
      _id: id,
    });
    setAddedItems(new Map(addedItems));
  }

  function handleRemoveItem(item) {
    const { _id } = item;
    addedItems.delete(_id);
    setAddedItems(new Map(addedItems));
  }

  function handleUpdateQuantity(id, quantity) {
    const item = addedItems.get(id);
    if (item) {
      item.quantity = quantity;
      setAddedItems(new Map(addedItems));
    }
  }

  function handleReset() {
    setAddedItems(new Map());
  }

  function handleCheckActive(id) {
    return addedItems.has(id);
  }

  let content = null;

  if (error) {
    content = <ErrorLoading error={error} />;
  } else if (isLoading) {
    content = <Spinner />;
  } else if (!count) {
    content = <Empty resourceName="sản phẩm" />;
  } else {
    content = (
      <CreateOrderForm
        count={count}
        menuItems={menuItems}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        handleCheckActive={handleCheckActive}
      />
    );
  }

  return (
    <>
      {content}

      <CreateOrderSummary
        addedItems={Array.from(addedItems.values())}
        handleUpdateQuantity={handleUpdateQuantity}
        handleRemoveItem={handleRemoveItem}
      />

      <ButtonGroup>
        <Button
          type="button"
          variation="secondary"
          onClick={handleReset}
          disabled={isCreating}
        >
          Hủy
        </Button>
        <Button
          onClick={() => {
            const res = window.confirm("Bạn có chắc chắn muốn đặt hàng không?");

            if (res) {
              handleCreateOrder();
            }
          }}
          disabled={addedItems.size === 0 || isCreating}
        >
          Đặt hàng
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CreateOrderContent;
