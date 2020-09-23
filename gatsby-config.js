const {
  author,
  description,
  homepage,
  keywords,
  repository,
} = require(`./package.json`);
const { PRIMARY_COLOR } = require(`./codegen/env`);
require(`dotenv`).config();

module.exports = {
  siteMetadata: {
    repo: repository.url.replace(/\.git$/, ''),
    title: `CMSClubs`,
    description,
    homepage,
    keywords,
    author,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        headers: {
          Authorization: `Bearer ${process.env.GATSBY_GRAPHCMS_TOKEN}`,
        },
        url: process.env.GATSBY_GRAPHCMS_ENDPOINT,
        typeName: `GraphCMS`,
        fieldName: `gcms`,
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        cssLoaderOptions: {
          camelCase: false,
        },
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `cms-clubs`,
        short_name: `cms-clubs`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: PRIMARY_COLOR,
        display: `minimal-ui`,
        icon: `src/images/logo.svg`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-mini-css-class-name`,
  ],
};
