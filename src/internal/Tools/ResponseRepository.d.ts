export interface IResponse {
    id?: string;
    timestamp?: string;
    userInfo: {
        fullName: string;
        emailAddress: string;
    };
    isSubscribed: boolean;
    message: string;
}
export declare namespace ResponseRepository {
    function writeNew(input: IResponse): any;
    function getById(id: string): Promise<Partial<IResponse>>;
    function getAll(): Promise<Partial<IResponse>[]>;
}
