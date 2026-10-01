import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Home'
import frenchWords from './FrenchWords.json'
import germanWords from './GermanWords.json'
import italianWords from './ItalianWords.json'
import Words from './Words'
import PageNotFound from './PageNotFound'

const router = createBrowserRouter([
  { path: '/',        element: <Home/> },
  { path: '/french',  element: <Words words={frenchWords} language="French" nextRoute="/german" nextDescription="German test" /> },
  { path: '/german',  element: <Words words={germanWords} language="German" nextRoute="/italian" nextDescription="Italian test" /> },
  { path: '/italian', element: <Words words={italianWords} language="Italian" nextRoute="/" nextDescription="Home" /> },
  { path: '*',        element: <PageNotFound/> }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
