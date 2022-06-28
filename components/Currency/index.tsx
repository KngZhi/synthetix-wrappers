import styled, { css } from 'styled-components'

import { Button } from '../Button'

const CurrencyContainer = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 8px;

  padding: 0px 10px;
  width: 100%;
  height: 40px;

  ${(props) =>
    props.active &&
    css`
      background: rgba(130, 130, 149, 0.3);
      border-radius: 4px;
    `}

  span {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #ffffff;
  }
`

const StyledCurrencyContainer = styled(CurrencyContainer)`
  justify-content: space-between;

  span {
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
  }
`

const CurrencySelectorButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0;
  max-width: 130px;
  height: 37px;

  border: 1px solid rgba(130, 130, 149, 0.3);
  border-radius: 8px;

  background: none;
`

const StyledCurrencyContainer2 = styled(CurrencyContainer)`
  padding: 0;

  /* Text */
  span {
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
  }
`

export {
  CurrencyContainer,
  StyledCurrencyContainer,
  StyledCurrencyContainer2,
  CurrencySelectorButton,
}
