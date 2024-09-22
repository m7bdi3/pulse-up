import { cn, UploadButton, UploadDropzone } from "@/lib/utils";
import { ImageUpIcon, Loader2Icon, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface Props {
  onChange: (url?: string) => void;
  value: string;
  endPoint: "oneImage";
}

interface MultiProps {
  onChange: (urls: string[]) => void;
  value: string[];
  endPoint: "imageUploader";
}
export const FileUpload = ({ onChange, value, endPoint }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
      <UploadDropzone
        endpoint={endPoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        config={{
          mode: "auto",
        }}
        onUploadError={(error) => {
          toast.error(error?.message);
        }}
        appearance={{
          uploadIcon: "text-primary",
          label:
            "w-fit text-sm hover:text-accent text-forground focus:text-primary transition-all m-0",
          allowedContent: "text-muted-forground",
        }}
        className="mt-4 ut-button:bg-primary ut-button:ut-readying:bg-muted w-full"
      />
      {value && (
        <div className="relative w-full flex h-[100px]">
          <Image
            width={200}
            height={100}
            src={value}
            alt="Upload"
            className="rounded-md object-cover flex-1"
          />
          <button
            onClick={() => onChange("")}
            className="bg-destructive text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
            type="button"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export const MultiFileUpload = ({ onChange, value, endPoint }: MultiProps) => {
  const handleUploadComplete = (res: { url: string }[]) => {
    const newUrls = res.map((file) => file.url);
    onChange([...value, ...newUrls]);
  };

  const handleRemoveImage = (url: string) => {
    const updatedImages = value.filter((imageUrl) => imageUrl !== url);
    onChange(updatedImages);
  };
  return (
    <div className="flex flex-col items-center justify-center w-full py-2 h-fit gap-4 border rounded-md space-y-0 last:px-2">
      <UploadDropzone
        endpoint={endPoint}
        onClientUploadComplete={handleUploadComplete}
        config={{
          mode: "auto",
        }}
        onUploadError={(error) => {
          toast.error(error?.message);
        }}
        appearance={{
          uploadIcon: "text-primary",
          label: "w-fit text-sm text-forground transition-all m-0",
          allowedContent: "text-muted-forground",
          container: "flex flex-col w-fit h-fit p-0 border-none px-4 ",
        }}
        className="ut-button:bg-primary ut-button:ut-readying:bg-muted m-0"
      />
      <ScrollArea
        className={cn(
          "grid-flow-col gap-4 mt-4 bg-muted whitespace-nowrap rounded-md border",
          value.length === 0 ? "hidden" : "grid"
        )}
      >
        <div className="flex space-x-4 w-max p-2">
          {value.map((url, index) => (
            <div className="relative h-fit w-fit" key={index}>
              <Image
                width={100}
                height={50}
                src={url}
                alt="Upload"
                className="rounded-md"
              />
              <button
                onClick={() => {
                  handleRemoveImage(url);
                }}
                className="bg-destructive text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export const ButtonUpload = ({ onChange, endPoint }: Props) => {
  return (
    <>
      <UploadButton
        endpoint={endPoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        config={{
          mode: "auto",
        }}
        onUploadError={(error) => {
          toast.error(error?.message);
        }}
        appearance={{
          allowedContent: "hidden",
        }}
        content={{
          button({ ready, uploadProgress, isUploading }) {
            if (ready)
              return (
                <Button
                  size={"icon"}
                  className="flex items-center gap-2 w-full px-4"
                >
                  <ImageUpIcon className="h-4 w-4" />
                  Choose file
                </Button>
              );
            if (isUploading)
              return <Loader2Icon className="h-4 w-4 animate-spin" />;
            if (uploadProgress)
              return <Loader2Icon className="h-4 w-4 animate-spin" />;
          },
        }}
      />
    </>
  );
};

export const ButtonMultiFileUpload = ({
  onChange,
  value,
  endPoint,
}: MultiProps) => {
  const handleUploadComplete = (res: { url: string }[]) => {
    const newUrls = res.map((file) => file.url);
    onChange([...value, ...newUrls]);
    toast.success("Files uploaded successfully!");
  };
  return (
    <div className="flex items-center justify-center w-full py-2 h-fit gap-4">
      <UploadButton
        endpoint={endPoint}
        onClientUploadComplete={handleUploadComplete}
        config={{
          mode: "auto",
        }}
        onUploadError={(error) => {
          toast.error(error?.message);
        }}
        appearance={{
          allowedContent: "hidden",
        }}
        content={{
          button({ ready, uploadProgress, isUploading }) {
            if (ready)
              return (
                <Badge className="flex items-center p-2">
                  <ImageUpIcon className="h-4 w-4" />
                </Badge>
              );
            if (isUploading)
              return <Loader2Icon className="h-4 w-4 animate-spin" />;
            if (uploadProgress)
              return <Loader2Icon className="h-4 w-4 animate-spin" />;
          },
        }}
      />
      <ScrollArea
        className={cn(
          "grid-flow-col gap-4 mt-4 bg-muted whitespace-nowrap rounded-md border",
          value.length === 0 ? "hidden" : "grid"
        )}
      >
        <div className="flex space-x-4 w-max p-2">
          {value.map((url, index) => (
            <div className="relative h-fit w-fit" key={index}>
              <Image
                width={100}
                height={50}
                src={url}
                alt="Upload"
                className="rounded-md"
              />
              <button
                onClick={() => {
                  const updatedImages = value.filter(
                    (imageUrl) => imageUrl !== url
                  );
                  onChange(updatedImages);
                }}
                className="bg-destructive text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                type="button"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove image</span>
              </button>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
