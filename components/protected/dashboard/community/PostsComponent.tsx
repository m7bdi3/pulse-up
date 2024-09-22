import React, { useState } from "react";
import { PostsWithData } from "@/hooks/store/user";
import { formatDistanceToNow } from "date-fns";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CreateLike,
  DeleteComment,
  DeletePost,
} from "@/actions/CommunityActions";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import useSWR, { mutate } from "swr";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Flag,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PostCreateForm } from "../../forms/create-post-form";
import { CommentCreateForm } from "../../forms/create-comment-form";

interface CommentsWithData {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PostCard: React.FC<{ post: PostsWithData }> = ({ post }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const session = useSession();
  const isLiked = !!post.likes.find((p) => p.userId === session.data?.user.id);

  const handleLike = async (postId: string) => {
    try {
      await CreateLike(postId);
      mutate("/api/posts");
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = async (commentId: string) => {
    try {
      await DeleteComment(commentId);
      mutate("/api/posts");
    } catch (error) {
      console.error(error);
    }
  };

  const handlePost = async (postId: string) => {
    try {
      await DeletePost(postId);
      mutate("/api/posts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center w-full mb-4">
          <Avatar className="h-10 w-10 mr-2">
            <AvatarImage src={post.user.image!} alt={post.user.name!} />
            <AvatarFallback>
              {post.user.name ? post.user.name[0] : ""}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <p className="font-semibold">{post.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
          {post.user.id === session.data?.user.id && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-8 h-8" variant="outline" size="icon">
                  <MoreHorizontalIcon className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handlePost(post.id)}>
                  <Trash2Icon className="mr-2 h-4 w-4 text-destructive" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div>
          <Card className="mb-4 p-4">
            <CardHeader>
              <p className="font-semibold">{post.content}</p>
            </CardHeader>
            <>
              {post.images.length > 0 && (
                <div
                  className={cn(
                    "grid gap-4",
                    post.images.length === 1 ? "grid-cols-1" : "grid-cols-2",
                    "mb-4"
                  )}
                >
                  {post.images.map((image, index) => (
                    <div key={image} className="relative aspect-square">
                      <Image
                        src={image}
                        alt={`Post image ${index + 1}`}
                        fill
                        className="object-cover rounded-md"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          </Card>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLike(post.id)}
              className="flex items-center"
            >
              <Heart
                className={cn(
                  "mr-2 h-4 w-4",
                  isLiked && "fill-red-500 text-red-500"
                )}
              />
              <span>{post._count.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              <span>{post._count.comments}</span>
            </Button>
          </div>
          <Button variant="ghost" size="sm">
            <Flag className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <CommentCreateForm postId={post.id} />
          </DrawerHeader>
          <ScrollArea className="h-[50vh] px-4 md:px-6" data-vaul-no-drag>
            {post.comments.map((comment: CommentsWithData) => (
              <Card key={comment.id} className="mb-4">
                <CardHeader className="flex flex-row items-center py-2 px-4">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage
                      src={comment.user.image!}
                      alt={comment.user.name!}
                    />
                    <AvatarFallback>
                      {comment.user.name ? comment.user.name[0] : ""}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p className="font-semibold">{comment.user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  {comment.userId === session.data?.user.id && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="w-8 h-8"
                          variant="outline"
                          size="icon"
                        >
                          <MoreHorizontalIcon className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleComment(comment.id)}
                        >
                          <Trash2Icon className="mr-2 h-4 w-4 text-destructive" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </CardHeader>
                <CardContent className="py-2 px-4">
                  <p>{comment.content}</p>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Card>
  );
};

export const PostsComponent = () => {
  const { data, isLoading } = useSWR("/api/posts", fetcher);

  return (
    <>
      <PostCreateForm />
      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="ml-2 space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))
        : data?.map((post: PostsWithData) => (
            <PostCard key={post.id} post={post} />
          ))}
    </>
  );
};
