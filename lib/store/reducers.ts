import { GridState, GridAction, UPDATE_CELL_VALUE } from "./actions";

const initialState: GridState  = {
    cells: [[]]
}

const reducer = (
    state: GridState = initialState,
    action: GridAction
): GridState => {
    switch(action.type) {
        case UPDATE_CELL_VALUE:
            return {
                ...state
            };
    }

    return state;
}

export default reducer;
