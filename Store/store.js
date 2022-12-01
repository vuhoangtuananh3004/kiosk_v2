import { configureStore} from '@reduxjs/toolkit'
import accountSlice from '../Features/accountSlice'
import menuSlice from '../Features/menuSlice'


export default configureStore({
    reducer: {
        account: accountSlice,
        menu: menuSlice
    },
})