import { Header } from './Header'
import { ReactElement } from 'react'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

export const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    {children}
  </>
)
