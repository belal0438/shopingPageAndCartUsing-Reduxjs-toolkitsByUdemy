import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://ecom-web-35eba-default-rtdb.firebaseio.com/cart.json"
      );
      //   console.log("resonse", response);
      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }
      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      //   console.log("cartData", cartData);
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQauntity: cartData.totalQauntity,
        })
      );
    } catch (error) {
      //   console.log("error", error);
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://ecom-web-35eba-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQauntity: cart.totalQauntity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending Cart Data failed.");
      }
      // const responseData = await response.json();
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Success cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Success cart data failed!",
        })
      );
    }
  };
};
