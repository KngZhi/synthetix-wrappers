import Link from 'next/link'
import { FC, useEffect, useMemo, useState, ChangeEvent } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled, { css } from 'styled-components'
import Image from 'next/image'
import { useBalance } from 'wagmi'

import { Tooltip } from '@nextui-org/react'

import { Button } from './Button'
import { DefaultDropdownMenu } from './Dropdown'
import NumericInput from '../components/NumericInput'
import TooltipContent from '../components/Tooltip'
import Capacity from '../components/Capacity'

import LinkArrow from '../public/images/utils/link-arrow.svg'
import Gear from '../public/images/utils/gear.svg'
import Arrows from '../public/images/utils/arrows.svg'
import DownArrowSmall from '../public/images/utils/down-arrow-small.svg'
import BlueInfo from '../public/images/utils/blue-info.svg'
import {
  isL1State,
  isWalletConnectedState,
  walletAddressState,
} from '../store/index'

import {
  L1_Wrap,
  L1_Unwrap,
  L2_WRAP,
  L2_Unwrap,
  Token,
  PairToken,
} from '../constants/token'

import { useTokenContract } from '../hooks/useContracts'

type WrapperProps = {
  onTVLClick: () => void
}

type Tokens = Token[]

function getTokenPairs(isWrap: boolean, isL1: boolean): [Tokens, Tokens] {
  let tokenPairs: PairToken[]
  if (isWrap) {
    tokenPairs = isL1 ? L1_Wrap : L2_WRAP
  } else {
    tokenPairs = isL1 ? L1_Unwrap : L2_Unwrap
  }

  const getTokens = (idx: number) => tokenPairs.map((pair) => pair[idx])

  return [getTokens(0), getTokens(1)]
}

