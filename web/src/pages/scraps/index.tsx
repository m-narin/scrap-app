import { useGetScrapsQuery } from '../../graphql/generated/graphql'

import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import SearchIcon from '@mui/icons-material/Search'
import CircularProgress from '@mui/material/CircularProgress'

import { useRouter } from 'next/router'
import { useState } from 'react'

import { toRelativeDate } from '../lib/toRelativeDate'

const Home = () => {
  const router = useRouter()
  const title = router.query.title ?? ''
  const { loading, data, error } = useGetScrapsQuery({ variables: { title: `%${title}%` } })
  const [searchInput, setSearchInput] = useState('')

  if (loading)
    return (
      <>
        {console.log('loading')}
        <Box sx={{ textAlign: 'center', marginTop: '70px' }}>
          <CircularProgress />
        </Box>
      </>
    )
  if (error) return <p>Error: {JSON.stringify(error)}</p>

  return (
    <>
      {console.log('page')}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          router.push({
            pathname: '/scraps',
            query: { title: searchInput }
          })
        }}
      >
        <Stack direction="row" mt={2} spacing={2} justifyContent="right">
          <TextField
            id="outlined-basic"
            label="タイトル"
            variant="outlined"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button type="submit">
            <SearchIcon />
          </Button>
        </Stack>
      </form>
      <Stack mt={2} rowGap={1} alignItems="center">
        {data?.scraps.map((scrap, key) => {
          return (
            <Card
              variant="outlined"
              sx={{
                width: '95%',
                transition: '0.2s',
                '&:hover': {
                  cursor: 'pointer',
                  opacity: '0.6'
                }
              }}
              onClick={() => {
                router.push(`/scraps/${scrap.id}`)
              }}
              key={key}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h6">{scrap.title}</Typography>
                    <Typography variant="subtitle2" sx={{ color: 'gray', fontWeight: '300' }}>
                      {`${toRelativeDate(scrap.created_at)}に作成`}
                    </Typography>
                  </Box>
                  <Box sx={{ color: 'gray' }}>
                    <ChatBubbleOutlineIcon />
                    <Typography sx={{ textAlign: 'center' }}>{scrap.comments_aggregate.aggregate?.count}</Typography>
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
