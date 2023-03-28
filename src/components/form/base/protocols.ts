import React from 'react'

export interface DefaultBaseFormComponentProtocol {
  children: React.ReactNode
  label?: string
  messageErrors?: string[]
}