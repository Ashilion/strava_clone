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

        <Typography color={main} variant="h3">
          {titre}
        </Typography>
        <FlexBetween>
          <Typography color={medium} sx={{ mt: "1rem" }}>
            {description}
          </Typography>
          <Typography color={medium} sx={{ mt: "1rem" }}>
            {location}
          </Typography>
        </FlexBetween>
        <FlexBetween gap="1.5rem" mt="1rem" style={{flexDirection:'column'}}>
          <MapsLinesWidget data={data} />
          <FlexBetween mt="1rem" mr="3rem" ml="3rem" style={{flexDirection:'column'}}>
            <Typography color={main} variant="h4">{distance} km</Typography>
            <Typography color={main} variant="h4">{stringDuration}</Typography>
            <Typography color={main} variant="h4">{allure} min/km</Typography>
            <Typography color={main} variant="h4">{heartrateMean} bpm</Typography>
            <Typography color={main} variant="h4">{denivelePositif} m</Typography>
            <Typography color={main} variant="h4">{scoreTrimp} score d'intensité</Typography>
            <Typography color ={main} variant="h4">{startTime} début</Typography>
          </FlexBetween>
        </FlexBetween>
        {data && (
          <img
            width="100%"
            height="auto"
            alt="map"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          />
        )}
      </WidgetWrapper>
    );
  };
  
  export default ActivityWidget;
  