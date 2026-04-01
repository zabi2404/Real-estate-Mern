import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import  {store} from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './redux/store.ts'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '';

createRoot(document.getElementById('root')!).render(


<Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
</Provider>
  ,
)
