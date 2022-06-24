import { BigNumber } from '@ethersproject/bignumber'
import { ethers, utils } from 'ethers'
import web3 from 'web3'
import { FC, useEffect, useMemo, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled, { css } from 'styled-components'
import Image from 'next/image'
import {
  useAccount,
  useBalance,
  useSigner,
  useProvider,
  useContractWrite,
  useContractRead,
} from 'wagmi'

import { Tooltip } from '@nextui-org/react'

import { Button } from './button'
import { DefaultDropdownMenu } from '../components/dropdown'
import NumericInput from '../components/NumericInput'

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
  EthWrapperL1Contract,
  EthWrapperL1KovanContract,
} from '../constants/contracts'

type WrapprProps = {
  onTVLClick: () => void
}

import {
  L1_Wrap,
  L1_Unwrap,
  L2_WRAP,
  L2_Unwrap,
  Token,
  PairToken,
} from '../constants/token'

import { useTokenContract, useEthPrice } from '../hooks/useContracts'

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

const TooltipContent = () => {
  return (
    <TooltipStyled>
      <p>The fee rate is decided by the Grants Council</p>
      <a>Learn More</a>
    </TooltipStyled>
  )
}

const Wrappr: FC<WrapprProps> = ({ onTVLClick }) => {
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

  const { data: signer } = useSigner()
  const provider = useProvider()

  useEffect(() => {
    setSrcToken(srcTokens[srcTokenIdx])
    setTargetToken(targetTokens[srcTokenIdx])
  }, [srcTokenIdx, srcTokens, targetTokens])

  const { burnFeeRate, mintFeeRate, capacity, maxTokenAmount, mint, burn } =
    useTokenContract(srcToken, signer, provider)

  const [tokenValue, setTokenValue] = useState<string>('')
  const [walletAddress] = useRecoilState(walletAddressState)
  const { data: account } = useAccount()

  const changeToken = (idx: number) => {
    setSrcTokenIdx(idx)
    resetMax()
  }

  const resetMax = () => setTokenValue('')

  const onInputChange = (e) => {
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

  /* Wrappr */
  let srcBalanceValue: string = srcBalance?.formatted || '0'
  let targetBalanceValue: string = targetBalance?.formatted || '0'
  let maxWrappable: number = 80
  let wrapUSDValue: string = '2,895.25'

  /* Capacity */
  let capacityUtilised: string = '80,000'
  let maxCapacity: string = '200,000'
  let capacityPercentage: number =
    (parseInt(capacityUtilised, 10) / parseInt(maxCapacity, 10)) * 100

  let feeRate: number = 0

  const onMaxClick = () => {
    setTokenValue(srcBalanceValue)
  }

  const handleWrapClick: Promise<void> = async () => {
    const action = isWrap ? mint : burn
    const res = action('10000', {
      gasPrice: web3.utils.toWei('2', 'Gwei'),
      gasLimit: 500e3,
    })
    console.log(res.hash)
  }

  const isActionAllowed: boolean = () => {
    if (isWalletConnected === false) return false
    if (tokenValue <= 0) return false

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
      <WrapprContainerColumn>
        <WrapprContainerRow>
          <span>Wrappr</span>
          <GearButton
            size="sm"
            onClick={() => console.log('You clicked on the gear button!')}
          >
            <Image src={Gear} alt="gear-icon" priority={true} />
          </GearButton>
        </WrapprContainerRow>
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
            <NumericInput value={tokenValue} onChange={onInputChange} />
          </BlackContainerRow>
          <BlackContainerRow>
            <span>Max wrappable: {maxWrappable}Ξ</span>
            <span>{wrapUSDValue === '' ? '' : `$${wrapUSDValue}`}</span>
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
                className="big"
                width={16}
                height={16}
                src={targetToken.src}
                alt={targetToken.name}
                priority={true}
              />
              <span>{targetToken.name}</span>
            </StyledCurrencyContainer2>
            <NumericInput disabled type="text" placeholder="0.0" />
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
            <span className="big align-right">
              {wrapUSDValue === '' ? '' : `$${wrapUSDValue}`}
            </span>
          </StyledBlackContainerRow>
        </BlackContainer>
        <ActionButton disabled={!isActionAllowed()} onClick={handleWrapClick}>
          <span>{isActionAllowed() ? 'Wrap' : 'Select amount to wrap'}</span>
        </ActionButton>
      </WrapprContainerColumn>
      <CapacityContainer>
        <TitleContainer>
          <span>Capacity</span>
        </TitleContainer>
        <GaugeContainer>
          <GaugeProgress percentage={capacityPercentage} />
        </GaugeContainer>
        <CapacityDescriptionContainer>
          <ColumnContainer>
            <span className="bold">Utilised</span>
            <span>{capacityUtilised}</span>
          </ColumnContainer>
          <ColumnContainer>
            <span className="bold">Max Capacity</span>
            <span>{maxCapacity}</span>
          </ColumnContainer>
        </CapacityDescriptionContainer>
      </CapacityContainer>
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

const WrapprContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 25px;
  gap: 15px;

  /* Basic style */
  height: 438px;
  width: 518px;
  margin-top: 25px;

  /* Background */
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    linear-gradient(311.52deg, #3d464c -36.37%, #131619 62.81%);

  /* Border */
  border: 2px solid #000000;
  border-radius: 20px;

  /* Shadow */
  box-shadow: 0px 14px 14px rgba(0, 0, 0, 0.25);
`

const WrapprContainerRow = styled.div`
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

  span {
    /* Text */
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    color: #828295;
  }
`

const BlackContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 26px;

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

const BlueInfoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.9);

  &:hover {
  }

  &:active {
    box-shadow: inset -1px -1px 1px rgba(255, 255, 255, 0.15);
  }
`

const CurrencySelectorButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0;
  max-width: 130px;
  height: 37px;

  /* Border */
  border: 1px solid rgba(130, 130, 149, 0.3);
  border-radius: 8px;

  /* Remove background color */
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

const CurrencySelectorContainer = styled.div`
  /* Hide the dropdown menu by default */
  display: none;
  flex-direction: column;
  gap: 10px;
  padding: 0px;

  /* Basic style */
  height: 80px;
  width: 120px;

  /* Background */
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    linear-gradient(311.52deg, #3d464c -36.37%, #131619 62.81%);

  /* Border */
  border: 1px solid #8282954d;
  border-radius: 4px;

  /* Shadow */
  box-shadow: 0px 14px 14px rgba(0, 0, 0, 0.25);
`

const CurrencySelectoDropdown = styled.div<{ isDrop: boolean }>`
  flex-direction: column;
  gap: 8px;

  > ${CurrencySelectorContainer} {
    position: absolute;
    margin-top: 4px;
    flex-direction: column;
    align-items: flex-start;
    padding: 4px;
  }
`

const MaxButton = styled.button`
  display: flex;

  /* Remove button styling */
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  padding-left: 10px;

  span {
    color: #00d1ff;
  }

  &:hover {
    span {
      color: #828295;
    }
  }

  &:active {
    span {
      color: #00d1ff;
    }
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

const CapacityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  /* Basic style */
  height: 150px;
  width: 518px;
  margin-top: 24px;
  padding: 15px;

  /* Background */
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    linear-gradient(311.52deg, #3d464c -36.37%, #131619 62.81%);

  /* Border */
  border: 2px solid #000000;
  border-radius: 20px;

  /* Shadow */
  box-shadow: 18px 18px 36px rgba(0, 0, 0, 0.25);
`

const TitleContainer = styled.div`
  width: 100%;
  text-align: center;

  /* Text */
  span {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 26px;
    color: #ffffff;
  }
`

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
  }

  .align-right {
    text-align: right;
  }

  .bold {
    font-weight: 700;
  }
`

const CapacityDescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 10px;

  & ${ColumnContainer}:nth-child(2) {
    text-align: right;
  }
`

const GaugeContainer = styled.div`
  width: 100%;
  height: 26px;

  /* Border */
  border: 1px solid transparent;
  background: linear-gradient(#000000 0 0) padding-box,
    linear-gradient(73.6deg, #85ffc4 2.11%, #5cc6ff 90.45%) border-box;
  border-radius: 80px;
`

const TooltipStyled = styled.div`
  margin-top: 12px;
  height: 88px;
  display: flex;
  justify-center: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  a {
    color: #00d1ff;
  }
`

const GaugeProgress = styled.div<{ percentage: number }>`
  width: 0%;
  height: 12px;
  margin: 6px 6px;

  background: linear-gradient(73.6deg, #85ffc4 2.11%, #5cc6ff 90.45%)
      padding-box,
    linear-gradient(#000000 0 0) border-box;
  border-radius: 50px 0px 0px 50px;

  /* Percentage */
  &:after {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    color: #ffffff;
  }

  ${(props) =>
    props.percentage >= 0 &&
    props.percentage < 100 &&
    css`
      width: ${(props.percentage * 97) / 100}%;

      &:after {
        content: '${props.percentage}%';
        width: calc(100% + ${props.percentage.toString().length} * 1ch + 2ch);
      }
    `}

  ${(props) =>
    props.percentage >= 100 &&
    css`
      width: 97%;
      border-radius: 50px 50px 50px 50px;

      &:after {
        content: '100%';
        width: calc(100% + 6ch);
      }
    `}
`

export default Wrappr
