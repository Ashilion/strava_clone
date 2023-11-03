import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import ActivityWidget from "./ActivityWidget";

const ActivitiesWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getActivities = async () => {
    const response = await fetch("http://localhost:3001/activity", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserActivities = async () => {
    const response = await fetch(
      `http://localhost:3001/activity/${userId}/activities`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserActivities();
    } else {
      getActivities();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          distance,
          stringDuration,
          denivelePositif,
          heartrateMean,
          allure,
          picturePath,
          userPicturePath,
          likes,
          comments,
          startTime,
        }) => (
          <ActivityWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            distance={distance}
            stringDuration={stringDuration}
            heartrateMean={heartrateMean}
            denivelePositif={denivelePositif}
            allure={allure}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            starTime={startTime}
          />
        )
      )}
    </>
  );
};

export default ActivitiesWidget;