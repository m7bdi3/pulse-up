"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
interface Props {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  classname?: string;
  children?: React.ReactNode;
}

export const Modal = ({
  title,
  description,
  isOpen,
  onClose,
  classname,
  children,
}: Props) => {
  const isMediumDevice = useMediaQuery("(min-width: 768px)");

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const ModalContent = () => (
    <div>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <div>{children}</div>
    </div>
  );

  const DrawerModalContent = () => (
    <div>
      <DrawerHeader>
        <DrawerTitle>{title}</DrawerTitle>
        <DrawerDescription>{description}</DrawerDescription>
      </DrawerHeader>
      <div className="p-4">{children}</div>
    </div>
  );

  return (
    <>
      {isMediumDevice ? (
        <Dialog open={isOpen} onOpenChange={onChange}>
          <DialogContent className={classname}>
            <ModalContent />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isOpen} onOpenChange={onChange}>
          <DrawerContent className={classname}>
            <DrawerModalContent />
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
