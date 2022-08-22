import { useGetScrapsQuery } from '../../graphql/generated/graphql'

import Stack from "@mui/material/Stack"
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const Home = () => {
	const { loading, data, error } = useGetScrapsQuery()

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {JSON.stringify(error)}</p>;

	return (
		<>
			<Stack mt={3} rowGap={2} alignItems="center">
				{data?.scraps.map((scrap) => {
					return (
					<Card sx={{width: '80%'}}>
						<CardContent>
							<Typography variant="h6">
								{scrap.title}
							</Typography>
						</CardContent>
						{scrap.created_at}
					</Card>
					)
				})}
			</Stack>
			
		</>
	)
}

export default Home
