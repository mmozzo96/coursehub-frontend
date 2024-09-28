import {
    Box,
    Button,
    Flex,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/user/userSlice";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FiLogOut } from "react-icons/fi";
import { useUrl } from "crossroad";

const MainNav: React.FC = () => {
    const [, setUrl] = useUrl();

    const currentUser = useAppSelector(selectCurrentUser);

    return (
        <Flex
            as="nav"
            justifyContent={"space-between"}
            p={6}
            pr={8}
            gap={4}
            bg={"gray.400"}
        >
            <Box fontSize={30} fontWeight={800}>
                CourseHub
            </Box>
            <Menu offset={[0, 10]}>
                <MenuButton as={Button} minW={"fit-content"}>
                    <span>{currentUser?.name}</span>
                    <HamburgerIcon ml={3} mb={1} />
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => setUrl("/")}>
                        <Icon as={FiLogOut} mr={3} />
                        <span>Log out</span>
                    </MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    );
};

export default MainNav;
