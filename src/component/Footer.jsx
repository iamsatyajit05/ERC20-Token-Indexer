import React from 'react';
import { Box, Link, Text } from '@chakra-ui/react';

function Footer() {
    return (
        <Box py="16px" color='white' textAlign='center'>
            <Text opacity={0.8} transition={'200ms'} _hover={{opacity: "1"}}>Made with 💛 by <Link href="https://twitter.com/0xSatyajit" target='_blank' isExternal style={{ textDecoration: 'underline' }}>Satyajit</Link></Text>
            <Text opacity={0.8} transition={'200ms'} _hover={{opacity: "1"}}><Link href="https://university.alchemy.com/" isExternal style={{ textDecoration: 'underline' }}>Alchemy University - Ethereum Dev. Bootcamp</Link></Text>
        </Box>
    )
}

export default Footer;