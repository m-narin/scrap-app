import { useState } from 'react'
import { useRouter } from 'next/router'
import { useCreateScrapMutation } from '../../graphql/generated/graphql'
import Stack from "@mui/material/Stack"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormLabel from '@mui/material/FormLabel'
import Typography from '@mui/material/Typography'

const AddScrap = () => {
  const router = useRouter()
  const [scrapInput, setScrapInput] = useState('');

  // 宣言的実装
  const [mutate] = useCreateScrapMutation({
    onCompleted(){
      router.push('/')
    },
    onError(error){
      console.error(error)
    }
  })

  return (
    <>
        <Stack mt={4} rowGap={4} alignItems="center">

          <Typography variant="h3">
            New Scrap
          </Typography>

          <FormLabel>
            スクラップはスレッド形式で気軽に知見をまとめられる場所です。
          </FormLabel>
        <form
          onSubmit={e => {

            // submitイベントのデフォルトの動作をキャンセルする
            e.preventDefault();
            mutate({ variables: { title: scrapInput } });
          }}
        >
        <Stack mt={4} spacing={2}>
          <TextField 
            id="outlined-basic" 
            label="タイトル" 
            variant="outlined" 
            value={scrapInput}
            onChange={e => (setScrapInput(e.target.value))}
          />
        </Stack>
        <Stack mt={4} spacing={2}>
          <Button
            type="submit"
            variant="contained"
          >
            スクラップを作成
          </Button> 
        </Stack>
        </form> 
      </Stack>
    </>
  )
}

export default AddScrap
