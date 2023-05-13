import React, { createContext, useContext, useReducer } from "react";

//contect (Store)
export const StateContext = createContext()

//provider
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext)
