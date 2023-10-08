import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";
import privateUserRoute from "../routes/privateUserRoute";
import Script from "next/script";
import Layout from "../Components/Layout";
import PaymentForm from "../Components/PaymentForm";
import SectionHeading from "../Components/SectionHeading";
import { deleteFromCart, getEventFromCart } from "../action/cart";
import { toast } from "react-toastify";
import ContentLoader from "../Components/ContentLoader";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  function open() {
    if (cart.length === 0) {
      toast.error("Cart is Empty");
      return;
    }
    setVisible(!visible);
  }

  useEffect(() => {
    (async () => {
      const combo = localStorage.getItem("combo_data");
      //console.log(combo);
      try {
        const res = await getEventFromCart();
        //console.log("Cart");
        //console.log(res);
        if (res?.error) {
          setLoading(false);
          //console.log("error in fetching cart");
          return {
            msg: "error"
          };
        }
        const cartArray = Object.values(res.events[0]);

        setCart(cartArray);
        //console.log(cartArray)
        //console.log("After timeout");
        //console.log(cart);

        setLoading(false);
      } catch (e) {
        //console.log(e);
        return e;
      }
    })();
  }, []);


  let total = 0;
  cart.map((item) => {
    total += item.price;
  });

  // Delete From Cart
  const deleteItem = async (id) => {
    //console.log("Hellooo" + id)
    const combo_id = localStorage.getItem("combo_id");
    //console.log(combo_id);
    const data = await deleteFromCart(id, combo_id);

    if (data?.error) {
      toast.error(data.error);
      return;
    }
    if (data?.flag) {
      localStorage.removeItem("combo_id");
      localStorage.removeItem("combo_data");
    }
    let item = cart.filter(
      (item) => item.id != id
    );
    setCart(item);

  }

  return (
    <Layout>
      {loading ? <ContentLoader /> : <div className="-z-10">
        <h1 className="mt-[50px] text-3xl font-black text-center uppercase sm:text-4xl md:text-5xl text-sky-400 list-none">
          <SectionHeading>Events Cart</SectionHeading>
        </h1>
        <div className="flex flex-col h-full mt-4 list-none lg:flex lg:flex-row lg:gap-2">
          <ul
            className="m-5 p-4 lg:w-[70%] divide-y bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-gray-100"
          >
            {cart.length != 0 ? (
              cart.map((product) => (
                <li className="px-4 py-4">
                  <div className="grid items-center grid-cols-4 gap-6 lg:p-10">
                    <div>
                      <img
                        src={product.logo}
                        alt="{product.imageAlt}"
                        className="rounded-lg sm:w-40 sm:h-32"
                      />
                    </div>
                    <div className="text-[10px] text-white font-medium sm:text-lg">
                      {product.name}
                    </div>
                    <div className="text-white font-medium sm:float-right sm:text-lg text-[10px]">
                      ₹ {product.price}
                    </div>
                    <div className="text-white">
                      <button
                        type="button"
                        className="ml-0 text-[10] text-white sm:text-lg font-medium hover:text-orange-400 sm:ml-0"
                        onClick={() => deleteItem(product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className="relative top-[30%] text-white text-4xl text-center">
                Your Cart Is Empty
              </p>
            )}
          </ul>

          <div
            className="sm:w-[50%] w-[50%] self-end lg:self-auto sm:h-[30%] sm:p-5 sm:m-5 text-white mr-5 ml-[40%] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-gray-100"
          >
            <div className="flex flex-col text-sm divide-y divide-gray-200">
              <h2 className="p-4 text-center"> Order Summary</h2>
              <div className="p-4">
                <div className="flex flex-row w-full sm:gap-[65%]">
                  <div className="w-[40%] whitespace-pre">Order Total</div>
                  <div className="ml-auto">{total}</div>
                </div>
              </div>

              <div className="p-4 mt-10">
                <Script src="https://checkout.razorpay.com/v1/checkout.js" />
                <button
                  type="submit"
                  className="w-full px-4 py-3 text-base font-medium text-white hover:bg-[hsl(21,90%,28%)] bg-[#EA580C] border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                  onClick={() => {
                    open();
                  }}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
        <PaymentForm
          open={visible}
          close={open}
          cart={cart}
          setCart={setCart}
          amount={total}
        />
      </div>}
    </Layout>
  );
};

export default privateUserRoute(CartPage);
// export default (CartPage);
