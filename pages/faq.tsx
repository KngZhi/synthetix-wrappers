import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import Image from 'next/image'
import SynthetixLogo from '../public/images/logos/synthetix.svg'
import LinkArrow from '../public/images/utils/link-arrow.svg'
import { XButton } from '../components/Button'
import FaqItem from '../components/FaqItem'
import RocketImage from '../public/images/utils/rocket.png'
import ImageImage from '../public/images/utils/Image.png'

import FAQcontents from '../public/faq.json'

const Faq = () => {
  return (
    <>
      <Head>
        <title>Wrapper Help Center</title>
        <meta
          name="description"
          content="Simple user interface that allows to interact with the various Synthetix Wrappr contracts"
        />
        <link rel="icon" href="/images/logos/synthetix.svg" />
      </Head>

      <DefaultLayout>
        <Header>
          <div className="left-side">
            <Image src={SynthetixLogo} alt="synthetix-logo" priority={true} />
            <p>SYNTHETIX</p>
            <h1>Wrapper Help Center</h1>
          </div>
          <Link href="/">
            <GotoButton>
              <span>GO TO WRAPPER</span>
              <Image src={LinkArrow} alt="link-arrow" />
            </GotoButton>
          </Link>
        </Header>
        <FaqItems>
          {FAQcontents.map((item) => (
            <FaqItem
              image={RocketImage}
              category="GETTING STARTED"
              title={item.title}
              content={item.content}
            />
          ))}
        </FaqItems>
      </DefaultLayout>
    </>
  )
}

const DefaultLayout = styled.div`
  padding: 84px 25.3% 0px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 54px;
  .left-side {
    p {
      margin-top: 22px;
      font-size: 12px;
      line-height: 13px;
    }
    h1 {
      font-size: 32px;
      line-height: 35px;
      text-shadow: 0px 4px 14px rgba(0, 0, 0, 0.55);
    }
  }
`

const GotoButton = styled(XButton)`
  padding: 9px 12px;
  width: 150px;
  height: 36px;
  font-size: 12px;
  line-height: 13px;
  font-weight: 700;
  align-items: center;
  justify-content: space-between;
`

const FaqItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export default Faq
