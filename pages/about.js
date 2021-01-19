import React from 'react'

//Multilanguage support
import { withTranslation } from '../i18n'

//Search Engine Optimization
import {NextSeo} from 'next-seo'

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Button} from '@material-ui/core'


// Link
import Link from 'next/link'

// router (ex. to redirect...)
import Router, {useRouter} from 'next/router'

// Material-UI styles 
const useStyles = makeStyles((theme) => ({
 
}));

const About = ({t}) => {   
    const {API_URL} = process.env
    const router = useRouter()        // for redirect in jsx: router.push('/')

    
    const classes = useStyles()
    const SEO = {
        title: 'About Page',                            // page.title  <-- backend
        description: 'Just your normal about page',

        openGraph: {
            title: 'About Page',
            description: 'Just your normal about page',
        }
    }
    return (
        <div>
            <NextSeo {...SEO} />                 
            <h1>{t('title')}</h1>
             
             <p>{t('description')}</p>
        </div>
    )
}





export default withTranslation('about')(About)

/*
<h1>{data.title}</h1>
             <p dangerouslySetInnerHTML={{__html: data.description}}></p>
*/