import React from "react";
import MainNav from "../components/MainNav";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Courses from "../components/CoursesPage";
import MySubscriptions from "../components/MySubscriptionsPage";

const MainPage: React.FC = () => {
    const [tabIndex, setTabIndex] = React.useState(0);
    const handleTabsChange = (index: number) => {
        setTabIndex(index);
    };

    return (
        <>
            <MainNav />
            <Tabs
                index={tabIndex}
                onChange={handleTabsChange}
                colorScheme="cyan"
            >
                <TabList>
                    <Tab fontWeight={800}>All courses</Tab>
                    <Tab fontWeight={800}>My subscriptions</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Courses />
                    </TabPanel>
                    <TabPanel>
                        <MySubscriptions
                            sendToAllCourses={() => handleTabsChange(0)}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
};

export default MainPage;
