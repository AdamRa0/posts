import { countState } from "types/states/countState"
import { RenderData } from "types/enums/renderData"

export type AuthFormProps = {
    handleToggle: () => void,
    state: countState,
    dispatchFunc: (param: RenderData) => void,
    closeModal: () => void,
}