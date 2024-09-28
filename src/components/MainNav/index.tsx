import {
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
        <Flex as="nav" justifyContent={"flex-end"} p={6} pr={8} bg={"gray.400"}>
            <Menu offset={[0, 10]}>
                <MenuButton as={Button}>
                    <span>{currentUser?.name}</span>{" "}
                    <HamburgerIcon ml={3} mb={1} />
                </MenuButton>
                <MenuList>
                    <MenuItem>My subscriptions</MenuItem>
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
