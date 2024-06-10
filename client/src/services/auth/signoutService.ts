export async function signoutService() {
    await fetch("/api/v1/auth/signout")
}