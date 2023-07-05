import React from 'react';
import { Box, Flex, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { Utils } from 'alchemy-sdk';

function TokenList({ results, tokenDataObjects, hasQueried, finalSearchAddress, searchTime, error }) {
    return (
        <Flex w="100%" maxWidth='724px' flexDir="column" alignItems="center" bg="gray.100" color="white" borderRadius="2xl" background="#1e2a47" boxShadow="md" my="24px" p='24px'>
            <Heading size='3xl' mx="auto" mb="12px" fontSize={20} fontWeight={'bold'} textAlign="center">ERC-20 token balances: {
                hasQueried && finalSearchAddress ? `${finalSearchAddress.substring(0, 5)}....${finalSearchAddress.substring(finalSearchAddress.length - 4)}` : ""}</Heading>
            {hasQueried && searchTime ? <Text opacity={'0.5'} mb="24px">{results.tokenBalances.length} results ({searchTime} seconds)</Text> : ''}
            {hasQueried ? (
                <SimpleGrid w={'100%'} columns={[1, 2]} spacing='24px'>
                    {results.tokenBalances.map((e, i) => {
                        return (
                            <Flex color="white" bg="#141d2f" key={e.id} borderRadius="8px" p="8px" >
                                <Flex justifyContent={"center"} alignItems={"center"} height="100%" pe="8px">
                                    <Image src={tokenDataObjects[i] ? tokenDataObjects[i].logo : ""} height={"32px"} />
                                </Flex>
                                <Box>
                                    <Text><b>Symbol:</b> ${tokenDataObjects[i] ? tokenDataObjects[i].symbol : ""}</Text>
                                    <Text><b>Balance:</b> {tokenDataObjects[i] ? parseFloat(Utils.formatUnits(e.tokenBalance, tokenDataObjects[i].decimals).toString()).toFixed(4) : ""}</Text>
                                </Box>
                            </Flex>
                        );
                    })}
                </SimpleGrid>
            ) : (
                error ? <Text color="red" textAlign={'center'}>{error}</Text> : 'Please make a query! This may take a few seconds...'
            )}
        </Flex>
    )
}

export default TokenList;