import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import tw from 'tailwind-styled-components'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Section from '../components/Section'
import useAuth from '../hooks/useAuth'
import { Movie } from '../interface/type'
import { modalState } from '../recoil/modalAtom'
import requests from '../utils/requests'


interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
}
const Home = ({
  netflixOriginals, 
  trendingNow, 
  topRated, 
  actionMovies, 
  comedyMovies, 
  horrorMovies, 
  romanceMovies, 
  documentaries
}: Props) => {
  const {logout, loading} = useAuth();
  const showModal = useRecoilValue(modalState);

  if (loading) return null;
  return (
    <div
      className={`relative h-screen bg-gradient-to-bl lg:h-[140vh] 
      }`}
    >
      <Head>
        <title>
         - Netflix
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className=" space-y-1 lg:space-y-12 ">
        <Banner netflixOriginals={netflixOriginals} />

        <section className="md:space-y-7 lg:space-y-14">
          <Section title="Trending Now" movies={trendingNow} />
          <Section title="Top Rated" movies={topRated} />
          <Section title="Action Thrillers" movies={actionMovies} />
          {/* My List */}
          {/* {list.length > 0 && <Section title="My List" movies={list} />} */}

          <Section title="Comedies" movies={comedyMovies} />
          <Section title="Scary Movies" movies={horrorMovies} />
          <Section title="Romance Movies" movies={romanceMovies} />
          <Section title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {showModal && <Modal/>}
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
    const [
        netflixOriginals,
        trendingNow,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries
    ] = await Promise.all([
        fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
        fetch(requests.fetchTrending).then((res) => res.json()),
        fetch(requests.fetchTopRated).then((res) => res.json()),
        fetch(requests.fetchActionMovies).then((res) => res.json()),
        fetch(requests.fetchComedyMovies).then((res) => res.json()),
        fetch(requests.fetchHorrorMovies).then((res) => res.json()),
        fetch(requests.fetchRomanceMovies).then((res) => res.json()),
        fetch(requests.fetchDocumentaries).then((res) => res.json()),
    ])

    return {
        props: {
            netflixOriginals: netflixOriginals.results,
            trendingNow: trendingNow.results,
            topRated: topRated.results,
            actionMovies: actionMovies.results,
            comedyMovies: comedyMovies.results,
            horrorMovies: horrorMovies.results,
            romanceMovies: romanceMovies.results,
            documentaries: documentaries.results, 
        }
    }
}
