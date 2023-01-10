import { ReactNode } from 'react'
import classNames from 'classnames'
import Container from 'react-bootstrap/Container'
import { Footer } from 'components/atoms/Footer'
import NavBar from 'src/widgets/NavBar'

export enum PAGE_VARIANT {
  BG_LIGHT = 'bg-light',
}

interface PageProps {
  children?: ReactNode
  variant?: PAGE_VARIANT
}

export const Page = ({
  children,
  variant = PAGE_VARIANT.BG_LIGHT,
}: PageProps) => {
  return (
    <>
      <NavBar />
      <main
        className={classNames('tw-pt-6.25 p-0', {
          'tw-bg-light': variant === PAGE_VARIANT.BG_LIGHT,
        })}
      >
        <Container fluid className='p-0'>
          {children}
        </Container>
      </main>
      <Footer />
    </>
  )
}
