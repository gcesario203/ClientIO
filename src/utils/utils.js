import Axios from 'axios'
import { GeneralConstants } from '../config/constants'
import Vue from 'vue'

export default {
    async SendMessageUnauth(pMethod, pRoute, pData = null, pMessage = null) {

        try {
            var lResponse = await Axios({
                method: pMethod,
                url: `${GeneralConstants.BASEURL}${pRoute}`,
                data: pData
            })

            if (pMessage !== null) {
                Vue.$notify.success(pMessage)
            }

            return lResponse
        } catch (error) {
            Vue.$notify.warning(error.response.data.error)

            return false
        }
    },

    async Login(pEmail, pSenha) {
        try {
             const lResponse = await Axios.post(`${GeneralConstants.BASEURL}/signin`,
            {
                email: pEmail,
                senha: pSenha
            })

            localStorage.setItem(GeneralConstants.STORAGEKEY, JSON.stringify(lResponse.data))

            return true
        } catch (error) {
            Vue.$notify.danger(error.response.data.error)
            return false   
        }
    },

    async ValidateToken() {
        try {
            const lUser = JSON.parse(localStorage.getItem(GeneralConstants.STORAGEKEY))

            const lResult = await Axios.post(`${GeneralConstants.BASEURL}/validateToken`,
                lUser
            )
            if(lResult.data)
            {
                Axios.defaults.headers.common['Authorization'] = `Bearer ${lUser.token}`
            }
            else
            {
                Axios.defaults.headers.common['Authorization'] = ``
                localStorage.removeItem(GeneralConstants.STORAGEKEY)
            }

            return lResult.data
        } catch (error) {
            Axios.defaults.headers.common['Authorization'] = ``
            localStorage.removeItem(GeneralConstants.STORAGEKEY)

            // Vue.$notify.warning(error.response.data.error)
            return false
        }
    },

    async SendAuthMessage(pMethod, pRoute, pData = null, pMessage = null) {
        try {
            var lResponse = await Axios({
                method: pMethod,
                url: `${GeneralConstants.BASEURL}${pRoute}`,
                data: pData
            })

            if (pMessage !== null) {
                Vue.$notify.success(pMessage)
            }

            return lResponse
        } catch (error) {
            Vue.$notify.warning(error.response.data.error)

            return false
        }
    },

    LogOut() {
        Axios.defaults.headers.common['Authorization'] = ``
        localStorage.removeItem(GeneralConstants.STORAGEKEY)
    }
}