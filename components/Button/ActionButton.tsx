import styled, { css } from 'styled-components'
import { Button } from '../Button'

type state = 'error' | 'ok' | 'unconnected'

interface State {
  disabled: boolean
  msg: string
  action?(): void
  state: state
}

type ActionButtonProps = {
  isWalletConnected: boolean
  balanceValue: string
  inputValue: string
  maxWrappable: string
  onClick(): void
  connect(): void
  isWrap: boolean
}

export default function ActionButton({
  isWalletConnected,
  inputValue,
  balanceValue,
  maxWrappable,
  onClick,
  connect,
  isWrap,
}: ActionButtonProps): JSX.Element {
  const errorState = (msg: string): State => ({
    state: 'error',
    msg,
    disabled: false,
  })
  const actionState = (): State => {
    // if (!isWalletConnected) {
    //   return {
    //     state: 'unconnected',
    //     msg: 'Connect Wallet',
    //     action: connect,
    //     disabled: false,
    //   }
    // }
    if (parseFloat(maxWrappable) === 0) {
      return errorState('No sufficient Wrappable Token Amount')
    }

    if (parseFloat(balanceValue) === 0) {
        return errorState('No sufficient balance')
    }

    if (parseFloat(inputValue) > parseFloat(maxWrappable)) {
      return errorState('There is no sufficient Wrappable Token Amount')
    }

    if (parseFloat(inputValue) > parseFloat(balanceValue)) {
      return errorState('No sufficient balance')
    }

    if (parseFloat(inputValue) === 0) {
        return errorState(`Select Amount to ${isWrap ? 'Wrap' : 'Burn'}`)
    }

    return {
      state: 'ok',
      msg: isWrap ? 'Wrap' : 'Burn',
      action: onClick,
      disabled: false,
    }
  }
  const state = actionState()

  return (
    <IndexButton onClick={state.action} state={state.state}>
      <span>{state.msg}</span>
    </IndexButton>
  )
}

const IndexButton = styled(Button)<{ state: state }>`
  width: 464px;
  height: 40px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.9);
  text-transform: capitalize;

  ${({ state }) => {
    switch (state) {
        case 'error':
            return css`
            background: rgba(86, 86, 99, 0.6);
            color: #565663;
            cursor: not-allowed;
            &:hover { box-shadow: unset; }`
        case 'ok':
        case 'unconnected':
            return css`
            background: linear-gradient(90deg, #85ffc4, #5cc6ff);
            color: #000;`
    }
  }}
`
