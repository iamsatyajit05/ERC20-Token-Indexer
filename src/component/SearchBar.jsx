import React from 'react';
import { Button, Flex, Hide, Input, InputLeftElement, InputGroup, Show } from '@chakra-ui/react';
import { SearchIcon } from "@chakra-ui/icons";

function SearchBar({ searchAddress, onSearchChange, onSearchClick, isLoading }) {
    return (
        <Flex w="100%" maxWidth='724px' alignItems="center" bg="gray.100" borderRadius="2xl" background="#1e2a47" boxShadow="md" p='12px'>
            <InputGroup>
                <Show above='sm'>
                    <InputLeftElement py={'12px'} pl={'12px'} h="100%" pointerEvents='none'>
                        <SearchIcon boxSize='24px' color="white" />
                    </InputLeftElement>
                </Show>
                <Input variant="unstyled" type="search" name="user-input" id="input" placeholder="Enter an address" _placeholder={{ color: "gray.500", }} flex="1" border='none' borderWidth="0" outline="none" py={'12px'} pl={['12px', '48px']} value={searchAddress} onChange={onSearchChange} color="white" textAlign="left" bgColor="#1e2a47" _focus={{ bgColor: "#1e2a47", }} _active={{ bgColor: "#1e2a47", }} fontSize={16} background="#1e2a47" />
            </InputGroup>
            <Button h='100%' type="submit" variant="solid" color={'white'} size="sm" fontWeight="bold" ml={2} px={'16px'} py={'12px'} _active={{ transform: "scale(0.975)" }} fontSize={16} onClick={onSearchClick} isLoading={isLoading} disabled={isLoading} borderRadius={'md'} transition={'200ms'} colorScheme='twitter'>
                <Hide below='sm'>
                    Search
                </Hide>
                <Show below='sm'>
                    <SearchIcon boxSize='24px' color="white" />
                </Show>
            </Button>
        </Flex>
    )
}

export default SearchBar;