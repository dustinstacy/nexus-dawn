import React, { createContext, useContext, useMemo, useReducer } from 'react'
import axios from 'axios'

const initialState = {
    user: null,
    fetchingUser: true,
    userCards: [],
    userDeck: [],
    allCards: [],
    allItems: [],
    allOpponents: [],
}

const globalReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                fetchingUser: false,
            }
        case 'RESET_USER':
            return {
                ...state,
                user: null,
                fetchingUser: false,
                allCards: [],
                userCards: [],
                userDeck: [],
            }
        case 'SET_USER_CARDS':
            return {
                ...state,
                userCards: action.payload,
            }
        case 'SET_USER_DECK':
            return {
                ...state,
                userDeck: action.payload,
            }
        case 'SET_ALL_CARDS':
            return {
                ...state,
                allCards: action.payload,
            }
        case 'SET_ALL_ITEMS':
            return {
                ...state,
                allItems: action.payload,
            }
        case 'SET_ALL_OPPONENTS':
            return {
                ...state,
                allOpponents: action.payload,
            }
        default:
            return state
    }
}

const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, initialState)

    const getGlobalState = async () => {
        await getCurrentUser()
        await getAllCards()
        await getAllItems()
        await getAllOpponents()
    }

    const getCurrentUser = async () => {
        try {
            const res = await axios.get('/api/auth/current')

            if (res.data) {
                dispatch({
                    type: 'SET_USER',
                    payload: res.data,
                })
                getUserCards()
                getUserDeck()
            } else {
                dispatch({ type: 'RESET_USER' })
            }
        } catch (error) {
            console.log(error, 'No User')
            dispatch({ type: 'RESET_USER' })
        }
    }

    const getUserCards = async () => {
        try {
            const res = await axios.get('/api/collection/')

            if (res.data) {
                dispatch({
                    type: 'SET_USER_CARDS',
                    payload: res.data.cards,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getUserDeck = async () => {
        try {
            const res = await axios.get('/api/deck/')

            if (res.data) {
                dispatch({
                    type: 'SET_USER_DECK',
                    payload: res.data.cards,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getAllCards = async () => {
        try {
            const res = await axios.get('/api/cards/')

            if (res.data) {
                dispatch({
                    type: 'SET_ALL_CARDS',
                    payload: res.data,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getAllItems = async () => {
        try {
            const res = await axios.get('/api/items/')

            if (res.data) {
                dispatch({
                    type: 'SET_ALL_ITEMS',
                    payload: res.data,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getAllOpponents = async () => {
        try {
            const res = await axios.get('/api/cpuOpponents/')

            if (res.data) {
                dispatch({
                    type: 'SET_ALL_OPPONENTS',
                    payload: res.data,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const logout = async () => {
        try {
            await axios.put('/api/auth/logout')
            dispatch({ type: 'RESET_USER' })
        } catch (error) {
            console.log(error)
            dispatch({ type: 'RESET_USER' })
        }
    }

    const value = useMemo(() => ({
        ...state,
        getGlobalState,
        getCurrentUser,
        getUserCards,
        getUserDeck,
        getAllCards,
        getAllItems,
        getAllOpponents,
        logout,
    }))

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)
