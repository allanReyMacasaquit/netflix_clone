
import React from 'react'
import { useRecoilState } from 'recoil'
import { Movie } from '../interface/type'
import { modalState, movieState } from '../recoil/modalAtom'
import {Image} from './Banner'

interface Props {
  movie: Movie
}

function Thumbnail({ movie }: Props) {
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  const [showModal, setShowModal] = useRecoilState(modalState)

  return (
    <div
      className={`relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
      onClick={() => {
        setCurrentMovie(movie)
        setShowModal(true)
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded absolute "
        layout="fill"
      />
    </div>
  )
}

export default Thumbnail