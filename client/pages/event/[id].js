import Layout from '../../Components/Layout';
import { useRouter } from 'next/router'
import EventDetails from '../../Components/EventDetails';
import { getEvent } from '../../action/registeration';

const EventDetailsPage = ({ event }) => {

    const router = useRouter();
    let { id } = router.query;

    console.log("Event: ")
    console.log(event)


    return (
        <Layout>

            {
                !event ? '' :
                    <EventDetails event={event} />
            }
        </Layout >

    )
}



export async function getServerSideProps(context) {
    const { id } = context.query;  //grab the id from the url
    let event = null;
    try {
        console.log("API URL: ");

        await getEvent(id).then(res => {
            console.log("Response: ");
            console.log(res);
            event = res.events;
            console.log(event);
        }).catch(err => {
            console.log(err);

        })

    } catch (err) {
        console.log("Error: ");
        console.log(err);
        event = err;
    }

    return {
        props: {
            event,
        }
    }
}


export default EventDetailsPage;