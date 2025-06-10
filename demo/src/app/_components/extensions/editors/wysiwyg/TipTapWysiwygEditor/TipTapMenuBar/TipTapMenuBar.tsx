import { Button, Stack } from '@mui/material';
import { useCurrentEditor } from '@tiptap/react';
import './styles.css';
export const TipTapMenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <Stack direction={'row'} flexWrap={'wrap'} mb={1} gap={0.5}>
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
        variant='outlined'
        size='small'
        sx={{ textTransform: 'none' }}
      >
        Bold
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
        variant='outlined'
        size='small'
        sx={{ textTransform: 'none' }}
      >
        Italic
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
        variant='outlined'
        size='small'
        sx={{ textTransform: 'none' }}
      >
        Strike
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
        variant='outlined'
        size='small'
        sx={{ textTransform: 'none' }}
      >
        Code
      </Button>
      <Button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        variant='outlined'
        size='small'
        sx={{ textTransform: 'none' }}
      >
        Clear marks
      </Button>
      <Button
        onClick={() => editor.chain().focus().clearNodes().run()}
        variant='outlined'
        size='small'
        sx={{ textTransform: 'none' }}
      >
        Clear nodes
      </Button>
      <Button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
        variant='outlined'
        size='small'
        sx={{ textTransform: 'none' }}
      >
        Paragraph
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        variant='outlined'
        size='small'
        sx={{ textTransform: 'none' }}
      >
        H1
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        variant='outlined'
        size='small'
        sx={{ textTransform: 'none' }}
      >
        H2
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        variant='outlined'
        size='small'
        sx={{ textTransform: 'none' }}
      >
        H3
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
        variant='outlined'
        size='small'
        sx={{ textTransform: 'none' }}
      >
        H4
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
        variant='outlined'
        size='small'
        sx={{ textTransform: 'none' }}
      >
        H5
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
        variant='outlined'
        size='small'
        sx={{ textTransform: 'none' }}
      >
        H6
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
        variant='outlined'
        size='small'
        sx={{ textTransform: 'none' }}
      >
        Bullet list
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
        variant='outlined'
        size='small'
        sx={{ textTransform: 'none' }}
      >
        Ordered list
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
        variant='outlined'
        size='small'
        sx={{ textTransform: 'none' }}
      >
        Code block
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
        variant='outlined'
        size='small'
        sx={{ textTransform: 'none' }}
      >
        Blockquote
      </Button>
      <Button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        variant='outlined'
        size='small'
        sx={{ textTransform: 'none' }}
      >
        Horizontal rule
      </Button>
      <Button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        variant='outlined'
        size='small'
        sx={{ textTransform: 'none' }}
      >
        Hard break
      </Button>
      <Button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        variant='outlined'
        size='small'
        sx={{ textTransform: 'none' }}
      >
        Undo
      </Button>
      <Button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        variant='outlined'
        size='small'
        sx={{ textTransform: 'none' }}
      >
        Redo
      </Button>
      <Button
        onClick={() => editor.chain().focus().setColor('#958DF1').run()}
        className={
          editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''
        }
        variant='outlined'
        size='small'
        sx={{ textTransform: 'none' }}
      >
        Purple
      </Button>
    </Stack>
  );
};
