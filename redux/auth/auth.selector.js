import { createSelector } from 'reselect'

const authState = state => state.auth

export const pullToken = createSelector(
    [authState],
    auth => auth.token
)