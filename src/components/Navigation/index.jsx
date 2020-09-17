import React from 'react';
import Logo from '../../images/logo.svg';
import Section from '../Section';
import Text from '../Text';
import styles from './Navigation.module.scss';

export default function Navigation() {
    return (
        <Section as='nav'>
            <div className={styles.logo}>
                <Logo className={styles.asset} fill='var(--c-primary)' width='1.8rem'/>
                <Text color='primary' bold>CMSClubs</Text>
            </div>
        </Section>
    );
}