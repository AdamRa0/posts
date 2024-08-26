export async function signoutService() {
    const response = await fetch("/api/v1/auth/signout", {
        method: "POST"
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const data = await response.json();

    return data;
}