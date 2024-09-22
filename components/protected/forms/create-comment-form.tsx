"use client";

import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CommentSchema } from ".";
import { Loader2, Send } from "lucide-react";
import { CreateComment } from "@/actions/CommunityActions";
import { Input } from "@/components/ui/input";
import { mutate } from "swr";

interface Props {
  postId: string;
}

export const CommentCreateForm = ({ postId }: Props) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: undefined,
      postId: postId,
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentSchema>) => {
    try {
      setLoading(true);
      const res = await CreateComment(values);
      mutate("/api/posts");
      if (res.error) {
        toast.error(`Error: ${res.error}`);
      } else {
        toast.success("Comment created successfully.");
        form.reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred while creating the comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle>Comments</CardTitle>
          </CardHeader>
          <div className="w-full flex items-center justify-between">
            <CardContent className="flex-1">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="add your comment..."
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex items-center justify-between gap-2 flex-wrap">
              <Button disabled={loading} type="submit">
                {loading ? (
                  <>
                    <Loader2
                      className="mr-2 h-4 w-4 animate-spin"
                      key={`loader-icon`}
                    />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" key={`send-icon`} />
                    Post
                  </>
                )}
              </Button>
            </CardFooter>
          </div>
        </Card>
      </form>
    </Form>
  );
};
