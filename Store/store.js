import { configureStore} from '@reduxjs/toolkit'
import accountSlice from '../Features/accountSlice'
import itemSlice from '../Features/itemSlice'
import menuSlice from '../Features/menuSlice'
import modelSlice from '../Features/modelSlice'
import orderSlice from '../Features/orderSlice'
import saleReportSlice from '../Features/saleReportSlice'
import stationSlice from '../Features/stationSlice'


export default configureStore({
    reducer: {
        account: accountSlice,
        menu: menuSlice,
        model: modelSlice,
        item: itemSlice,
        station: stationSlice,
        order: orderSlice,
        sale: saleReportSlice
    },
})