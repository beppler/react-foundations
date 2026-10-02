import { lazy } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import DataProvider from './DataProvider'

import MyMenu from './MyMenu';
// import Home from './Home';
// import PageNotFound from './PageNotFound';
// import MoreStuff from './MoreStuff';
// import Books from './Books';
// import Films from './Films';
const Home = lazy(() => import('./Home'))
const PageNotFound = lazy(() => import('./PageNotFound'))
const MoreStuff = lazy(() => import('./MoreStuff'))
const Books = lazy(() => import('./Books'))
const Films = lazy(() => import('./Films'))

const books = DataProvider.getAllBooks()
const films = DataProvider.getAllFilms()

function AppLayout() {
    return (
        <>
            <MyMenu />         { /* Always display my common menu here (for example) */ }
            <Outlet />         { /* Display the current route component here */ }
        </>
    )
}

const router = createBrowserRouter([
    {
        element: <AppLayout />,

        children: [
            { path: '/', element: <Home/> },
            { path: '*',          element: <PageNotFound /> },
            { path: '/books',     element: <Books books={books} format="TABLE"/> },
            { path: '/films',     element: <Films films={films} format="TABLE"/> },
            { path: '/moreStuff', element: <MoreStuff books={books} films={films} /> },
        ]
    }
])

export default function App() {
    return <RouterProvider router={router} />
}