import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Friend from "components/Friend";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "state";
  import MapsLinesWidget from "./MapsLinesWidget";
  
  const ActivityWidget = ({
    postId,
    postUserId,
    name,
    titre,
    description,
    distance ,
    allure ,
    heartrateMean,
    denivelePositif ,
    stringDuration ,
    tabZonesFc ,
    scoreTrimp , 
    startTime ,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
    data,
  }) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const medium = palette.neutral.medium;
  
    const patchLike = async () => {
      const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };
    return (
      <WidgetWrapper m="2rem 0">
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        <FlexBetween>
          <Typography variant="h3"color={main} sx={{ mt: "1rem" }}>
            {description}
          </Typography>
        </FlexBetween>
        <FlexBetween gap="1.5rem" mt="1rem" style={{flexDirection:'column', width:"100%"}}>
          <FlexBetween width="100%"  style ={{justifyContent:"space-between"}}>
            <Typography color={medium} >{distance} km</Typography>
            <Typography color={medium} >{stringDuration}</Typography>
            <Typography color={medium} >{allure} min/km</Typography>
          </FlexBetween>
          <MapsLinesWidget data={data} />
            
        </FlexBetween>
        {data && (
          <img
            width="100%"
            height="auto"
            alt="map"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          />
        )}
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <Typography>🤟</Typography>
          </FlexBetween>
        </FlexBetween>
      </WidgetWrapper>
    );
  };
  
  export default ActivityWidget;
  