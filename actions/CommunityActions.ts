"use server";
import { auth } from "@/auth";
import { CommentSchema, PostSchema } from "@/components/protected/forms";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import * as z from "zod";
export async function CreatePost(values: z.infer<typeof PostSchema>) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unautorized" };
  }

  const validatedValues = PostSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }
  const { content, images } = validatedValues.data;
  try {
    await db.post.create({
      data: {
        content,
        images,
        userId: session.user.id,
      },
    });
    revalidatePath("/dashboard/community", "layout");
    return { success: "Post created successfully." };
  } catch {
    return { error: "Failed to create post." };
  }
}

export async function DeletePost(postId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unautorized" };
  }

  const existingPost = await db.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (existingPost?.userId === session.user.id) {
    try {
      await db.post.delete({
        where: {
          id: postId,
        },
      });
      revalidatePath("/dashboard/community", "layout");
      return { success: "Post Deleted successfully." };
    } catch {
      return { error: "Failed to Delete post." };
    }
  } else {
    return { error: "Unautorized" };
  }
}

export async function CreateComment(values: z.infer<typeof CommentSchema>) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unautorized" };
  }

  const validatedValues = CommentSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }
  const { content, postId } = validatedValues.data;
  try {
    await db.comment.create({
      data: {
        content,
        postId,
        userId: session.user.id,
      },
    });
    revalidatePath("/dashboard/community", "layout");
    return { success: "Comment created successfully." };
  } catch {
    return { error: "Failed to create comment." };
  }
}

export async function DeleteComment(commentId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unautorized" };
  }

  const existingComment = await db.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (existingComment?.userId === session.user.id) {
    try {
      await db.comment.delete({
        where: {
          id: commentId,
        },
      });
      revalidatePath("/dashboard/community", "layout");
      return { success: "Comment deleted successfully." };
    } catch {
      return { error: "Failed to delete comment." };
    }
  } else {
    return { error: "Unautorized" };
  }
}

export async function CreateLike(postId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      likes: true,
    },
  });

  if (!post) return { error: "No post is found" };

  const userLikes = post.likes.filter(
    (like) => like.userId === session.user.id
  );
  const likedPost = userLikes.find((p) => p.postId === postId);

  try {
    if (likedPost) {
      await db.like.delete({
        where: {
          id: likedPost.id,
        },
      });
    } else {
      await db.like.create({
        data: {
          postId,
          userId: session.user.id,
        },
      });
    }
    revalidatePath("/dashboard/community", "layout");
  } catch (e) {
    console.error(e);
    return { error: "Failed to update like." };
  }
}

export async function JoinChallenge(challengeId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const userChallenge = await db.userChallenge.findUnique({
    where: {
      userId_challengeId: {
        userId: session.user.id,
        challengeId,
      },
    },
  });

  try {
    if (userChallenge) {
      await db.userChallenge.delete({
        where: {
          id: userChallenge.id,
        },
      });
      revalidatePath("/dashboard/community", "layout");
      return { success: "Unsubscribed from challenge", subscribed: false };
    } else {
      await db.userChallenge.create({
        data: {
          challengeId,
          userId: session.user.id,
        },
      });
      revalidatePath("/dashboard/community", "layout");
      return { success: "Subscribed to challenge", subscribed: true };
    }
  } catch (e) {
    console.error(e);
    return { error: "Failed to join challenge." }; // Corrected spelling and improved message
  }
}

export async function JoinEvent(eventId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const userEvent = await db.userEvent.findUnique({
    where: {
      userId_eventId: {
        userId: session.user.id,
        eventId,
      },
    },
  });

  try {
    if (userEvent) {
      await db.userEvent.delete({
        where: {
          id: userEvent.id,
        },
      });
      revalidatePath("/dashboard/community", "layout");
      return { success: "Unsubscribed from event", subscribed: false };
    } else {
      await db.userEvent.create({
        data: {
          eventId,
          userId: session.user.id,
        },
      });
      revalidatePath("/dashboard/community", "layout");
      return { success: "Subscribed to event", subscribed: true };
    }
  } catch (e) {
    console.error(e);
    return { error: "Failed to join event." };
  }
}
