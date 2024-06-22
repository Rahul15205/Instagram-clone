import React from 'react';
import { Box, Flex, Avatar, Text, Button } from '@chakra-ui/react';
import useFollowUser from '../../hooks/useFollowUser';
import useAuthStore from '../../store/authStore';

const FollowerItem = ({ user,setUser}) => {
  const {isFollowing,isUpdating,handleFollowUser} = useFollowUser(user.uid);
  const authUser = useAuthStore(state => state.user);

  const onFollowUser = async () => {
    await handleFollowUser();
    setUser({
      ...user,
        followers: isFollowing ? user.followers.filter((follower) => follower.uid !== authUser.uid)
          : [...user.followers,authUser],
    });
  };




  return (
    <Flex alignItems="center" justifyContent="space-between" p={2} borderBottom="1px solid gray">
      <Flex alignItems="center">
        <Avatar src={user.profilePicURL} size="md" />
        <Box ml={3}>
          <Text fontWeight="bold">{user.username}</Text>
          <Text fontSize="sm" color="gray.500">{user.fullName}</Text>
        </Box>
      </Flex>
      
        <Button 
          bg={"blue.500"} 
          color={"white"} 
          _hover={{ bg: "blue.600" }} 
          size={{ base: "xs", md: "sm" }} 
          onClick={onFollowUser} 
          isLoading={isUpdating}
          cursor={"pointer"}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      
    </Flex>
  );
};

export default FollowerItem;
