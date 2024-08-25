import { UUID } from "crypto";

export default async function fetchSubscribersService(userId: string | UUID) {
    const response = await fetch(
        "/api/v1/users/subscribees?" +
        new URLSearchParams({ "user-id": userId })
    )

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const data = await response.json();

    return data;
}