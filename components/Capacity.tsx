import styled, { css } from 'styled-components'

type CapacityProps = {
  capacityPercentage: number
  capacityUtilised: string
  maxCapacity: string
}

export default function Capacity({
  capacityPercentage,
  capacityUtilised,
  maxCapacity,
}: CapacityProps) {
  return (
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
  )
}

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
