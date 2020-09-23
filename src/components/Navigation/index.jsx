import React, { useContext } from 'react';
import { RiMoonClearLine, RiSunLine } from 'react-icons/ri';
import classNames from 'classnames';
import { Link } from 'gatsby';
import { DarkModeContext } from '../DarkModeProvider';
import Section from '../Section';
import Text from '../Text';
import Logo from '../../images/logo.svg';
import styles from './Navigation.module.scss';

const links = [
  {
    children: `Home`,
    to: `/`,
  },
  {
    children: `Events`,
    to: `/events`,
  },
];

export default function Navigation() {
  const { isDark, setIsDark } = useContext(DarkModeContext);
  return (
    <Section contentClassName={styles.container} as='nav'>
      <div className={styles.logo}>
        <Logo className={styles.asset} />
        <Text color='primary' bold>
          CMSClubs
        </Text>
      </div>
      <ul className={styles.items}>
        {links.map((props, i) => (
          <li className={styles.item} key={i}>
            <Text
              activeClassName={styles[`link--active`]}
              className={styles.link}
              color='text'
              as={Link}
              bold
              {...props}
            />
          </li>
        ))}
        <li className={styles.item}>
          <button
            onClick={() => setIsDark()}
            className={styles.button}
          >
            <RiMoonClearLine
              className={classNames(
                isDark && styles[`icon--hide`],
                styles.icon,
              )}
            />
            <RiSunLine
              className={classNames(
                isDark || styles[`icon--hide`],
                styles[`icon--abs`],
                styles.icon,
              )}
            />
          </button>
        </li>
      </ul>
    </Section>
  );
}
