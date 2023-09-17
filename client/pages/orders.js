import { useEffect, useState } from "react";
import { getTransaction } from "../action/paymentForm";
import Layout from "../Components/Layout";
import SectionHeading from "../Components/SectionHeading";
import moment from 'moment-timezone';
import privateUserRoute from "../routes/privateUserRoute";
import ContentLoader from "../Components/ContentLoader";

function order() {
    const [orders,setOrders] = useState([])
    const [loader,setLoader] = useState(true)

    useEffect(()=> {
        (
          async () => {
            try {
              const res = await getTransaction();
              if(res?.error) {
                setLoader(false)
                return;
              }
              setLoader(false)
              setOrders(res.transactions)
            } catch (e) {
                setLoader(false)
              
            }
          }
        )();
      },[setOrders])

    return (
        <Layout>
            {loader && <ContentLoader />}
            <SectionHeading>Orders</SectionHeading>
            <div className="flex flex-col items-center justify-center gap-6 mt-8 sm:grid-cols-2 md:grid-cols-3 sm:grid lg:grid-cols-4">
                {
                    orders.map((order) => (
                        <div className="justify-self-center bg-gradient-to-br shadow-[0px_0px_5px_2px] shadow-sky-700 border rounded-xl p-2 border-[#172947] border-solid w-60 gap-4 from-[#172947c5] to-black opacity-80 flex flex-col text-white">
                        <span className="text-center border-b border-[#2b446e]">Transaction Id: {order.transaction_id}</span>
                        <div className="flex flex-row">
                            <span>₹{order.amount}</span>
                            <span className="ml-auto">{moment(order.created_at).format("DD/MM/YYYY")}</span>
                        </div>
                        <div>
                            {order.events.map((event, index)=> {
                                return (
                                    <span>{event}{index < order.events.length - 1 ? ", " : " "}</span>
                                )
                            })}
                        </div>
                        <span className="text-center">{order.status}</span>
                    </div> 
                    ))
                }               
            </div>
            <div className="mt-8 text-center text-white">
                <span>For any queries contact</span><br></br>
                <a href="mailto: queries.pulzion@gmail.com">queries.pulzion@gmail.com</a>
            </div>
        </Layout>
    )
}

export default privateUserRoute(order);