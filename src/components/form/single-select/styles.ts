import styled from 'styled-components'
import { SHARED_INPUT_STYLE } from '../base/styles'

export const Input = styled.span`
  ${SHARED_INPUT_STYLE}
  display: flex; 
  align-items: center;
  width: 100%;
  height: 32px;
  border-bottom: 1px solid rgb(133, 133, 133);
  cursor: pointer;

  &:hover {
    border-color: rgba(255, 255, 255, 0.87);
  }
`
