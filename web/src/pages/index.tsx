import type { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { GET_SCRAPS } from '../graphql/queries'
import { GetScrapsQuery } from '../types/generated/graphql'

const Home: NextPage = () => {
  const { loading, data, error } = useQuery<GetScrapsQuery>(GET_SCRAPS)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <>
      {console.log(data)}
      {data?.scraps.map((scrap) => {
        return (
          <p>
            id: {scrap.id}
            title: {scrap.title}
            created_at: {scrap.created_at}
          </p>
        )
      })}
    </>
  )
}

export default Home
