import type { NextPage } from 'next'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CreateScrapMutation, CreateScrapDocument } from '../../graphql/generated/graphql'
import { Header } from '../../components/Header'

const AddScrap: NextPage = () => {
  const [scrapInput, setScrapInput] = useState('');
  const [addScrap] = useMutation<CreateScrapMutation>(CreateScrapDocument)

  return (
    <>
      <Header />
			<form
        onSubmit={e => {
          e.preventDefault();
          addScrap({ variables: { title: scrapInput } });
        }}
      >
      <input
        className="input"
        placeholder="new scrap"
        value={scrapInput}
        onChange={e => (setScrapInput(e.target.value))}
      />

      <button type="submit">Submit</button>
      </form>
      
    </>
  )
}

export default AddScrap
