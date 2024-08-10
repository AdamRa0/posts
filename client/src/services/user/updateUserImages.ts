import { getCookie } from "@helpers/extractCookie";

export async function updateUserImagesService(profileImage?: File, bannerImage?: File): Promise<Response> {

    const token = getCookie("csrf_access_token");

    const URL = "/api/v1/users/profile/update-image";

    const headers = { "X-CSRF-TOKEN": token! };

    const form = new FormData();

    if (bannerImage) { 
        form.append("banner_image", "True");
        form.append("banner_img", bannerImage);
    }

    if (profileImage) {
        form.append("profile_image", "True");
        form.append("profile_img", profileImage);
    }

    const response = await fetch(URL, {
        headers: headers,
        method: "PATCH",
        body: form,
    })

    return response;
}