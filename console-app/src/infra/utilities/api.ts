import {Types} from "../../common";

export class Api {
    public static getCar(id: string) {
        return Api.executeGet<Types.Car>(`/api/cars/getCar/${id}`);
    }

    public static getDriver(id: string) {
        return Api.executeGet<Types.Driver>(`/api/drivers/getDriver/${id}`);
    }

    public static getEventModels() {
        return Api.executeGet<Types.EventModel[]>("/api/events/getEventModels");
    }

    public static getTracks() {
        return Api.executeGet<Types.Track[]>("/api/tracks/getTracks");
    }

    public static getUserModel() {
        return Api.executeGet<Types.GetUserModelResponse>("/api/auth/getUserModel");
    }

    public static login(request: Types.LoginRequest) {
        return Api.executePost<Types.LoginRequest, void>("/api/auth/login", request);
    }

    private static async executeGet<TResponse>(url: string): Promise<TResponse> {
        const response = await Api.execute(url, {method: "GET"});
        return await response.json() as TResponse
    }

    private static async executePost<TRequest, TResponse>(url: string, request: TRequest): Promise<TResponse> {
        const response =
            await Api.execute(
                url, {
                    body: JSON.stringify(request),
                    method: "POST"
                });

        if (response.bodyUsed) {
            return await response.json() as TResponse
        } else {
            return undefined as any;
        }
    }

    private static async execute(url: string, options: RequestInit) {
        return fetch(
            url,
            {
                ...options,
                headers: {
                    ...options.headers,
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            });
    }
}