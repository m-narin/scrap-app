import { gql } from '@apollo/client'

export const GET_SCRAPS = gql`
	query getScraps { 
		scraps(order_by: {created_at: desc}) {
			id
			title
			created_at
		}
	}
`