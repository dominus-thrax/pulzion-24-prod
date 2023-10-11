import Layout from "../../Components/Layout";
import { useRouter } from "next/router";
import EventDetails from "../../Components/EventDetails";
import { getAllEvents, getEvent, getEventLogin } from "../../action/registeration";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";


const EventDetailsPage = () => {

    const { user } = useContext(AppContext);

    const isLoggedIn = !!user?.id;
    const [event, setEvent] = useState(null);
    const router = useRouter();
    useEffect(() => {
        let { id } = router.query;
        if (id) {
            if (isLoggedIn) {
                (async () => {
                    let res = await getEventLogin(id);
                    setEvent(res.events);
                })();
            } else {
                (async () => {
                    let res = await getEvent(id);
                    setEvent(res.events);
                })();
            }
        }
    }, [router]);

    return <Layout>{!event ? "" : <EventDetails event={event} />}</Layout>;
};

export default EventDetailsPage;
