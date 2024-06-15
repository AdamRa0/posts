import { UUID } from "crypto";

export type User = {
    id: UUID,
    emailAddress: string,
    username: string,
    handle: string,
    bio: string,
    dateCreated: Date,
    profileImage: string,
    bannerImage: string,
    isActive: boolean,
    isPrivate: boolean,
}