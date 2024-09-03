export async function getUsersService() {

    const URL = "/api/v1/users/";

    const response = await fetch(URL);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`${error.message}`);
    }

    const data = await response.json();

    return data;
}