import React from 'react';
import { Link } from 'gatsby';
import Logo from '../../images/logo.svg';
import Section from '../Section';
import Text from '../Text';
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
  return (
    <Section contentClassName={styles.container} as='nav'>
      <div className={styles.logo}>
        <Logo className={styles.asset} fill='var(--c-primary)' />
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
      </ul>
    </Section>
  );
}
