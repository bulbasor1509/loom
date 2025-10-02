import type {Response} from "express";

interface SuccessResponseType {
    response: Response
    message: string
    status: number
    data: any
}

type FailureResponseType = Omit<SuccessResponseType, "data">

export class APIResponse {
    successReturn(res: SuccessResponseType) {
        return res.response.json({
            data: res.data,
            status: res.status,
            message: res.message
        })
    }

    failureReturn(res: FailureResponseType) {
        return res.response.json({
            data: [],
            status: res.status,
            message: res.message
        })
    }
}