const Wrapper: FC<WrapperProps> = ({ onTVLClick }) => {
  const [isWrap, setIsWrap] = useState<boolean>(true)
  const isL1 = useRecoilValue(isL1State)
  const isWalletConnected = useRecoilValue(isWalletConnectedState)
  const tokenPairs = getTokenPairs(isWrap, isL1)
  const [srcTokenIdx, setSrcTokenIdx] = useState<number>(0)

  const srcTokens = useMemo(() => {
    return tokenPairs[0]
  }, [tokenPairs])

  const targetTokens = useMemo(() => {
    return tokenPairs[1]
  }, [tokenPairs])

  const [srcToken, setSrcToken] = useState<Token>(srcTokens[srcTokenIdx])
  const [targetToken, setTargetToken] = useState<Token>(
    targetTokens[srcTokenIdx]
  )

  // const { data: signer } = useSigner()
  // const provider = useProvider()

  useEffect(() => {
    setSrcToken(srcTokens[srcTokenIdx])
    setTargetToken(targetTokens[srcTokenIdx])
  }, [srcTokenIdx, srcTokens, targetTokens])

  // const { data: srcTokenPrice } = useTokenPrice(srcToken)

  // const { mint, burn } = useTokenContract(srcToken, signer, provider)

  const [tokenValue, setTokenValue] = useState<string>('')
  const [walletAddress] = useRecoilState(walletAddressState)

  const changeToken = (idx: number) => {
    setSrcTokenIdx(idx)
    resetMax()
  }

  const resetMax = () => setTokenValue('')

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTokenValue(e.target.value)
  }

  const onWrapChange = (isWrap: boolean) => {
    setIsWrap(isWrap)
    setSrcTokenIdx(0)
    resetMax()
  }

  const { data: srcBalance } = useBalance({
    addressOrName: walletAddress,
    watch: true,
    token: srcToken.address,
  })

  const { data: targetBalance } = useBalance({
    addressOrName: walletAddress,
    token: targetToken.address,
  })

  const srcBalanceValue: string = srcBalance?.formatted || '0'
  const targetBalanceValue: string = targetBalance?.formatted || '0'
  const maxWrappable = 80

  /* Capacity */
  const capacityUtilised = '80,000'
  const maxCapacity = '200,000'
  const capacityPercentage: number =
    (parseInt(capacityUtilised, 10) / parseInt(maxCapacity, 10)) * 100

  const feeRate = 0

  const onMaxClick = () => {
    setTokenValue(srcBalanceValue)
  }

  const handleWrapClick = async () => {
    // const action = isWrap ? mint : burn
    // const res = action('10000', {
    //   gasPrice: web3.utils.toWei('2', 'Gwei'),
    //   gasLimit: 500e3,
    // })
    // console.log(res.hash)
  }

  const isActionAllowed = () => {
    if (isWalletConnected === false) return false
    if (parseFloat(tokenValue) <= 0) return false

    return true
  }

  return (
    <Container>
      <ContainerRow>
        <SelectorContainer>
          <SelectorButton active={isWrap} onClick={() => onWrapChange(true)}>
            <span>Wrap</span>
          </SelectorButton>
          <SelectorButton active={!isWrap} onClick={() => onWrapChange(false)}>
            <span>Unwrap</span>
          </SelectorButton>
        </SelectorContainer>
        <TVLButton className="align-right" onClick={onTVLClick}>
          <span>TVL</span>
          <Image src={LinkArrow} alt="link-arrow" priority={true} />
        </TVLButton>
      </ContainerRow>
      <WrapperContainerColumn>
        <WrapperContainerRow>
          <span>Wrapper</span>
          <GearButton size="sm">
            <Image src={Gear} alt="gear-icon" priority={true} />
          </GearButton>
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
            <span>Balance: {srcBalanceValue}</span>
            <MaxButton onClick={onMaxClick}>
              <span>MAX</span>
            </MaxButton>
          </BlackContainerRow>
          <BlackContainerRow>
            <DefaultDropdownMenu
              className="coin_drop"
              offset={40}
              trigger={
                <CurrencySelectorButton>
                  <StyledCurrencyContainer>
                    <Image
                      width={24}
                      height={24}
                      className="big"
                      src={srcToken.src}
                      alt={srcToken.name}
                      priority={true}
                    />
                    <span>{srcToken.name}</span>
                    <Image
                      src={DownArrowSmall}
                      alt="down-arrow"
                      priority={true}
                    />
                  </StyledCurrencyContainer>
                </CurrencySelectorButton>
              }
              dropList={
                <DropdownListContainer>
                  {srcTokens.map((token, idx) => (
                    <CurrencyContainer
                      onClick={() => changeToken(idx)}
                      key={token.key}
                      active={token.key === srcToken.key}
                    >
                      <Image
                        width={24}
                        height={24}
                        src={token.src}
                        alt={token.name}
                      ></Image>
                      <span>{token.name}</span>
                    </CurrencyContainer>
                  ))}
                </DropdownListContainer>
              }
            />
            <NumericInput
              value={tokenValue}
              onChange={onInputChange}
              placeholder="0.0"
            />
          </BlackContainerRow>
          <BlackContainerRow>
            <span>Max wrappable: {maxWrappable}Ξ</span>
          </BlackContainerRow>
        </BlackContainer>
        <ArrowButton
          onClick={() =>
            console.log('You clicked on the double arrows button!')
          }
        >
          <Image src={Arrows} alt="trade-arrows" priority={true} />
        </ArrowButton>
        <BlackContainer>
          <BlackContainerRow>
            {isWrap ? (
              <span className="big">Into</span>
            ) : (
              <span style={{ color: '#ED1EFF' }}>Receive</span>
            )}
            <span>Balance: {targetBalanceValue}</span>
          </BlackContainerRow>
          <BlackContainerRow>
            <StyledCurrencyContainer2>
              <Image
                width={16}
                height={16}
                src={targetToken.src}
                alt={targetToken.name}
                priority={true}
              />
              <span>{targetToken.name}</span>
            </StyledCurrencyContainer2>
            <NumericInput
              disabled={true}
              placeholder="0.0"
              value={targetBalanceValue}
            />
          </BlackContainerRow>
          <StyledBlackContainerRow>
            <span>Fee rate: {feeRate}%</span>
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
        <ActionButton disabled={!isActionAllowed()} onClick={handleWrapClick}>
          <span>{isActionAllowed() ? 'Wrap' : 'Select amount to wrap'}</span>
        </ActionButton>
      </WrapperContainerColumn>
      <Capacity
        capacityPercentage={capacityPercentage}
        maxCapacity={maxCapacity}
        capacityUtilised={capacityUtilised}
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
  //height: 44px;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  .align-right {
    //align-content: flex-end;
  }
`

const TVLButton = styled(Button)`
  width: 100%;
  width: 68px;
  height: 32px;
  margin-left: 84px;

  background: linear-gradient(121.5deg, #101215 55.37%, #22272b 106.67%);
  border: 1px solid #000000;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.9);
  border-radius: 40px;
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

const DropdownListContainer = styled.div`
  width: 140px;
  padding: 8px;
`

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

  /* Text */
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

  /* Text */
  span {
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
  }
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

const MaxButton = styled.button`
  padding-left: 10px;
  color: #00d1ff;

  &:hover {
    color: #828295;
  }
`

const GearButton = styled(Button)`
  padding: 0px;
`

const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 10px;

  background: #000000;
  border: 1px solid #000000;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.9);

  &:hover {
    border: 1px solid rgba(130, 130, 149, 0.3);
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      linear-gradient(311.52deg, #3d464c -36.37%, #131619 62.81%);
  }

  &:active {
    box-shadow: inset -1px -1px 1px rgba(255, 255, 255, 0.15);
  }
`

const ActionButton = styled(Button)<{ disabled: boolean }>`
  width: 464px;
  height: 40px;

  ${({ disabled }) =>
    disabled
      ? css`
          background: rgba(86, 86, 99, 0.6);
          color: #565663;
        `
      : css`
          background: linear-gradient(90deg, #85ffc4, #5cc6ff);
          color: #000;
        `}
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.9);
`

export default Wrapper
