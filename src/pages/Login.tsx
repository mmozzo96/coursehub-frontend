import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectLearnersWithname } from "../features/tableData/tableDataSlice";
import {
    Flex,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Link,
} from "@chakra-ui/react";
import { setCurrentUser } from "../features/user/userSlice";

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const learnersWithName = useAppSelector(selectLearnersWithname);

    return (
        <Flex
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
            h={"100vh"}
        >
            <Menu offset={[-50, 10]}>
                <MenuButton as={Button} w={200}>
                    Select a Learner
                </MenuButton>
                <MenuList w={300}>
                    {learnersWithName?.map((learnerWithName) => (
                        <MenuItem
                            as={Link}
                            key={learnerWithName.sys_id}
                            onClick={() => {
                                dispatch(setCurrentUser(learnerWithName));
                            }}
                            href="/main"
                        >
                            {learnerWithName.name}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </Flex>
    );
};

export default LoginPage;
