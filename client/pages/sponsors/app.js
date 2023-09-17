import Head from 'next/head';

import Sponsors from '../../Components/Sponsors'
import Test from '../../Components/Test'

export default function Home() {
  return (
    
    <div className="bg-primaries-700 min-h-screen">
          <Head>
        <title>
          Pulzion'23 | Sponsors
        </title>
        <meta name='description' content="Pulzion is the annual flagship event organized by PICT ACM
				Student Chapter (PASC). Pulzion consists of multiple events in
				technical as well as non-technical domains including coding
				competitions, mock placement interviews, business
				management-based events, design and development based contests
				and quizzing events."/>
      </Head>
      <Sponsors></Sponsors>
    </div>
    
  )
}