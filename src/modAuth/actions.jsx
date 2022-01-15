import { bindActionCreators } from '@reduxjs/toolkit'
import { reduxStoreMain } from '../redux/storeMain'
import {authTokenSlice} from'./slices'


export const authTokenActions = bindActionCreators(authTokenSlice.actions, reduxStoreMain.dispatch)

export { useSelector } from 'react-redux'
