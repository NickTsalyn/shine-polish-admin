import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
};

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl }) => {
  return (
    <Dialog open={isOpen}
    onClose={onClose}
    maxWidth="md"
    fullWidth
    PaperProps={{
      style: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
    }}>
      <DialogContent style={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          padding: 0,
        }}>
          <Image src={imageUrl} alt="Enlarged" width={750} height={750} objectFit="contain" />
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
