import { createContext } from 'react';
import { initialState } from "./initialstate";

const GlobalContext = createContext(initialState);

export default GlobalContext;