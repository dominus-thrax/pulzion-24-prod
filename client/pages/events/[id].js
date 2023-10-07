import Layout from "../../Components/Layout";
import { useRouter } from "next/router";
import EventDetails from "../../Components/EventDetails";
import { getEvent } from "../../action/registeration";
import { useEffect, useState } from "react";

const EventDetailsPage = (s) => {
    const [event, setEvent] = useState(null);
    const router = useRouter();
    useEffect(() => {
        let { id } = router.query;
        if (id) {
            (async () => {
                let res = await getEvent(id);
                setEvent(res.events);
            })();
        }
    }, [router]);

    return <Layout>{!event ? "" : <EventDetails event={event} />}</Layout>;
};

export default EventDetailsPage;

// Remove the getServerSideProps export from here
