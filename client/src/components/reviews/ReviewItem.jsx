// client/src/components/reviews/ReviewItem.jsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Avatar, Box, Button, Paper, Rating, Stack, Typography } from '@mui/material';
import { useAuth } from '@/contexts/useAuth';
import api from '@/lib/api';
import { notifySuccess, notifyError } from '@/lib/notify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toApiAsset, resolveProfileImagePath } from '@/lib/url';
import { colorFromString, initialFromName } from '@/lib/avatar';
import CreateReviewForm from './CreateReviewForm';

export default function ReviewItem({ review, onReviewDeleted, onReviewUpdated, editFormRef }) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  // Scroll to edit form when entering edit mode
  useEffect(() => {
    if (isEditing && editFormRef?.current) {
      setTimeout(() => {
        editFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }
  }, [isEditing, editFormRef]);
  const [openDelete, setOpenDelete] = useState(false);

  const isOwner = user && user.id === review.User.id;

  const scrollToAppBar = () => {
    const headerEl = document.querySelector('header');
    const safeOffset = headerEl?.offsetTop || 0;
    window.scrollTo({ top: Math.max(0, safeOffset), behavior: 'smooth' });
  };

  const queryClient = useQueryClient()
  const delMutation = useMutation({
    mutationFn: async () => api.delete(`/review/${review.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', review.bookId] })
      queryClient.invalidateQueries({ queryKey: ['book', String(review.bookId)] })
      if (onReviewDeleted) onReviewDeleted(review.id)
      notifySuccess('ลบรีวิวแล้ว')
    },
    onError: (err) => {
      const msg = err?.response?.data?.message || 'ไม่สามารถลบรีวิวได้'
      notifyError(msg)
      alert(msg)
    },
  })

  const handleDelete = () => {
    setOpenDelete(true);
  };

  const handleDeleteConfirm = () => {
    setOpenDelete(false);
    delMutation.mutate();
  };

  const handleDeleteCancel = () => {
    setOpenDelete(false);
  };

  const handleUpdateSuccess = () => {
    setIsEditing(false);
    setTimeout(scrollToAppBar, 200);
    if (onReviewUpdated) {
      onReviewUpdated();
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTimeout(scrollToAppBar, 200);
  };

  const name = review.User.displayName || review.User.username || 'User'
  const resolved = resolveProfileImagePath(review.User.profileImage)
  const avatarSrc = resolved ? toApiAsset(resolved) : undefined
  const avatarBg = colorFromString(review.User.id || name)
  const initial = initialFromName(review.User.displayName, review.User.username)

  return (
    <Paper sx={{ p: 2, mb: 2, borderRadius: 2, borderColor: 'divider', bgcolor: 'background.paper' }} variant="outlined" elevation={0}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar alt={name} src={avatarSrc} imgProps={{ referrerPolicy: 'no-referrer' }} sx={{ bgcolor: avatarBg }}>
            {initial}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">{name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(review.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>
          </Box>
        </Stack>

        {isEditing ? (
          <>
            <div ref={editFormRef} />
            <CreateReviewForm
              bookId={review.bookId}
              existingReview={review}
              onReviewSubmitted={handleUpdateSuccess}
            />
            <Stack direction="row" justifyContent="flex-end">
              <Button size="small" onClick={handleCancelEdit}>ยกเลิก</Button>
            </Stack>
          </>
        ) : (
          <>
            <Rating value={review.rating} readOnly />
            <Typography sx={{ whiteSpace: 'pre-wrap' }}>{review.content}</Typography>
          </>
        )}

        {isOwner && !isEditing && (
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button size="small" onClick={() => setIsEditing(true)}>แก้ไข</Button>
            <Button size="small" color="error" onClick={handleDelete}>ลบ</Button>
            <Dialog
              open={openDelete}
              onClose={handleDeleteCancel}
              disableScrollLock={true}
              PaperProps={{
                sx: {
                  m: 0,
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  minWidth: 320,
                }
              }}
            >
              <DialogTitle>ยืนยันการลบรีวิว</DialogTitle>
              <DialogContent sx={{ overflow: 'visible', minWidth: 320, p: 2 }}>
                <DialogContentText>
                  คุณแน่ใจหรือไม่ว่าต้องการลบรีวิวนี้? การลบจะไม่สามารถย้อนกลับได้
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteCancel} color="inherit">ยกเลิก</Button>
                <Button onClick={handleDeleteConfirm} color="error" variant="contained" autoFocus>ลบ</Button>
              </DialogActions>
            </Dialog>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
