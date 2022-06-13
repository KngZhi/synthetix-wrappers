import { FC, useRef, useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

const DefaultDropdownMenu = ({
  trigger,
  dropList,
  containerCls,
  offset = 0,
}) => {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const handleClose = () => setIsActive(false)
  const handleOpen = () => setIsActive(true)

  useEffect(() => {
    const pageClickEvent = (e) => {
      // If the active element exists and is clicked outside of
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        handleClose()
      }
    }

    // If the item is active (ie open) then listen for clicks
    if (isActive) {
      window.addEventListener('click', pageClickEvent)
    }

    return () => {
      window.removeEventListener('click', pageClickEvent)
    }
  }, [isActive, dropdownRef])

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownTrigger onClick={handleOpen}>{trigger}</DropdownTrigger>
      <DropdownList offset={offset} active={isActive} onClick={handleClose}>
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
