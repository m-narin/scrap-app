import { useRouter } from 'next/router'
import { useGetScrapByIdQuery } from '../../graphql/generated/graphql'

const DetailPage = () => {
	
	const router = useRouter()
	const id = router.query.id as string
	const { loading, data, error } = useGetScrapByIdQuery({ variables: { id: Number(id) } })
	const scrap = data?.scraps_by_pk!

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {JSON.stringify(error)}</p>;

	return (
		<>
			{scrap.title}
		</>
	)
}

export default DetailPage
