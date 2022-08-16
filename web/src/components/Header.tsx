import Head from 'next/head'
import Link from 'next/link'

export const Header = () => {
	return (
		<>
			<Head>
				<title>ScrapApp</title>
			</Head>
			<header>
				<nav>
					<Link href="/scraps">
						Scrap
					</Link>
					<Link href="scraps/new">
						Add New
					</Link>
				</nav>
			</header>
		</>
	)
}