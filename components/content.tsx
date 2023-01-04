import { useEffect, useState, ChangeEventHandler } from 'react'
import { useRecoilValue } from 'recoil'
import styled, { css } from 'styled-components'
import Image from 'next/image'
import { parseEther } from 'ethers/lib/utils'
import { useBoolean } from 'usehooks-ts'

import { Tooltip } from '@nextui-org/react'

import { Button } from './Button'
import ActionButton from './Button/ActionButton'
import ArrowButton from './ArrowButton'

import { DefaultDropdownMenu } from './Dropdown'
import NumericInput from '../components/NumericInput'
import TooltipContent from '../components/Tooltip'
import Capacity from '../components/Capacity'
import { TokenSelector, Token } from './Token'

import DownArrowSmall from '../public/images/utils/down-arrow-small.svg'
import BlueInfo from '../public/images/utils/blue-info.svg'
import { isL1State } from '../store/index'

import {
  WrapList,
  UnwrapList,
  TokenInterface,
} from '../constants/token'

import { useTokenContract } from '../hooks/useContracts'
import useBalance from 'hooks/useBalance'
import { useConnectorContext } from 'connector/Connector'
import { formatCurrency as currency } from 'utils/string'

type WrapperProps = {
  onTVLClick: () => void
}

function getTokenPairs(isWrap: boolean) {
  const tokenPairs = isWrap ? WrapList : UnwrapList
  const getTokens = (idx: number) => tokenPairs.map((pair) => pair[idx])

  return [getTokens(0), getTokens(1)]
}

