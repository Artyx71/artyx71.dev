import { useContext } from 'react'
import { InputContext } from './InputProvider'
import type { InputContextValue } from './InputProvider'

export function useInput(): InputContextValue {
  const ctx = useContext(InputContext)
  if (!ctx) throw new Error('useInput must be used inside InputProvider')
  return ctx
}
