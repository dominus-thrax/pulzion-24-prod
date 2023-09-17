import React, { useContext } from 'react'
import Head from 'next/head';
import Layout from '../Components/Layout';
import SectionHeading from '../Components/SectionHeading';
import Tabs from '../Components/Tabs';
import AppContext from '../context/AppContext';
import privateUserRoute from '../routes/privateUserRoute'

const MyEvents = () => {
	const { contEvents } = useContext(AppContext);
	return (
		<Layout>
			<Head>
				<title>Pulzion'23 | MY Events</title>
				<meta name='description' content="Pulzion is the annual flagship event organized by PICT ACM
				Student Chapter (PASC). Pulzion consists of multiple events in
				technical as well as non-technical domains including coding
				competitions, mock placement interviews, business
				management-based events, design and development based contests
				and quizzing events."/>
			</Head>
			<div className="px-4 sm:px-8 md:px-12 lg:px-16 py-5 md:py-10">
				<div className="flex justify-center mb-10">
					<SectionHeading>My Events</SectionHeading>
				</div>
				<Tabs events={contEvents} />
			</div>
		</Layout>
	)
}

export default privateUserRoute(MyEvents);