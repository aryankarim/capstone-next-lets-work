import React, { useEffect } from "react";
import {
  VStack,
  Flex,
  Avatar,
  AvatarBadge,
  Heading,
  Box,
  Text,
  List,
  ListItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/dist/client/router";

import { auth } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChatRoom,
  resetChatStatus,
  setChatUser,
  setGroupChat,
} from "../../store/chat/chatSlice";
function ChatList({ users, groupChats }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const chatRoom = useSelector((state) => state.chat.chatRoom);
  const { room } = router.query;
  const chatUser = useSelector((state) => state.chat.chatUser);

  useEffect(() => {
    if (chatRoom.status !== "loading" && chatRoom.status !== "")
      router.push(`/chat/?room=${chatRoom.id}`, undefined, { shallow: true });
    dispatch(resetChatStatus());
    //eslint-disable-next-line
  }, [chatRoom]);
  async function handlePrivateChat(user) {
    dispatch(
      handleChatRoom({
        currentUserId: auth.currentUser.uid,
        userId: user.id,
      })
    );
    dispatch(setChatUser(user));
    dispatch(setGroupChat(""));
  }
  async function handleGroupChat(chat) {
    router.push(`/chat/?room=${chat.id}`);
    dispatch(setGroupChat(chat));
    dispatch(setChatUser(""));
  }
  const { t } = useTranslation("chat");
  return (
    <Flex
      as="aside"
      w={room || "100%"}
      display={{ base: room ? "none" : "flex", lg: "flex" }}
      pt={8}
      h="80vh"
      overflow="auto"
      overflowX="hidden"
    >
      <Tabs w="100%" isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab
            _focus={{ boxShadow: "none" }}
            _selected={{ color: "white", bg: "primary.main" }}
          >
            {t("private")}
          </Tab>
          <Tab
            _focus={{ boxShadow: "none" }}
            _selected={{ color: "white", bg: "primary.main" }}
          >
            {t("group")}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack h="full" alignItems="center" w="full" spacing={6}>
              <Box w="full" overflowY="auto">
                <List w="full" spacing={0}>
                  {users?.map((user) => (
                    <ListItem
                      bg={user.id === chatUser.id && "gray.50"}
                      onClick={() => {
                        handlePrivateChat(user);
                      }}
                      key={user.id}
                    >
                      <Flex
                        py={4}
                        px={2}
                        w="full"
                        alignItems="center"
                        borderBottomColor="gray.100"
                        borderBottomWidth={1}
                        style={{ transition: "background 300ms" }}
                        _hover={{ bg: "gray.50", cursor: "pointer" }}
                      >
                        <Box rounded="full" bg="gray.100" minW={14} minH={14}>
                          <Avatar
                            name={user.username}
                            src={user.imageURL}
                            minW={14}
                            minH={14}
                          >
                            <AvatarBadge
                              bg="green.400"
                              boxSize={4}
                              borderWidth={2}
                            />
                          </Avatar>
                        </Box>
                        <VStack
                          overflow="hidden"
                          flex={1}
                          ml={3}
                          spacing={0}
                          alignItems="flex-start"
                        >
                          <Heading fontSize={12} w="full">
                            {user.username}
                          </Heading>
                          <Text
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                            w="full"
                            fontSize="xs"
                            color="gray.500"
                          >
                            {user.createdAt}
                          </Text>
                        </VStack>
                      </Flex>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack h="full" alignItems="center" w="full" spacing={6}>
              <Flex
                w="full"
                flexDirection="column"
                alignItems="center"
                justifyContent="flex-start"
              ></Flex>

              <Box w="full" overflowY="auto">
                <List w="full" spacing={0}>
                  {groupChats.map((chat) => {
                    return (
                      <ListItem
                        onClick={() => {
                          handleGroupChat(chat);
                        }}
                        bg={chat.id === room && "gray.50"}
                        key={chat.id}
                      >
                        <Flex
                          py={4}
                          px={2}
                          w="full"
                          alignItems="center"
                          borderBottomColor="gray.100"
                          borderBottomWidth={1}
                          style={{ transition: "background 300ms" }}
                          _hover={{ bg: "gray.50", cursor: "pointer" }}
                        >
                          <Box rounded="full" bg="gray.100" minW={14} minH={14}>
                            <Avatar
                              src={chat.imageURL}
                              name={chat.title}
                              minW={14}
                              minH={14}
                            >
                              <AvatarBadge
                                bg="green.400"
                                boxSize={4}
                                borderWidth={2}
                              />
                            </Avatar>
                          </Box>
                          <VStack
                            overflow="hidden"
                            flex={1}
                            ml={3}
                            spacing={0}
                            alignItems="flex-start"
                          >
                            <Heading fontSize={12} w="full">
                              {chat.title}
                            </Heading>

                            <Text
                              overflow="hidden"
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                              w="full"
                              fontSize="xs"
                              color="gray.500"
                            ></Text>
                          </VStack>
                        </Flex>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default ChatList;
