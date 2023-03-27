import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: 100%;
`

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`

const ERROR_LIST = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const ERROR_MESSAGE = styled.li`
  font-size: 12px;
  color: #e55252;
`

export const Error = {
  List: ERROR_LIST,
  Message: ERROR_MESSAGE
}

export const SHARED_INPUT_STYLE = (css`
  width: 100%;
  height: 32px;
  padding-inline: 8px;
`)