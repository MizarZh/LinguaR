import { createBrowserRouter } from 'react-router-dom'
import Home from './reader/home'
import ReadingView from './reader/ReadingView'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/reader',
    element: <ReadingView />,
  },
])

export default router
