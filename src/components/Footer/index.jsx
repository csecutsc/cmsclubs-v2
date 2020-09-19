import React from 'react';
import Section from '../Section';
import Text from '../Text';
import styles from './Footer.module.scss';

export default function Footer() {
    return (
        <Section
            contentClassName={styles.container}
            as='footer'
        >
            <Text
                className={styles.text}
                bold
            >
                Made with ❤ by CSEC
            </Text>
            <Text
                onClick={() => window.scrollTo({
                    behavior: `smooth`,
                    top: 0,
                })}
                className={styles.button}
                as='button'
                bold
            >
                Back To Top
            </Text>
        </Section>
    );
}