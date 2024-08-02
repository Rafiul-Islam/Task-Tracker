import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import routers from "./router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routers}/>
    </QueryClientProvider>
)
