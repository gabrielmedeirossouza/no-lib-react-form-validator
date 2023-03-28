import React from 'react'

export interface DefaultFormComponentProtocol {
  children: React.ReactNode
  label?: string
  messageErrors?: string[]
}