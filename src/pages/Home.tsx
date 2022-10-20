import React from "react";
import { useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { selectPosts } from "../redux/posts/selectors";
import { useAppDispatch } from "../redux/store";
import { fetchPosts } from "../redux/posts/asyncAction";
import { fetchTags } from "../redux/tags/asyncAction";
import { StatusEnum } from "../redux/posts/types";
import { PostSkeleton } from "../components/Post/Skeleton";
import { selectTags } from "../redux/tags/selectors";

export const Home: React.FC = () => {
  const { posts, status: postsStatus } = useSelector(selectPosts);
  const { tags, status: tagsStatus } = useSelector(selectTags);
  const dispatch = useAppDispatch();

  const isPostLoading = postsStatus === StatusEnum.LOADIND;
  const isTagsLoading = tagsStatus === StatusEnum.LOADIND;

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts).map((post, index) =>
            isPostLoading ? (
              <PostSkeleton key={index} />
            ) : (
              <Post
                key={post._id}
                id={post._id}
                title={post.title}
                imageUrl={post.imageUrl}
                user={post.user}
                createdAt={post.createdAt}
                viewsCount={post.viewsCount}
                commentsCount={3}
                tags={post.tags}
                isEditable
                isFullPost={false}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
