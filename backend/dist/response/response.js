export class APIResponse {
    successReturn(res) {
        return function (response) {
            return response.status(200).json({
                data: res.data,
                status: res.status,
                message: res.message
            });
        };
    }
    failureReturn(res) {
        return function (response) {
            return response.status(200).json({
                data: [],
                status: res.status,
                message: res.message
            });
        };
    }
}
//# sourceMappingURL=response.js.map