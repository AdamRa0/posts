export async function signoutService(): Promise<number> {
    const response = await fetch("/api/v1/auth/signout");

    return response.status;
}