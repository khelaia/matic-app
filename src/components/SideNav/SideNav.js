import React from 'react'
import styled from '@emotion/styled/macro'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client'

import NetworkInformation from '../NetworkInformation/NetworkInformation'
import Heart from '../Icons/Heart'
import File from '../Icons/File'
import { aboutPageURL, hasNonAscii } from '../../utils/utils'
import SpeechBubble from '../Icons/SpeechBubble'
import { ReactComponent as FaqIcon } from '../../assets/faqIcon.svg'
import { ReactComponent as TwitterIcon } from '../../assets/twitter.svg'
import { ReactComponent as DiscordIcon } from '../../assets/discord.svg'

import mq from 'mediaQuery'
import { Link, withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import Info from 'components/Icons/Info'

const SideNavContainer = styled('nav')`
  display: ${p => (p.isMenuOpen ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  ${mq.medium`
    z-index: 1;
  `}

  left: 0;
  height: auto;
  background: #121d46;
  width: 100%;
  margin-top: -10px;
  ${mq.medium`
    padding: 0;
    left: 15px;
    padding-top: 50px;
    height: auto;
    background: transparent;
    width: 220px;
    display: block;
  `}

  ul {
    padding: 0;
    margin: 0;
  }
  li {
    list-style: none;
  }

  ${p =>
    p.hasNonAscii
      ? `
      top: 200px;
      ${mq.medium`top: 200px`}
    `
      : `
      top: 67px;
      ${mq.medium`top: 50px`}
    `}
`

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 200;
  font-size: 22px;
  color: ${p => (p.active ? '#5284FF' : 'var(--theme-color)')};
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  ${mq.medium`
    justify-content: start;
    border-bottom: 0;
  `}

  &:visited {
    color: var(--theme-color);
  }

  span {
    transition: 0.2s;
    margin-left: 15px;
    color: ${p => (p.active ? '#5284FF' : 'var(--theme-color)')};
  }
  path {
    fill: var(--theme-color);
  }
  g {
    fill: var(--theme-color);
  }
  &:hover {
    span {
      color: var(--theme-color);
    }
    path {
      fill: var(--theme-color);
    }
    g {
      fill: var(--theme-color);
    }
  }
`

const ThirdPartyLink = styled('a')`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 200;
  font-size: 22px;
  color: ${p => (p.active ? '#5284FF' : 'var(--theme-color)')};
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  ${mq.medium`
    justify-content: start;
    border-bottom: 0;
  `}

  &:visited {
    color: var(--theme-color);
  }

  span {
    transition: 0.2s;
    margin-left: 15px;
    color: ${p => (p.active ? '#5284FF' : 'var(--theme-color)')};
  }
  path {
    fill: var(--theme-color);
  }
  g {
    fill: var(--theme-color);
  }
  &:hover {
    span {
      color: var(--theme-color);
    }
    path {
      fill: var(--theme-color);
    }
    g {
      fill: var(--theme-color);
    }
  }
`

const SIDENAV_QUERY = gql`
  query getSideNavData {
    accounts
    isReadOnly
  }
`

function SideNav({ match, isMenuOpen, toggleMenu }) {
  const { url } = match
  const { t } = useTranslation()
  const {
    data: { accounts, isReadOnly }
  } = useQuery(SIDENAV_QUERY)
  return (
    <SideNavContainer
      className={'left-side'}
      isMenuOpen={isMenuOpen}
      hasNonAscii={hasNonAscii()}
    >
      <NetworkInformation />
      <div className={'side-wrapper'}>
        <ul data-testid="sitenav" className={'side-menu'}>
          {accounts?.length > 0 && !isReadOnly ? (
            <li>
              <NavLink
                onClick={toggleMenu}
                active={url === '/address/' + accounts[0] ? 1 : 0}
                to={'/address/' + accounts[0]}
              >
                <File active={url === '/address/' + accounts[0]} />
                <span>{t('c.mynames')}</span>
              </NavLink>
            </li>
          ) : null}
          <li>
            <NavLink
              onClick={toggleMenu}
              active={url === '/favourites' ? 1 : 0}
              to="/favourites"
            >
              <Heart active={url === '/favourites'} />
              <span>{t('c.favourites')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={toggleMenu}
              active={url === '/faq' ? 1 : 0}
              to="/faq"
            >
              <FaqIcon />
              <span>{t('c.faq')}</span>
            </NavLink>
          </li>
          <li style={{ listStyle: 'none', display: 'flex' }}>
            <ThirdPartyLink
              href={'https://twitter.com/asedomains'}
              target={'_blank'}
            >
              <TwitterIcon />
            </ThirdPartyLink>
            <ThirdPartyLink
              href={'https://discord.gg/UYb7kumf3s'}
              target={'_blank'}
              style={{ marginLeft: '10px' }}
            >
              <DiscordIcon />
            </ThirdPartyLink>
          </li>
          {/* <li>
          <ThirdPartyLink href={aboutPageURL()}>
            <Info />
            <span>{t('c.about')}</span>
          </ThirdPartyLink>
        </li> */}
        </ul>
      </div>
    </SideNavContainer>
  )
}
export default withRouter(SideNav)
