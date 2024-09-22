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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ButtonMultiFileUpload } from "@/components/file-upload";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PostSchema } from ".";
import { Loader2, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { CreatePost } from "@/actions/CommunityActions";
import { mutate } from "swr";

export const PostCreateForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      content: undefined,
      images: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof PostSchema>) => {
    try {
      setLoading(true);
      const res = await CreatePost(values);
      mutate("/api/posts");
      if (res.error) {
        toast.error(`Error: ${res.error}`);
      } else {
        toast.success("Post created successfully.");
        form.reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred while creating the post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle>Create a New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your thoughts</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your thoughts, progress, or achievements..."
                      disabled={loading}
                      className="min-h-[100px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex items-center justify-between gap-2 flex-wrap">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ButtonMultiFileUpload
                      endPoint="imageUploader"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit">
              {loading ? (
                <div className="flex items-center">
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin"
                    key={`loader-icon`}
                  />
                  Posting...
                </div>
              ) : (
                <div className="flex items-center">
                  <Send className="mr-2 h-4 w-4" key={`send-icon`} />
                  Post
                </div>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
