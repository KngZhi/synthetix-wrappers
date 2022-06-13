import { FC, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import Image from 'next/image'

import { Button } from './button'
import { NetworkDropdown, DefaultDropdownMenu } from '../components/dropdown'

import LinkArrow from '../public/images/utils/link-arrow.svg'
import Gear from '../public/images/utils/gear.svg'
import Arrows from '../public/images/utils/arrows.svg'
import DownArrowSmall from '../public/images/utils/down-arrow-small.svg'
import BlueInfo from '../public/images/utils/blue-info.svg'
import EthereumLogo from '../public/images/logos/ethereum.svg'
import sLUSDLogo from '../public/images/synths/sLUSD.svg'
import sETHLogo from '../public/images/synths/sETH.svg'

type WrapprProps = {
  onTVLClick: () => void
}

const Wrappr: FC<WrapprProps> = ({ onTVLClick }) => {
  const [wrap, setWrap] = useState<boolean>(true)

  const COIN_LiST = [
    { name: 'LUSD', src: sLUSDLogo, key: 'lusd', isActive: true },
    { name: 'ETH', src: EthereumLogo, key: 'eth', isActive: false },
  ]

  /* Wrappr */
  let balance: string = '129,937'
  let maxWrappable: number = 80
  let wrapUSDValue: string = '2,895.25'

  /* Capacity */
  let capacityUtilised: string = '80,000'
  let maxCapacity: string = '200,000'
  let capacityPercentage: number =
    (parseInt(capacityUtilised, 10) / parseInt(maxCapacity, 10)) * 100

  let feeRate: number = 24

  return (
    <Container>
      <ContainerRow>
        <SelectorContainer>
          <SelectorButton active={wrap} onClick={() => setWrap(true)}>
            <span>Wrap</span>
          </SelectorButton>
          <SelectorButton active={!wrap} onClick={() => setWrap(false)}>
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
            {wrap ? (
              <span className="big">Wrapping</span>
            ) : (
              <span className="big" style={{ color: '#ED1EFF' }}>
                Burn
              </span>
            )}
            <span>Balance: {balance}</span>
            <MaxButton
              onClick={() => console.log('You clicked on the max button!')}
            >
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
                      className="big"
                      src={EthereumLogo}
                      alt="ethereum-logo"
                      priority={true}
                    />
                    <span>ETH</span>
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
                  {COIN_LiST.map((item) => (
                    <CurrencyContainer
                      onClick={() => console.log(item.key)}
                      key={item.key}
                      active={item.isActive}
                    >
                      <Image src={item.src} alt={item.name}></Image>
                      <span>{item.name}</span>
                    </CurrencyContainer>
                  ))}
                </DropdownListContainer>
              }
            />
            <NumericInput type="text" placeholder="0.0" />
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
            {wrap ? (
              <span className="big">Into</span>
            ) : (
              <span style={{ color: '#ED1EFF' }}>Receive</span>
            )}
            <span>Balance: {balance}</span>
          </BlackContainerRow>
          <BlackContainerRow>
            <StyledCurrencyContainer2>
              <Image
                className="big"
                src={sETHLogo}
                alt="sETH-logo"
                priority={true}
              />
              <span>sETH</span>
            </StyledCurrencyContainer2>
            <NumericInput type="text" placeholder="0.0" />
          </BlackContainerRow>
          <StyledBlackContainerRow>
            <span>Fee rate: {feeRate}%</span>
            <Image
              className="tooltip"
              src={BlueInfo}
              alt="info-icon"
              priority={true}
            />
            <span className="big align-right">
              {wrapUSDValue === '' ? '' : `$${wrapUSDValue}`}
            </span>
          </StyledBlackContainerRow>
        </BlackContainer>
        <ActionButton
          onClick={() => console.log('You clicked on the action button!')}
        >
          <span>Select amount to wrap</span>
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

  .tooltip:hover {
    // TODO
  }
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
  width: 120px;
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

const NumericInput = styled.input`
    /* Remove default styling */
    width: 50%;
    height: 100%;

    / * Remove default styling */
    padding: 0;
	background: none;
	border: none;
	border-radius: 0;
	outline: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;

    /* Text */
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 26px;
    color: #FFFFFF;
    text-align: right;
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

const ActionButton = styled(Button)`
  width: 464px;
  height: 40px;

  background: rgba(86, 86, 99, 0.6);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.9);

  span {
    color: #565663;
  }
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
