import { lazy } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router'
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
        path: '/',
        element: <AppLayout />,
        children: [
            { index: true, element: <Home/> },
            { path: '/books',     element: <Books books={books} format="TABLE"/> },
            { path: '/films',     element: <Films films={films} format="TABLE"/> },
            { path: '/moreStuff', element: <MoreStuff books={books} films={films} /> },
            { path: '*',          element: <PageNotFound /> },
        ]
    }
])

export default function App() {
    return <RouterProvider router={router} />
}