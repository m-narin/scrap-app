import { useState } from 'react'
import { useRouter } from 'next/router'
import { useGetScrapByIdQuery } from '../../graphql/generated/graphql'

import Stack from "@mui/material/Stack"
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'


const DetailPage = () => {
	
	const router = useRouter()
	const id = router.query.id as string

	// Scrapとそのcomment一覧のquery
	const { loading, data, error } = useGetScrapByIdQuery({ variables: { id: Number(id) } })
	const scrap = data?.scraps_by_pk!

	// comment入力のsate
  const [commentInput, setCommentInput] = useState('');

  // comment追加のmutation

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {JSON.stringify(error)}</p>;

	// commentのハードコーディング
	const comments = [
		{
			"id": 2,
			"body": "test2",
			"created_at": "2022-08-23T02:04:19.133197+00:00"
		},
		{
			"id": 3,
			"body": "test2-2",
			"created_at": "2022-08-23T02:04:29.39183+00:00"
		}
	]

	return (
		<>
			<Typography sx={{width: '80%', margin: '20px auto', fontWeight: 'lighter'}}>
				{scrap.created_at}
			</Typography>
			<Typography variant="h5" sx={{width: '80%', margin: '20px auto'}}>
				{scrap.title}
			</Typography>

			<Stack mt={3} rowGap={2} alignItems="center">
				{comments.map((comment) => {
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
						}}
					>
					<CardContent>
						{comment.created_at}
						<Typography variant="h6">
							{comment.body}
						</Typography>
					</CardContent>
				</Card>
					)
				})}
			</Stack>

			<Box sx={{width: '80%', margin: '20px auto', backgroundColor: 'white', padding: '20px'}}>
				<form
						onSubmit={e => {
							e.preventDefault();
							// comment追加のmutation実行
						}}
					>
					<Stack spacing={2}>
						<TextField 
							id="standard-multiline-static" 
							label="スクラップにコメントを追加" 
							variant="standard" 
							multiline
							rows={4}
							value={commentInput}
							onChange={e => (setCommentInput(e.target.value))}
						/>
					</Stack>
					<Stack mt={4} spacing={2}>
						<Button
							type="submit"
							variant="contained"
							sx = {{width: '20%', marginLeft:'auto'}}
						>
							投稿する
						</Button> 
					</Stack>
					</form> 
				</Box>
			
		</>
	)
}

export default DetailPage