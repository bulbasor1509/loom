import type { Response } from "express";
interface SuccessResponseType {
    message: string;
    status: number;
    data: any;
}
type FailureResponseType = Omit<SuccessResponseType, "data">;
export declare class APIResponse {
    successReturn(res: SuccessResponseType): (response: Response) => Response<any, Record<string, any>>;
    failureReturn(res: FailureResponseType): (response: Response) => Response<any, Record<string, any>>;
}
export {};
//# sourceMappingURL=response.d.ts.map