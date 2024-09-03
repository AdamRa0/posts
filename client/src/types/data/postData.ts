import { UUID } from "crypto"
import { User } from "./userData"

export type PostData = {
    id: UUID,
    body: string,
    author_id: UUID,
    approvals: number,
    disapprovals: number,
    reposts?: number,
    comments: number,
    parent_id?: UUID,
    children?: PostData[],
    time_created: Date,
    time_edited: Date,
    post_file?: string,
    liked_by: User[],
    disliked_by: User[],
    reposted_by: User[],
}