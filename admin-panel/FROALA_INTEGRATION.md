# Froala Editor Integration

## Overview

The BlogForm component now uses Froala Editor for rich text editing, providing a comprehensive WYSIWYG editor for creating and editing blog content.

## Features

- **Rich Text Formatting**: Bold, italic, underline, strikethrough, colors, fonts, and sizes
- **Lists and Alignment**: Ordered/unordered lists, text alignment options
- **Media Support**: Image upload, video embedding, tables
- **Responsive Design**: Optimized toolbar for mobile devices
- **Character Counter**: Track content length with a 10,000 character limit
- **Undo/Redo**: Full editing history support
- **HTML View**: Switch to HTML source code view
- **Quick Insert**: Fast insertion of common elements

## Toolbar Features

### Text Formatting

- Bold, Italic, Underline, Strikethrough
- Subscript, Superscript
- **Enhanced Font Family Selection**: 12 professional fonts including Arial, Georgia, Times New Roman, Trebuchet MS, Palatino, Impact, and more
- **Comprehensive Font Size Options**: 29 size options from 8px to 96px for precise typography control
- **Advanced Text Colors**: Extensive color palette with 48 text colors
- **Background Colors**: 32 background color options for highlighting
- **Custom Text Styles**: Pre-defined inline styles (Big Red, Small Blue, Bold Green, Italic Purple)
- **Special Text Effects**: Highlight classes (Yellow, Blue, Green), Text Shadow, Bordered Text, Gradient Text
- Clear formatting

### Paragraph Formatting

- Text alignment (Left, Center, Right, Justify)
- Ordered and Unordered lists
- **Enhanced Paragraph Formats**: Normal, H1-H6, Code Block, Quote
- **Custom Paragraph Styles**: Gray Text, Bordered Text, Spaced Text, Uppercase Text
- **Advanced Line Height Control**: 9 line height options from 1.0 to 3.0
- Indent/Outdent
- Blockquotes

### Rich Content

- Link insertion and editing
- Image upload with drag-and-drop support
- Video embedding
- Table creation and editing
- Special characters and emoticons
- Horizontal rules

### Utilities

- Undo/Redo
- Fullscreen editing
- Print functionality
- Spell checker
- HTML source view
- Help documentation

## Image Upload

- **Featured Image Upload**:

  - Drag-and-drop interface for easy file uploads
  - Click-to-browse traditional file selection
  - Real-time image preview before uploading
  - Support for JPEG, JPG, PNG, GIF, and WebP formats
  - Maximum file size: 5MB
  - Alternative URL input for external images
  - Image validation and error handling
  - Upload progress feedback

- **Content Images**:
  - Automatic upload via Froala Editor to `/api/upload` endpoint
  - Drag-and-drop support within the editor
  - Multiple image format support
  - Error handling for failed uploads

## Mobile Responsiveness

The editor is optimized for mobile devices with:

- Simplified toolbar for small screens
- Touch-friendly interface
- Responsive image handling
- Optimized quick insert buttons

## Configuration

The editor can be customized through the `config` prop in the FroalaEditorComponent. Current settings include:

- Character counting and limits
- Custom toolbar buttons
- Image upload settings
- Event handlers for uploads and content changes
- Responsive toolbar configurations

## Preview Mode

The preview functionality renders the rich HTML content with proper styling, including:

- Typography hierarchy
- List formatting
- Image responsiveness
- Table styling
- Blockquote formatting

## API Endpoint

A basic image upload API is available at `/api/upload` that accepts form data and returns image URLs. This can be extended to integrate with cloud storage services like AWS S3, Cloudinary, or similar.

## Future Enhancements

- Integration with cloud storage for image uploads
- Video upload functionality
- Document/file upload support
- Custom plugins for specialized content
- Real-time collaborative editing
- Auto-save functionality
