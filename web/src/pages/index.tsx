import type { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { GetScrapsQuery, GetScrapsDocument } from '../graphql/generated/graphql'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()
  const { loading, data, error } = useQuery<GetScrapsQuery>(GetScrapsDocument)
  
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

      <button onClick={() => router.push('/new')} >
        NewScrap
      </button>
    </>
  )
}

export default Home
