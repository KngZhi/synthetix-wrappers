import styled, { css } from 'styled-components'

type ButtonProps = {
  size?: 'xs' | 'sm'
}

const BaseButton = styled.button`
  border: 1px solid rgba(130, 130, 149, 0.3);
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const NetWorkButton = styled(BaseButton)`
  background: linear-gradient(121.5deg, #101215 55.37%, #22272b 106.67%);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.9);

  padding: 10px 21px;

  width: 160px;
  height: 44px;

  span {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }
`

const NetWorkSelectorButton = styled(BaseButton)<{ active?: boolean }>`
  border: 0;
  width: 100%;
  height: 40px;
  padding: 8px;
  justify-content: flex-start;
  position: relative;
  ${({ active }) =>
    active &&
    css`
      background: rgba(130, 130, 149, 0.3);
      &::after {
        justify-self: end;
        display: block;
        content: ' ';
        background: #31d8a4;
        height: 8px;
        width: 8px;
        border: 2px solid #31d8a4;
        border-radius: 50%;
        box-shadow: 0px 0px 15px rgba(68, 239, 193, 0.6);
        position: absolute;
        right: 11%;
      }
    `}
`

const Button = styled.button<ButtonProps>`
  padding: 10px, 16px;
  height: 44px;
  width: 160px;

  /* Extra-small size */
  ${(props) =>
    props.size === 'xs' &&
    css`
      padding: 10px;
      width: 34px;
      height: 34px;
    `}

  /* Small size */
    ${(props) =>
    props.size === 'sm' &&
    css`
      padding: 10px;
      width: 44px;
    `}

  background:
    linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    linear-gradient(311.52deg, #3D464C -36.37%, #131619 62.81%);

  border: 1px solid #8282954d;
  border-radius: 4px;

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.9);

  span {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }

  &:hover {
    box-shadow: inset -2px -2px 1px rgba(255, 255, 255, 0.15);
  }
`

const WalletButton = styled.div`
  border: 1px solid transparent;
  background: linear-gradient(#000000 0 0) padding-box,
    linear-gradient(73.6deg, #85ffc4 2.11%, #5cc6ff 90.45%) border-box;
  border-radius: 2px;
  span {
    background-color: white;
    background-image: linear-gradient(73.6deg, #85ffc4 2.11%, #5cc6ff 90.45%);
    background-size: 100%;
    background-repeat: repeat;

    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    color: transparent;
  }
`

const WalletSelectorButton = styled(WalletButton)`
  height: 48px;
  padding-left: 21px;
  display: grid;
  grid-template-columns: 24px auto;
  justify-content: flex-start;
  align-items: center;

  span {
    margin-left: 10px;
    font-weight: 700;
    font-size: 14px;
    font-style: normal;
  }

  margin-bottom: 8px;
`

const AddrButton = styled(NetWorkButton)`
  font-size: 12px;
  gap: 10px;
  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: rgb(41, 182, 175);
  }
`

const MoreButton = styled(WalletButton)`
  padding: 6.5px 10px;
  span {
    font-size: 12px;
    font-weight: 700;
  }
`

const XButton = styled(BaseButton)`
  display: flex;
  /* Brand/Gradient001 */

  background: linear-gradient(121.5deg, #101215 55.37%, #22272b 106.67%);
  /* Brand/BlackV2 */

  border: 1px solid #000000;
  /* Button New */

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.9);
  border-radius: 40px;
`

export {
  Button,
  NetWorkButton,
  NetWorkSelectorButton,
  WalletSelectorButton,
  MoreButton,
  AddrButton,
  XButton,
}
