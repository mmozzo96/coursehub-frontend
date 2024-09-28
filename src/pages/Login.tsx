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
    Heading,
} from "@chakra-ui/react";
import { setCurrentUser } from "../features/user/userSlice";
import { ChevronDownIcon } from "@chakra-ui/icons";

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const learnersWithName = useAppSelector(selectLearnersWithname);

    React.useEffect(() => {
        localStorage.removeItem(
            process.env.REACT_APP_LOCALSTORAGE_USER_ID_KEY!
        );
        dispatch(setCurrentUser(undefined));
    }, [dispatch]);

    return (
        <Flex
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
            h={"100vh"}
            gap={4}
        >
            <Heading textAlign={"center"}>
                Welcome to{" "}
                <span style={{ fontSize: "50px", fontWeight: "800" }}>
                    CourseHub
                </span>
            </Heading>
            <Heading size={"md"} mb={6} textAlign={"center"}>
                You can start by selecting a learner
            </Heading>
            <Menu offset={[-50, 10]}>
                <MenuButton as={Button} w={200}>
                    <span>Select a Learner</span>{" "}
                    <ChevronDownIcon h={5} w={5} />
                </MenuButton>
                <MenuList w={300}>
                    {learnersWithName?.map((learnerWithName) => (
                        <MenuItem
                            as={Link}
                            key={learnerWithName.sys_id}
                            onClick={() => {
                                dispatch(setCurrentUser(learnerWithName));
                                localStorage.setItem(
                                    process.env
                                        .REACT_APP_LOCALSTORAGE_USER_ID_KEY!,
                                    learnerWithName.sys_id
                                );
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
