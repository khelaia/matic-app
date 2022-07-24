import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled/macro'

import mq, { useMediaMin, useMediaMax } from 'mediaQuery'

import DefaultLogo from '../Logo'
import Search from '../SearchName/Search'
import Hamburger from './Hamburger'
import SideNav from '../SideNav/SideNav'
import Banner from '../Banner'

import { hasNonAscii } from '../../utils/utils'

const StyledBanner = styled(Banner)`
  margin-bottom: 0;
  text-align: center;
  z-index: 1;
  margin-top: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mq.medium`
    top: 90px;
    position: fixed;
    margin-top: 0;
  `}
`

const StyledBannerInner = styled('div')`
  max-width: 720px;
`

const Header = styled('header')`
  ${p =>
    p.isMenuOpen
      ? `
    background: #121D46;
  `
      : ''}
  display: flex;
  flex-direction: row;
  background: rgba(16 18 27 / 40%);
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 2;
  //height: 50px;
  ${mq.medium`
    // height: auto;
  `}
`

const SearchHeader = styled(Search)`
  margin-top: 70px;
  margin-bottom: 20px;
  width: 100%;
  ${mq.medium`
    margin-top: 0;
    margin-bottom: 0;
    width: calc(100% - 200px);
  `}
`

const Logo = styled(DefaultLogo)`
  position: relative;
  display: flex;
  width: 100%;
  ${p =>
    p.isMenuOpen
      ? `
    opacity: 0;
  `
      : ''}

  ${mq.medium`
    opacity: 1;
   
  `}
`

function HeaderContainer() {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const mediumBP = useMediaMin('medium')
  const mediumBPMax = useMediaMax('medium')
  const toggleMenu = () => setMenuOpen(!isMenuOpen)
  const { t } = useTranslation()

  return (
    <>
      <Header className={'header'} isMenuOpen={isMenuOpen}>
        <Logo isMenuOpen={isMenuOpen} />
        {mediumBP ? (
          <SearchHeader />
        ) : (
          <Hamburger isMenuOpen={isMenuOpen} openMenu={toggleMenu} />
        )}
      </Header>
      {hasNonAscii() && (
        <StyledBanner>
          <StyledBannerInner>
            <p>
              ⚠️ <strong>{t('warnings.homoglyph.title')}</strong>:{' '}
              {t('warnings.homoglyph.content')}{' '}
              <a
                target="_blank"
                href="https://en.wikipedia.org/wiki/IDN_homograph_attack"
                rel="noreferrer"
              >
                {t('warnings.homoglyph.link')}
              </a>
              .
            </p>
          </StyledBannerInner>
        </StyledBanner>
      )}
      {mediumBPMax && (
        <>
          <SideNav isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          <SearchHeader />
        </>
      )}
    </>
  )
}

export default HeaderContainer
