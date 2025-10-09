import React from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { logoutThunk } from '../store/slices/authSlice'

export default function UserMenu(): JSX.Element {
  const user = useAppSelector((s) => s.auth.user)
  const dispatch = useAppDispatch()

  if (!user) return <div />

  return (
    <div className="user-menu">
      <span>{user.email}</span>
      <button onClick={() => void dispatch(logoutThunk())}>Logout</button>
    </div>
  )
}
