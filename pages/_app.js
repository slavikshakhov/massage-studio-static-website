import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';

import getConfig from 'next/config'


import { appWithTranslation } from '../i18n'
import Router from 'next/router'

import ContextWrapper from '../Context/ContextWrapper'

import Header from '../src/components/Header'

import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import Footer from '../src/components/Footer';


const MyApp = (props) => {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <DefaultSeo {...SEO} />   
        <ContextWrapper>
          <Head>          
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Header />
            <Component {...pageProps} />
            <Footer />
          </ThemeProvider>      
        </ContextWrapper>   
          
    </React.Fragment>
  );
}





export default appWithTranslation(MyApp)