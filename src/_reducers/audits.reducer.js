import { auditConstants } from '../_constants';

export function audits(state = {loading:false,items:[],error:""}, action) {
  switch (action.type) {
    case auditConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case auditConstants.GETALL_SUCCESS:
      return {
        items: action.audits
      };
    case auditConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}