const Wrapper = ({ onTVLClick }: WrapperProps): JSX.Element => {
  const { value: isWrap, setValue: setIsWrap } = useBoolean(true)
  const [srcTokenIdx, setSrcTokenIdx] = useState<number>(0)
  const [targetTokenIdx, setTargetTokenIdx] = useState<number>(0)
  const [feeRate, setFeeRate] = useState<string>('0')
  const [maxWrappable, setMaxWrappable] = useState<string>('0')
  const [maxCapacity, setMaxCapacity] = useState<string>('0')
  const [capacityUtilised, setCapacityUtilised] = useState<string>('0')
  const [srcTokenValue, setSrcTokenValue] = useState<string>('')
  const [targetTokenValue, setTargetTokenValue] = useState<string>('')

  const { walletAddress, connectWallet } = useConnectorContext()
  const isL1 = useRecoilValue(isL1State)

  const tokenPairs = getTokenPairs(isWrap)

  const srcTokens = tokenPairs[0] as TokenInterface[]
  const targetTokens = tokenPairs[1][srcTokenIdx] as TokenInterface[]

  const [srcToken, setSrcToken] = useState<TokenInterface>(
    srcTokens[srcTokenIdx]
  )
  const [targetToken, setTargetToken] = useState<TokenInterface>(
    targetTokens[targetTokenIdx]
  )

  useEffect(() => {
    setSrcToken(srcTokens[srcTokenIdx])
    setTargetToken(targetTokens[targetTokenIdx])
  }, [srcTokenIdx, srcTokens, targetTokens, targetTokenIdx])

  const contract = useTokenContract(isWrap ? srcToken : targetToken)

  useEffect(() => {
    setFeeRate(isWrap ? contract.mintFeeRate : contract.burnFeeRate)
    setMaxWrappable(isWrap ? contract.capacity : contract.capacityUtilised)
    setMaxCapacity(contract.maxTokenAmount)
    setCapacityUtilised(contract.capacityUtilised)
  }, [contract, isWrap, isL1])
  const srcBalanceValue = useBalance(srcToken)
  const targetBalanceValue = useBalance(targetToken)

  /* Capacity */
  const capacityPercentage: number =
    (parseInt(capacityUtilised, 10) / parseInt(maxCapacity, 10)) * 100

  const resetSrcTokenValue = () => setSrcTokenValue('')

  const onMaxClick = () => {
    setSrcTokenValue(srcBalanceValue)
  }

  const onActionClick = async () => {
    const action = isWrap ? contract.mint : contract.burn
    action(parseEther(srcTokenValue))
  }

  const onSrcTokenChange = (idx: number) => {
    setSrcTokenIdx(idx)
    resetSrcTokenValue()
  }

  const onTargetTokenChange = (idx: number) => {
    setTargetTokenIdx(idx)
    setTargetTokenValue('')
  }

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSrcTokenValue(e.target.value)
  }

  useEffect(() => {
    const calcTargetTokenValue = (inputTokenValue: string): string => {
      const srcToken = parseFloat(inputTokenValue)
      if (!srcToken || srcToken === 0) return ''
      const valueRemain = 1 - parseFloat(feeRate)
      // remove tailing zero
      return String(+(srcToken * valueRemain).toFixed(6))
    }

    setTargetTokenValue(calcTargetTokenValue(srcTokenValue))
  }, [srcTokenValue, feeRate])

  const onWrapClick = (val: boolean) => {
    setSrcTokenIdx(0)
    setTargetTokenIdx(0)
    resetSrcTokenValue()
    setIsWrap(val)
  }

  return (
    <Container>
      <ContainerRow>
        <SelectorContainer>
          <SelectorButton active={isWrap} onClick={() => onWrapClick(true)}>
            <span>Wrap</span>
          </SelectorButton>
          <SelectorButton active={!isWrap} onClick={() => onWrapClick(false)}>
            <span>Unwrap</span>
          </SelectorButton>
        </SelectorContainer>
      </ContainerRow>
      <WrapperContainerColumn>
        <WrapperContainerRow>
          <span>Wrapper</span>
        </WrapperContainerRow>
        <BlackContainer>
          <BlackContainerRow>
            {isWrap ? (
              <span className="big">Wrapping</span>
            ) : (
              <span className="big" style={{ color: '#ED1EFF' }}>
                Burn
              </span>
            )}
            <span>
              Balance: {currency(srcBalanceValue, srcToken.precision)}
            </span>
            <MaxButton onClick={onMaxClick}>
              <span>MAX</span>
            </MaxButton>
          </BlackContainerRow>
          <BlackContainerRow>
            {srcTokens.length === 1 ? (
              <Token token={srcToken} />
            ) : (
              <DefaultDropdownMenu
                className="coin_drop"
                offset={40}
                trigger={
                  <TokenSelector>
                    <Token
                      token={srcToken}
                      children={
                        <Image
                          src={DownArrowSmall}
                          alt="down-arrow"
                          priority={true}
                        />
                      }
                    />
                  </TokenSelector>
                }
                dropList={
                  <DropdownListContainer>
                    {srcTokens.map((token, idx) => (
                      <Token
                        onClick={() => onSrcTokenChange(idx)}
                        key={token.key}
                        active={token.key === srcToken.key}
                        token={token}
                        fontSize={14}
                      />
                    ))}
                  </DropdownListContainer>
                }
              />
            )}
            <NumericInput
              value={srcTokenValue}
              onChange={onInputChange}
              placeholder="0.0"
            />
          </BlackContainerRow>
          <BlackContainerRow>
            <span>
              {isWrap ? 'Max Wrappable: ' : 'Max Burnable: '}
              {currency(maxWrappable, srcToken.precision)}Ξ
            </span>
          </BlackContainerRow>
        </BlackContainer>
        <ArrowButton />
        <BlackContainer>
          <BlackContainerRow>
            {isWrap ? (
              <span className="big">Into</span>
            ) : (
              <span style={{ color: '#ED1EFF' }}>Receive</span>
            )}
            <span>
              Balance: {currency(targetBalanceValue, targetToken.precision)}
            </span>
          </BlackContainerRow>
          <BlackContainerRow>
            {Array.isArray(targetTokens) && targetTokens.length === 1 ? (
              <Token token={targetToken} />
            ) : (
              <DefaultDropdownMenu
                className="coin_drop"
                offset={40}
                trigger={
                  <TokenSelector>
                    <Token
                      token={targetToken}
                      children={
                        <Image
                          src={DownArrowSmall}
                          alt="down-arrow"
                          priority={true}
                        />
                      }
                    />
                  </TokenSelector>
                }
                dropList={
                  <DropdownListContainer>
                    {targetTokens.map((token, idx) => (
                      <Token
                        onClick={() => onTargetTokenChange(idx)}
                        key={token.key}
                        active={token.key === targetToken.key}
                        token={token}
                        fontSize={14}
                      />
                    ))}
                  </DropdownListContainer>
                }
              />
            )}
            <NumericInput
              disabled={true}
              placeholder="0.0"
              value={targetTokenValue}
            />
          </BlackContainerRow>
          <StyledBlackContainerRow>
            <span>Fee rate: {parseFloat(feeRate) * 100}%</span>
            <Tooltip
              color="invert"
              content={<TooltipContent />}
              css={{
                color: '#fff',
                background: 'rgba(86, 86, 99, 0.9)',
                width: '225px',
                textAlign: 'center',
              }}
            >
              <Image src={BlueInfo} alt="info-icon" priority={true} />
            </Tooltip>
          </StyledBlackContainerRow>
        </BlackContainer>
        <ActionButton
          isWalletConnected={!!walletAddress}
          balanceValue={srcBalanceValue}
          inputValue={srcTokenValue || '0'}
          maxWrappable={maxWrappable}
          onClick={onActionClick}
          isWrap={isWrap}
          connect={connectWallet}
        />
      </WrapperContainerColumn>
      <Capacity
        capacityPercentage={capacityPercentage}
        maxCapacity={currency(maxCapacity, srcToken.precision)}
        capacityUtilised={currency(capacityUtilised, srcToken.precision)}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 108.5px;
`

const ContainerRow = styled.div`
  width: 518px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 2px;

  /* Basic style */
  height: 44px;
  width: 200px;

  /* Background */
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    linear-gradient(311.52deg, #3d464c -36.37%, #131619 62.81%);

  /* Border */
  border: 1px solid rgba(130, 130, 149, 0.3);
  border-radius: 35px;
`

const SelectorButton = styled(Button)<{ active?: boolean }>`
  width: 95px;
  height: 36px;
  border-radius: 34px;

  span {
    font-weight: 700;
    font-size: 18px;
  }

  ${(props) =>
    props.active &&
    css`
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
        linear-gradient(73.6deg, #85ffc4 2.11%, #5cc6ff 90.45%);

      span {
        color: #00d1ff;
      }
    `}

  ${(props) =>
    !props.active &&
    css`
      background: none;
      border: none;
      box-shadow: none;
    `}
`

const WrapperContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 25px;
  gap: 15px;

  /* Basic style */
  height: 438px;
  width: 518px;
  margin-top: 25px;

  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    linear-gradient(311.52deg, #3d464c -36.37%, #131619 62.81%);

  border: 2px solid #000000;
  border-radius: 20px;

  /* Shadow */
  box-shadow: 0px 14px 14px rgba(0, 0, 0, 0.25);
`

const WrapperContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 35px;
`

const BlackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 20px;
  gap: 4px;

  width: 464px;
  height: 102px;

  background: #000000;
  border-radius: 4px;

  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #828295;
`

const BlackContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .big {
    flex: 2;
  }

  .align-right {
    text-align: right;
  }
`

const StyledBlackContainerRow = styled(BlackContainerRow)`
  justify-content: flex-start;
  gap: 4px;
`

const DropdownListContainer = styled.div`
  width: 140px;
  padding: 8px;
`

const MaxButton = styled.button`
  padding-left: 10px;
  color: #00d1ff;

  &:hover {
    color: #828295;
  }
`

export default Wrapper
