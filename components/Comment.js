import {
  Avatar,
  AvatarBadge,
  Text,
  VStack,
  Box,
  Flex,
  Icon,
  HStack,
} from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/firebase";
import { handleCommentLike } from "../store/comments/commentSlice";

function Comment({ sampleComment, postUser }) {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();
  const likeStatus = useSelector((state) => state.comments.likeStatus);
  function handleLike() {
    if (
      auth.currentUser &&
      likeStatus !== "loading" &&
      auth.currentUser?.emailVerified
    ) {
      dispatch(
        handleCommentLike({
          userId: auth.currentUser.uid,
          postId: sampleComment.postId,
          commentId: sampleComment.id,
        })
      );
      if (!sampleComment.likes.includes(auth.currentUser.uid)) {
        sampleComment.likes.push(auth.currentUser.uid);
      } else {
        const userIndex = sampleComment.likes.find(
          (u) => u === auth.currentUser.uid
        );
        sampleComment.likes.splice(userIndex, 1);
      }
    }
  }
  return (
    <Box
      bg="white"
      w={{ lg: "40%", base: "60%" }}
      p="2"
      m="5"
      rounded="xl"
      border-radius="10px"
    >
      <VStack align="flex-start">
        <Flex w="100%" wrap="wrap" justify="space-between" align="center">
          <HStack spacing="0">
            <Avatar size="sm" src={sampleComment.userImage} mr="2">
              <AvatarBadge boxSize="1em" bg="green.500" />
            </Avatar>
            <VStack align="flex-start" spacing="0">
              <Text
                fontSize={{ base: "10px", md: "14px" }}
                color="#3F3B3B"
                fontWeight="bold"
              >
                {sampleComment.username}
              </Text>
              {sampleComment.userId === postUser && (
                <Text fontWeight="light" fontSize="11px">
                  author{" "}
                </Text>
              )}
            </VStack>
          </HStack>
        </Flex>
        <Text
          w="100%"
          fontSize={{ base: "md", md: "md" }}
          fontWeight="medium"
          color="#5D6F88"
          paddingX="10px"
          isTruncated={!showMore}
        >
          {sampleComment.content}{" "}
        </Text>
        {sampleComment.content.length >= 36 && (
          <Text
            onClick={() => setShowMore(!showMore)}
            cursor="pointer"
            fontWeight="light"
            fontSize="14px"
          >
            {showMore ? "Show Less" : "Show More"}
          </Text>
        )}
        <Flex w="100%" justify="space-between">
          <HStack>
            <Icon
              onClick={handleLike}
              color="blue"
              as={
                sampleComment.likes.includes(auth.currentUser?.uid)
                  ? BsHeartFill
                  : BsHeart
              }
            />
            <Text
              color="#5D5FEF"
              border="none"
              bg="none"
              fontSize={{ base: "13px", md: "13px" }}
            >
              {sampleComment.likes.length}
            </Text>
          </HStack>
          <Text fontSize="xs" fontWeight="light">
            {" "}
            {moment(sampleComment.createdAt).fromNow()}
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
}

export default Comment;
