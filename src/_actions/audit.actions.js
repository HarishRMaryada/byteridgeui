import { auditConstants } from '../_constants';
import { auditService } from '../_services';

export const auditActions = {
    getAll
};

function getAll() {
    return dispatch => {
        dispatch(request());

        auditService.getAll()
            .then(
                audits => dispatch(success(audits)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: auditConstants.GETALL_REQUEST } }
    function success(audits) { return { type: auditConstants.GETALL_SUCCESS, audits } }
    function failure(error) { return { type: auditConstants.GETALL_FAILURE, error } }
}