import { getUserService } from "@services/user/getUser";
import { getCookie } from "@helpers/extractCookie";
import { UUID } from "crypto";
import { useEffect, useState } from "react";
import { PostAuthor } from "@/types/data/postAuthorData";

export default function useFetchPostAuthorDetails(authorID: UUID): PostAuthor | undefined {
    const [author, setAuthor] = useState<PostAuthor>();

    const token = getCookie("csrf_access_token");
    useEffect(() => {
        getUserService(token!, false, authorID)
            .then(data => {
                setAuthor({
                    username: data.username,
                    handle: data.handle,
                    avatar: data.avatar
                })
            })
    }, [token, authorID]);

    return author;
}