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
  ClickAwayListener,
  Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RichEditor({ open, onClose }) {
  const editorRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [subject, setSubject] = useState('');
  const [replyTo, setReplyTo] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [replyToError, setReplyToError] = useState(false);



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
  if (!replyTo.trim()) {
    setReplyToError(true);
    return;
  }

  setReplyToError(false); // אם לא ריק - אין שגיאה
  setIsSending(true);
  const content = editorRef.current.innerHTML;

  const templateParams = {
    message: content,
    subject,
    from_name: 'משתמש RichEditor',
    reply_to: replyTo,
  };

  emailjs
    .send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      templateParams,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
      console.log('Email sent!', result.text);
      setShowSuccess(true);
      onClose();
    })
    .catch((error) => {
      console.error('Email send error:', error);
      setShowError(true);
    })
    .finally(() => {
      setIsSending(false);
    });
};


  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth dir="rtl">
        <DialogTitle sx={{ m: 0, p: 1.5, fontSize: '1rem', fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>
          הודעה חדשה
          <IconButton onClick={onClose} sx={{ position: 'absolute', left: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <Box display="flex" flexDirection="column">
            <Box px={2} py={1}>
              <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#333' }}>
                דעתכם חשובה לנו! כל הערה או הארה תתקבל בברכה ❣️
              </div>
            </Box>

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
  placeholder="כתובת המייל שלכם"
  variant="standard"
  fullWidth
  value={replyTo}
  onChange={(e) => setReplyTo(e.target.value)}
  error={replyToError}
  helperText={replyToError ? 'כתובת מייל היא שדה חובה' : ''}
  FormHelperTextProps={{
    sx: {
      color: '#d32f2f',
      fontWeight: 'bold',
      textAlign: 'right',
      direction: 'rtl',
      fontSize: '0.9rem',
      mt: 0.5
    }
  }}
  InputProps={{ disableUnderline: true }}
  sx={{
    px: 2,
    py: 1,
    borderBottom: '1px solid #eee',
    direction: 'rtl',
    textAlign: 'right'
  }}
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

           <Button
  variant="contained"
 sx={{
  bgcolor: isSending ? 'rgba(26, 115, 232, 0.5)' : '#1a73e8',
  borderRadius: '24px',
  px: 3,
  color: 'white',
  pointerEvents: isSending ? 'none' : 'auto',
  transition: 'background-color 0.3s'
}}
  disabled={isSending}
  onClick={handleSend}
>
  {isSending ? 'שולח' : 'שליחה'}
</Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

     <Snackbar
  open={showSuccess}
  autoHideDuration={3000} // 3 שניות
  onClose={() => setShowSuccess(false)}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
>
  <Alert
    onClose={() => setShowSuccess(false)}
    severity="success"
    sx={{
      width: '100%',
      bgcolor: '#e6f4ea',
      color: '#137333',
      fontWeight: 'bold',
      fontSize: '1rem',
      border: '1px solid #a8dab5'
    }}
  >
ההודעה נשלחה בהצלחה תודה רבה ובשמחות  </Alert>
</Snackbar>


      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowError(false)} severity="error" sx={{ width: '100%' }}>
          אירעה שגיאה בשליחת ההודעה. אנא נסו שוב.
        </Alert>
      </Snackbar>
    </>
  );
}
