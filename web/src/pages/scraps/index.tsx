import { useGetScrapsQuery} from '../../graphql/generated/graphql'

import Stack from "@mui/material/Stack"
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { useRouter } from 'next/router'
import { useState } from 'react'

const Home = () => {
	const router = useRouter()
	const title = router.query.title ?? ""
	const { loading, data, error } = useGetScrapsQuery({ variables: { title: `%${title}%` } })
	const [searchInput, setSearchInput] = useState('');

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {JSON.stringify(error)}</p>;

	return (
		<>
		<form
			onSubmit={e => {
				e.preventDefault();
				router.push({
					pathname: "/scraps",
					query: {title: searchInput}
				});
			}}
        >
        <Stack direction="row" mt={4} spacing={2} justifyContent="right">
			<TextField 
				id="outlined-basic" 
				label="タイトル" 
				variant="outlined" 
				value={searchInput}
				onChange={e => (setSearchInput(e.target.value))}
			/>
			<Button
				type="submit"
				variant="contained"
				>
				スクラップを検索
			</Button> 
        </Stack>
        
        </form> 
			<Stack mt={3} rowGap={2} alignItems="center">
				{data?.scraps.map((scrap) => {
					return (
					<Card 
						sx={{
							width: '80%',
							'&:hover': {
								cursor: "pointer",
							},
						}} 
						onClick={() => {
							router.push(`/scraps/${scrap.id}`)
						}
						}
					>
						<CardContent>
							<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
								<Box>
									<Typography variant="h6">
										{scrap.title}
									</Typography>
									{scrap.created_at}
								</Box>
								<Box>
									<Typography>
										コメント数
									</Typography>
									<Typography sx={{ textAlign: 'right' }}>
										{scrap.comments_aggregate.aggregate?.count}
									</Typography>
								</Box>
							</Box>
						</CardContent>
						
					</Card>
					)
				})}
			</Stack>
			
		</>
	)
}

export default Home
