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

const Index = ({t}) => {   
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
             {t('Title')}            
             <h1>Index page</h1> 
        </div>
    )
}

/*
export async function getServerSideProps(ctx) {    
    //const jwt = parseCookies(ctx).jwt
    //const {API_URL} = process.env
    //const {publicRuntimeConfig} = getConfig()

    const res = await fetch(`${API_URL}/api/courses?page=${page}&limit=${elsPerPage}`, {
        method: 'GET',
        credentials: 'include',         //to pass cookie (not needed if Authorization used)
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        
    })
    const data = await res.json()
    return {
        props: {
           data              // now props.data
        }        
    }
}
*/

export default withTranslation('about')(Index)

