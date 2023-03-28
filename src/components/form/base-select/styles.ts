import styled, { css } from 'styled-components'

const INPUT_CONTAINER = styled.div`
  position: relative;
  width: 100%;
`

interface InputDropdownListProps {
  isOpen: boolean
}

const INPUT_DROPDOWN_LIST = styled.ul<InputDropdownListProps>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: ${({ isOpen }) => isOpen ? "400px" : "0"};
  background-color: #787878;
  border-end-end-radius: 8px;
  border-end-start-radius: 8px;
  overflow: hidden;
  scroll-behavior: smooth;
  overflow-y: auto;
  z-index: 99;
`

interface InputDropdownItemProps {
  separator?: boolean
}

const INPUT_DROPDOWN_ITEM = styled.li<InputDropdownItemProps>`
  padding: 8px 12px;
  cursor: pointer;

  ${({ separator }) => separator && css`
    border-bottom: 1px solid #dbdbdb;
  `}

  &:hover {
    background-color: #8a8a8a;
  }
`

export const Input = {
  Container: INPUT_CONTAINER,
  DropdownList: INPUT_DROPDOWN_LIST,
  DropdownItem: INPUT_DROPDOWN_ITEM
}