import styled from 'styled-components'
import Image from 'next/image'
import Arrows from '../public/images/utils/arrows.svg'
const Button = styled.button`
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
export default function ArrowButton() {
  return (
    <Button>
      <Image src={Arrows} alt="trade-arrows" priority={true} />
    </Button>
  )
}
