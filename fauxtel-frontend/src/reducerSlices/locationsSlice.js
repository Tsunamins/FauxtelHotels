import { createSlice } from '@reduxjs/toolkit';

// todo work with new redux toolkit examples to complete this
const initialState = []

const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        // Give case reducers meaningful past-tense "event"-style names
        retrievedLocations(state, action) {
            const { id, text } = action.payload
            // "Mutating" update syntax thanks to Immer, and no `return` needed
            state.locations.push({
                id,
                text,
                completed: false
            })
        },
        todoToggled(state, action) {
            // Look for the specific nested object to update.
            // In this case, `action.payload` is the default field in the action,
            // and can hold the `id` value - no need for `action.id` separately
            const matchingTodo = state.todos.find(todo => todo.id === action.payload)

            if (matchingTodo) {
                // Can directly "mutate" the nested object
                matchingTodo.completed = !matchingTodo.completed
            }
        }
    }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { todoAdded, todoToggled } = locationsSlice.actions

// Export the slice reducer as the default export
export default locationsSlice.reducer