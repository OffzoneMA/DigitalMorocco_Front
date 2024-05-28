import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { changeLang, language, languages } from '../../../Language'

/**
 * Language
 * 
 * @returns 
 */
const Language = () => {

    /**
     * Flag state
     * 
     */
    const [flag, setFlag] = useState<string>()

    /**
     * Next lang
     * 
     */
    const nextLang = languages.filter(item => item.code !== language)[0];

     /**
     * Handler for language change
     */
     const handleChangeLanguage = () => {
        changeLang(nextLang.code);
        window.scrollTo(0, 0); 
    };

    /**
     * On load
     * 
     */
    useEffect(() => {

        // Set flag
        import(`../../../Media/Icons/${nextLang.flag}`).then(data => setFlag(data.default))
    }, [])

    return flag ? (
        <Container onClick={handleChangeLanguage} title={nextLang.name}>
            <img src={flag} alt='' loading='lazy' />
        </Container>
    ) : null
}

export default Language

/**
 * Container
 * 
 */
const Container = styled.div`
    position: absolute;
    right: 0;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-end-start-radius: 4px;
    border-start-start-radius: 4px;
    box-shadow: var(--shadow);
    height: 25px;
    animation: 300ms ${keyframes`
        0% { opacity: 0; }
        100% { opacity: 1; }
    `};

    > img {
        height: 100%;
    }
`;