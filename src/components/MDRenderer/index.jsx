import React from 'react';
import Markdown from 'react-markdown';
import Text from '../Text';
import Link from '../Link';
import styles from './MDRenderer.module.scss';

const renderers = {
    paragraph: props => <Text className={styles.paragraph} spacing='relax' {...props}/>,
    link: ({ href, ...props }) => <Link to={href} { ...props }/>,
};

export default function MDRenderer({ children }) {
    return (
        <Markdown
            renderers={renderers}
            source={children}
        />
    );
}