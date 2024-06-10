import { countState } from "types/countState"
import { RenderData } from "types/enums/renderData"

export type AuthFormProps = {
    handleToggle: () => void,
    state: countState,
    dispatch: (param: RenderData) => void,
}