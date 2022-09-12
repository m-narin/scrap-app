import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  useGetScrapByIdQuery,
  useEditScrapTitleMutation,
  useDeleteScrapMutation,
  useCreateCommentMutation
} from '../../graphql/generated/graphql'

import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import TextareaAutosize from '@mui/material/TextareaAutosize'

import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'

import { styled } from '@mui/material/styles'

const CustomEditIcon = styled(EditIcon)({
  padding: '8px',
  color: 'gray',
  fontSize: '30',
  cursor: 'pointer',
  transition: '0.15s',
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: 'rgba(128, 128, 128, 0.2)'
  }
})

const CustomCheckIcon = styled(CheckIcon)({
  padding: '8px',
  color: 'green',
  fontSize: '30',
  cursor: 'pointer',
  transition: '0.15s',
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: 'rgba(60, 179, 113, 0.2)'
  }
})

const CustomCloseIcon = styled(CloseIcon)({
  padding: '8px',
  color: 'red',
  fontSize: '30',
  cursor: 'pointer',
  transition: '0.15s',
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: 'rgba(255, 0, 0, 0.2)'
  }
})

const DetailPage = () => {
  const router = useRouter()
  const id = router.query.id as string

  // Scrapとそのcomment一覧のquery
  const { data, loading, error, refetch } = useGetScrapByIdQuery({ variables: { id: Number(id) } })

  const scrap = data?.scraps_by_pk!

  // 編集文字のState
  const [scrapEditInput, setScrapEditInput] = useState('')

  // 編集状態かどうかのState
  const [editActive, seteditActive] = useState(false)

  // scrap削除のmutation
  const [deleteMutate] = useDeleteScrapMutation({
    onCompleted() {
      router.push('/')
    },
    onError(error) {
      console.error(error)
    }
  })

  // scrap編集のmutation
  const [editMutate] = useEditScrapTitleMutation({
    onCompleted() {
      refetch()
    },
    onError(error) {
      console.error(error)
    }
  })

  // comment入力のsate
  const [commentInput, setCommentInput] = useState('')

  // comment追加のmutation
  const [mutate] = useCreateCommentMutation({
    onCompleted() {
      refetch()
    },
    onError(error) {
      console.error(error)
    }
  })

  const handleEdit = (id: number, input: string) => {
    editMutate({ variables: { id: id, title: input } })
    seteditActive(false)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {JSON.stringify(error)}</p>

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ width: '80%', margin: '20px auto' }}>
        <Typography sx={{ display: 'flex', alignItems: 'center', width: '80%', fontWeight: 'lighter', color: 'gray' }}>
          <Box sx={{ marginRight: '20px' }}>{scrap.created_at}</Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ChatBubbleOutlineIcon />
            {scrap.comments_aggregate.aggregate?.count}
          </Box>
        </Typography>

        <Button
          color="error"
          variant="contained"
          sx={{ width: '200px' }}
          onClick={() => {
            deleteMutate({ variables: { id: scrap.id } })
          }}
        >
          スクラップを削除する
        </Button>
      </Stack>

      {editActive ? (
        <Stack direction="row" spacing={2} sx={{ width: '80%', margin: '20px auto' }}>
          <TextField
            variant="standard"
            placeholder={scrap.title}
            value={scrapEditInput}
            onChange={(e) => setScrapEditInput(e.target.value)}
          />
          <CustomCheckIcon onClick={() => handleEdit(scrap.id, scrapEditInput)} />
          <CustomCloseIcon onClick={() => seteditActive(false)} />
        </Stack>
      ) : (
        <Stack direction="row" alignItems="center" sx={{ width: '80%', margin: '20px auto' }}>
          <Typography variant="h4">{scrap.title}</Typography>
          <CustomEditIcon onClick={() => seteditActive(true)} />
        </Stack>
      )}

      <Stack mt={3} rowGap={2} alignItems="center">
        {scrap.comments.map((comment) => {
          return (
            <Card sx={{ width: '80%' }}>
              <CardContent>
                <Typography sx={{ color: 'gray', marginBottom: '20px' }}>{comment.created_at}</Typography>
                <Typography>{comment.body}</Typography>
              </CardContent>
            </Card>
          )
        })}
      </Stack>

      <Box sx={{ width: '80%', margin: '20px auto', backgroundColor: 'white', padding: '20px' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            // comment追加のmutation実行
            mutate({ variables: { scrapId: scrap.id, body: commentInput } })
          }}
        >
          <Stack spacing={2}>
            <TextareaAutosize
              minRows={6}
              placeholder="スクラップにコメントを追加"
              style={{
                border: 'none',
                borderBottom: 'solid gray 1px',
                outline: 'none'
              }}
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
          </Stack>
          <Stack mt={4} spacing={2}>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: '100px', marginLeft: 'auto' }}
              disabled={!commentInput}
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
