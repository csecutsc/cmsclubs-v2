import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export default function Seo({ title, lang, meta }) {
  const { site } = useStaticQuery(query);

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: site.siteMetadata.description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:image`,
          content: `${site.siteMetadata.homepage}/logo.svg`,
        },
        {
          property: `og:image:type`,
          content: `image/svg+xml`,
        },
        {
          property: `og:image:width`,
          content: `400`,
        },
        {
          property: `og:image:height`,
          content: `400`,
        },
        {
          property: `og:description`,
          content: site.siteMetadata.description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: site.siteMetadata.description,
        },
      ].concat(meta)}
    />
  );
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
};

Seo.propTypes = {
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  lang: PropTypes.string,
};

const query = graphql`
  {
    site {
      siteMetadata {
        description
        homepage
        keywords
        author
        title
      }
    }
  }
`;
