import { GET_ACCOUNT, SIGN_OUT, UPDATE_ACCOUNT } from '../../utils/Constants'

const accountReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ACCOUNT:
            return {
                ...action.payload.account
            }
        case UPDATE_ACCOUNT:
            return {
                ...action.payload
            }

        case SIGN_OUT:
            return {}
        default:
            return state;
    }
}
export default accountReducer