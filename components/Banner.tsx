import React, { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import { Movie } from '../interface/type'
import { baseUrl } from '../utils/requests'
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../recoil/modalAtom'

interface Props {
  netflixOriginals: Movie[]
}

function Banner({netflixOriginals}: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  const [showModal, setShowModal] = useRecoilState(modalState)

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    )
  }, [netflixOriginals])
  return (
    <Container>
      <ImageContainer>
        <Image src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}/>
      </ImageContainer>
      <Title>
        <MovieTitle>
            {movie?.title || movie?.name || movie?.original_name}
        </MovieTitle>
        <MovieDescription>
           {movie?.overview.slice(0,200)}..
        </MovieDescription>
        <ButtonContainer>
          <button className='flex items-center gap-x-2 rounded px-5 py-1.5 text-sm font-semibold border border-black transition transform hover:scale-x-105 md:py-2.5 md:px-8 md:text-xl bg-white/50 hover:bg-slate-300  text-black'>
              <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7 "/> Play
          </button>
          <button className='flex items-center gap-x-2 rounded px-5 py-1.5 text-sm font-semibold border border-slate-500 transition transform hover:scale-x-105  hover:bg-black md:py-2.5 md:px-8 md:text-xl bg-black/60'
           onClick={() => {
            setCurrentMovie(movie)
            setShowModal(true)
          }}>
              <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" /> More Info
          </button>
        </ButtonContainer>
      </Title>
    </Container>
  )
}

export default Banner

const Container = tw.div`
  flex flex-col space-y-2 pl-10 py-16 md:space-y-4 lg:h=[65vh] lg:justify-end
`
const ImageContainer = tw.div`
  absolute top-0 left-0 -z-10
`
export const Image = tw.img`
  object-contain
`
const Title = tw.div`
  m-4 
`
const MovieTitle = tw.h1`
  text-2xl md:text-4xl lg:text-7xl mb-4 font-bold lg:mt-32
`
const MovieDescription = tw.p`
  max-w-xs text-xs text-shadow-lg md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl font-extralight
`
const ButtonContainer = tw.div`
  flex space-x-3 mt-4
`
