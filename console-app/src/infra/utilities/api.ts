import {Types} from "../../common";

export class Api {
    public static getCarModel(id: string) {
        return Api.executeGet<Types.CarModel>(`/api/cars/getCarModel/${id}`);
    }

    public static getCarModels() {
        return Api.executeGet<Types.CarModel[]>("/api/cars/getCarModels");
    }

    public static getDriverModel(id: string) {
        return Api.executeGet<Types.DriverModel>(`/api/drivers/getDriverModel/${id}`);
    }

    public static getDriverModels() {
        return Api.executeGet<Types.DriverModel[]>("/api/drivers/getDriverModels");
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