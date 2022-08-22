import { useRouter } from 'next/router'

const DetailPage = () => {
	
    const router = useRouter()
    const { id,loading,error } = router.query

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {JSON.stringify(error)}</p>;

	return (
		<>
			{id}
		</>
	)
}

export default DetailPage
