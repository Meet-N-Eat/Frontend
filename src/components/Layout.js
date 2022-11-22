import {Outlet} from 'react-router-dom'

function Layout() {
	return (
		<div className='App h-full'>
			<header className='row-start-1 row-span-1'>
				<NavBar />
			</header>
			<main>
				<Outlet />
			</main>
		</div>
	)
}

export default Layout
