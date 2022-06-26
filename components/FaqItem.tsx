import { FC, useState, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import Image from 'next/image'
import { ChevronDown } from 'react-feather'

type FaqItemProps = {
  category: string | ReactNode
  image: any
  content: string | ReactNode
  title: string | ReactNode
}

const FaqItem: FC<FaqItemProps> = ({ category, image, content, title }) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  return (
    <BaseDiv active={isActive}>
      <TitlePanel onClick={() => setIsActive(!isActive)}>
        <Image alt="rocket" src={image} />
        <div className="title">
          <h2>{category}</h2>
          <h1>{title}</h1>
        </div>
        <div className="outer-circle">
          <div className="inner-circle">
            <ChevronDown
              className="down-arrow"
              color="#00D1FF"
              width={16}
              height={16}
            />
          </div>
        </div>
      </TitlePanel>
      <ContentPanel className="content-panel" active={isActive}>
        {content}
      </ContentPanel>
    </BaseDiv>
  )
}

const BaseDiv = styled.div<{ active: boolean }>`
  background: linear-gradient(121.5deg, #101215 55.37%, #22272b 106.67%);
  border: 1px solid #000000;
  box-shadow: 0px 14px 14px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  .title {
    flex: auto;
    margin-left: 7px;
    h2 {
      font-weight: 400;
      font-size: 12px;
      line-height: 12px;
      color: #828295;
    }
    h1 {
      font-size: 14px;
      font-weight: 700;
      line-height: 21px;
    }
  }

  .outer-circle {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: linear-gradient(318.21deg, #2c3036 14.05%, #06090f 85.29%);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    .inner-circle {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid #000;
      display: flex;
      justify-content: center;
      align-items: center;
      .down-arrow {
        ${({ active }) =>
          active
            ? css`
                transform: rotate(180deg);
                transition: transform 0.5s linear;
              `
            : css`
                transform: rotate(0deg);
                transition: transform 0.5s linear;
              `}
      }
    }
  }
`

const TitlePanel = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 14px 15px 24px;
  height: 67px;
`
const ContentPanel = styled.div<{ active: boolean }>`
  padding: 0 24px 20px;
  font-weight: 300;
  font-size: 12px;
  line-height: 150%;
  ${({ active }) => !active && 'display: none;'}
`

export default FaqItem
