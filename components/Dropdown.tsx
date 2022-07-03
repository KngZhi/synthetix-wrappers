import React, { ReactElement } from 'react'
import { FC, useRef } from 'react'
import styled, { css } from 'styled-components'
import { useOnClickOutside, useBoolean } from 'usehooks-ts'

type DefaultDropdownMenuProps = {
  trigger: JSX.Element
  dropList: ReactElement
  className?: string
  triggerCls?: string
  dropdownCls?: string
  offset?: number
}

const DefaultDropdownMenu: FC<DefaultDropdownMenuProps> = ({
  trigger,
  dropList,
  className,
  triggerCls,
  dropdownCls,
  offset = 0,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { value: isActive, setTrue, setFalse } = useBoolean(false)

  useOnClickOutside(dropdownRef, setFalse)

  return (
    <DropdownContainer ref={dropdownRef} className={className}>
      <DropdownTrigger className={triggerCls} onClick={setTrue}>
        {trigger}
      </DropdownTrigger>
      <DropdownList
        className={dropdownCls}
        offset={offset}
        active={isActive}
        onClick={setFalse}
      >
        {dropList}
      </DropdownList>
    </DropdownContainer>
  )
}

export { DropdownContainer, DefaultDropdownMenu }

const DropdownContainer = styled.div`
  position: relative;
  display: grid;
`

const DropdownTrigger = styled.div``
const DropdownList = styled.div<{ active: boolean; offset: number }>`
  display: grid;
  position: absolute;
  visibility: hidden;
  opacity: 0;
  top: ${(props) => props.offset}px;
  ${(props) =>
    props.active &&
    css`
      visibility: visible;
      opacity: 1;
    `}
  background: linear-gradient(121.5deg, #101215 55.37%, #22272B 106.67%);

  border: 1px solid rgba(130, 130, 149, 0.3);

  box-shadow: 0px 14px 14px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`
