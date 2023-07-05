import React from 'react';
import { Button, Flex, Heading } from '@chakra-ui/react';

function NavBar({ userAddress, onClickGetUserToken, onClickConnectWallet }) {
    return (
        <Flex w="100%" maxWidth='724px' flexDir={['column', 'row', 'row']} alignItems={'center'} justifyContent="space-between" mt="48px" mb="36px">
            <Heading mt={0} mb={['12px', 0, 0]} fontSize={36} fontWeight={"bold"} color={'white'}>ERC-20 Indexer</Heading>
            {userAddress ? (
                <Button onClick={onClickGetUserToken} color="white" colorScheme='twitter' fontSize={16} fontWeight={'bold'} px={'16px'} py={'12px'} borderRadius={'md'} transition={'200ms'} _active={{ transform: "scale(0.975)" }}>
                    {userAddress.substring(0, 5)}....{userAddress.substring(userAddress.length - 4)}
                </Button>
            ) : (
                <Button onClick={onClickConnectWallet} color="white" colorScheme='twitter' fontSize={16} fontWeight={'bold'} px={'16px'} py={'12px'} borderRadius={'md'} transition={'200ms'} _active={{ transform: "scale(0.975)" }}>
                    Connect Wallet
                </Button>
            )}
        </Flex>
    )
}

export default NavBar;