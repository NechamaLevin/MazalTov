
import React, { useRef, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  Box,
  Tooltip,
  TextField,
  ClickAwayListener
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker from 'emoji-picker-react';
import emailjs from '@emailjs/browser';

export default function RichEditor({ open, onClose }) {
  const editorRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [subject, setSubject] = useState('');
  const [replyTo, setReplyTo] = useState('');

  const format = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(emoji));
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    editorRef.current.focus();
  };

  const handleSend = () => {
    const content = editorRef.current.innerHTML;

    const templateParams = {
      message: content,
      subject,
      from_name: 'משתמש RichEditor',
      reply_to: replyTo,
    };

    emailjs.send(
  process.env.REACT_APP_EMAILJS_SERVICE_ID,
  process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  templateParams,
  process.env.REACT_APP_EMAILJS_PUBLIC_KEY
)


      .then((result) => {
        console.log('Email sent!', result.text);
        onClose();
      })
      .catch((error) => {
        console.error('Email send error:', error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth dir="rtl">
      <DialogTitle sx={{ m: 0, p: 1.5, fontSize: '1rem', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>
הודעה חדשה        <IconButton onClick={onClose} sx={{ position: 'absolute', left: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, position: 'relative' }}>
        <Box display="flex" flexDirection="column">
          <Box px={2} py={1}>
  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#333' }}>
    דעתכם חשובה לנו!  כל הערה או הארה תתקבל בברכה ❣️
  </div>
</Box>
          {/* שורת כתובת הנמען הוסרה */}
          <TextField
            placeholder="נושא"
            variant="standard"
            fullWidth
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            InputProps={{ disableUnderline: true }}
            sx={{ px: 2, py: 1, borderBottom: '1px solid #eee' }}
          />
          <TextField
            placeholder="כתובת המייל שלכם (במידה ותרצו שנחזור אליכם) "
            variant="standard"
            fullWidth
            value={replyTo}
            onChange={(e) => setReplyTo(e.target.value)}
            InputProps={{ disableUnderline: true }}
            sx={{ px: 2, py: 1, borderBottom: '1px solid #eee' }}
          />

          <div
            ref={editorRef}
            contentEditable
            style={{
              minHeight: 250,
              padding: '1rem',
              fontSize: '15px',
              fontFamily: 'sans-serif',
              outline: 'none',
              direction: 'rtl',
              textAlign: 'right',
            }}
          />

          {showEmojiPicker && (
            <ClickAwayListener onClickAway={() => setShowEmojiPicker(false)}>
              <Box
                position="absolute"
                bottom="70px"
                left="20px"
                zIndex={10}
                bgcolor="white"
                boxShadow={3}
                borderRadius={2}
              >
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </Box>
            </ClickAwayListener>
          )}

          <Box display="flex" alignItems="center" justifyContent="space-between" px={1.5} py={1} sx={{ borderTop: '1px solid #ddd' }}>
            <Box display="flex" gap={1}>
              <Tooltip title="מודגש"><IconButton onClick={() => format('bold')}><FormatBoldIcon /></IconButton></Tooltip>
              <Tooltip title="נטוי"><IconButton onClick={() => format('italic')}><FormatItalicIcon /></IconButton></Tooltip>
              <Tooltip title="קו תחתי"><IconButton onClick={() => format('underline')}><FormatUnderlinedIcon /></IconButton></Tooltip>
              <Tooltip title="ציטוט"><IconButton onClick={() => format('formatBlock', 'blockquote')}><FormatQuoteIcon /></IconButton></Tooltip>
              <Tooltip title="רשימה"><IconButton onClick={() => format('insertUnorderedList')}><FormatListBulletedIcon /></IconButton></Tooltip>
              <Tooltip title="רשימה ממוספרת"><IconButton onClick={() => format('insertOrderedList')}><FormatListNumberedIcon /></IconButton></Tooltip>
              <Tooltip title="יישור לימין"><IconButton onClick={() => format('justifyRight')}><FormatAlignRightIcon /></IconButton></Tooltip>
              <Tooltip title="הוספת קישור"><IconButton><InsertLinkIcon /></IconButton></Tooltip>
              <Tooltip title="צרף קובץ"><IconButton><AttachFileIcon /></IconButton></Tooltip>
              <Tooltip title="אימוג'ים">
                <IconButton onClick={() => setShowEmojiPicker(prev => !prev)}>
                  <EmojiEmotionsIcon color={showEmojiPicker ? 'primary' : 'inherit'} />
                </IconButton>
              </Tooltip>
            </Box>

            <Button variant="contained" sx={{ bgcolor: '#1a73e8', borderRadius: '24px', px: 3 }} onClick={handleSend}>
              שליחה
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
