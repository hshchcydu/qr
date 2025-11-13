import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { communityApi } from '@/services/api';
import type { Post } from '@/types';

export const usePosts = (category?: string, page = 1, pageSize = 20) => {
  return useQuery({
    queryKey: ['posts', category, page, pageSize],
    queryFn: () => communityApi.getPosts(category, page, pageSize),
  });
};

export const usePostById = (id: string) => {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => communityApi.getPostById(id),
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: Omit<Post, 'id'>) => communityApi.createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => communityApi.likePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useComments = (postId: string) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => communityApi.getComments(postId),
    enabled: !!postId,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }: { postId: string; content: string }) =>
      communityApi.createComment(postId, content),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.postId] });
    },
  });
};
