import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";
import privateUserRoute from "../routes/privateUserRoute";
import Script from "next/script";
import Layout from "../Components/Layout";
import PaymentForm from "../Components/PaymentForm";
import SectionHeading from "../Components/SectionHeading";
import { deleteComboFromCart, deleteEventFromCart, deleteFromCart, getEventFromCart } from "../action/cart";
import { toast } from "react-toastify";
import ContentLoader from "../Components/ContentLoader";
import { FaTrashAlt } from "react-icons/fa";

const CartPage = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const [events, setEvents] = useState([]);
  const [combos, setCombos] = useState([]);

  function open() {
    if (events.length === 0 && combos.length === 0) {
      toast.error("Cart is Empty");
      return;
    }
    setVisible(!visible);
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await getEventFromCart();
        console.log("Cart");
        console.log(res);

        if (res?.error) {
          console.log("error in fetching cart");
          setLoading(false);
          return {
            msg: "error"
          };
        }
        setLoading(false);
        console.log(res?.events?.events);
        console.log(res?.events?.combos);

        setEvents(res?.events?.events);
        setCombos(res?.events?.combos);
        setLoading(false);



        console.log("Even");
        console.log(events);
      } catch (e) {
        //console.log(e);
        return e;
      }
    })();
  }, [visible]);


  let total = 0;
  events?.map((item) => {
    total += parseInt(item.price);
  });

  combos?.map((item) => {
    total += parseInt(item.discounted_price);
  });


  // Delete From Cart
  const deleteEvent = async (id) => {
    //console.log(combo_id);
    const data = await deleteEventFromCart(id);
    if (data?.error) {
      toast.error(data.error);
      return;
    }
    toast.success("Event Deleted From Cart");
    let item = events.filter(
      (item) => item.id != id
    );

    setEvents(item);

  }
  // Delete From Cart
  const deleteCombo = async (id) => {
    //console.log(combo_id);
    const data = await deleteComboFromCart(id);
    if (data?.error) {
      toast.error(data.error);
      return;
    }
    toast.success("Combo Deleted From Cart");
    let item = combos.filter(
      (item) => item.id != id
    );

    setCombos(item);

  }

  return (
    <Layout>
      {loading ? <ContentLoader /> : <div className="-z-10">
        <h1 className="mt-[50px] text-3xl font-black text-center uppercase sm:text-4xl md:text-5xl text-sky-400 list-none">
          <SectionHeading>Events Cart</SectionHeading>
        </h1>
        <div className="flex flex-col h-full mt-4 list-none lg:flex lg:flex-row lg:gap-2">
          <div className="m-5 p-4 w-100 md:w-2/3 bg-slate-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border-2 border-gray-400">
            <h3 className="text-xl text-white font-semibold mb-2">Events</h3>
            {/* Events */}
            {
              events.length != 0 ? (
                events?.map((product) => (
                  <div className="flex items-center justify-between text-gray-200 flex-row bg-slate-900 border-none rounded-md p-6">
                    <div className="img w-16 h-16 hidden md:block p-2 rounded-full ">
                      <img src={product.logo} alt="EventLogo" />
                    </div>
                    <h6 className="text-md">{product.name}</h6>
                    <h6 className="text-xl font-bold text-green-500">₹{product.price}</h6>
                    <button onClick={() => deleteEvent(product.id)} class="inline-flex items-center justify-center  px-5 py-1.5 text-sm font-bold leading-6 text-white bg-red-400 border border-transparent rounded-full md:w-auto hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2">
                      <FaTrashAlt />
                    </button>
                  </div>
                ))
              ) : (
                <p className=" text-gray-100 text-center">
                  No Individual Events in Cart
                </p>
              )
            }

            <h3 className="text-xl text-white font-semibold my-2 border-0 mt-6">Combos</h3>
            <div className="grid sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
              {
                combos.length != 0 ? (
                  combos?.map((item) => (
                    <div className="combo_card text-gray-50 overflow-hidden relative flex p-4  rounded-2xl flex-col items-center justify-center bg-slate-900 bg-opacity-80 md:w-52">
                      <h5 className="text-md font-semibold text-center mb-3">{item.combo_name}</h5>
                      <div className="combo_body  flex rounded-2xl flex-col items-center justify-center ">
                        {
                          item.array_of_evname.map((item, index) => (
                            <div key={index} className="combo_event w-full px-4 flex justify-around items-center">
                              <div className="w-1/4">
                                <img src={item.logo} className='h-14 z-0 object-contain' alt={`Logo for ${item.name}`} />
                              </div>
                              <p className='px-4 w-3/4 text-sm'>{item.name}</p>
                            </div>
                            //Study this code
                          ))
                        }
                        <div className="flex justify-between items-center mt-3 gap-5 w-full">
                          <div className="flex flex-col">
                            <p className="text-sm font-medium line-through text-red-400">₹{item.total_price}</p>
                            <p className=" font-semibold mt-1 text-xl text-green-400">₹{item.discounted_price}</p>
                          </div>
                          <button onClick={() => deleteCombo(item.id)} class="inline-block font-semibold rounded-md border-0 bg-red-500 text-white  font-inherit text-center text-sm  py-2 px-4 cursor-pointer shadow-2xl shadow-orange-500/20">
                            <FaTrashAlt />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="w-full text-white text-center col-span-4 ">
                    Discover the magic of combos!🔮 Add some now!
                  </p>
                )
              }
            </div>
          </div>
          <div
            className="w-100 mx-2 md:w-1/3 sm:p-5 sm:m-5 text-white mr-5 ml-[40%] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border-2 border-gray-500 "
          >
            <div className="flex flex-col text-sm divide-y divide-gray-200">
              <h2 className="p-4 text-center text-2xl font-bold"> Order Summary</h2>
              <div className="p-4">
                <div className="flex flex-row w-full sm:gap-[65%]">
                  <div className="w-[40%] whitespace-pre text-xl">Order Total</div>
                  <div className="ml-auto text-xl">₹{total}</div>
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
          events={events}
          combos={combos}
          setEvents={setEvents}
          setCombos={setCombos}
          amount={total}
        />
      </div>}
    </Layout >
  );
};

export default privateUserRoute(CartPage);
// export default (CartPage);
