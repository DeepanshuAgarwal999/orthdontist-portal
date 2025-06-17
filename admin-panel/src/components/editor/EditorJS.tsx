'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
// @ts-ignore
import EditorJS from '@editorjs/editorjs';

// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Paragraph from '@editorjs/paragraph';
// @ts-ignore
import ImageTool from '@editorjs/image';
// @ts-ignore
import Quote from '@editorjs/quote';
// @ts-ignore
import Delimiter from '@editorjs/delimiter';
// @ts-ignore
import Table from '@editorjs/table';
// @ts-ignore
import CodeTool from '@editorjs/code';
// @ts-ignore
import LinkTool from '@editorjs/link';
// @ts-ignore
import Marker from '@editorjs/marker';
// @ts-ignore
import InlineCode from '@editorjs/inline-code';
// @ts-ignore
import Underline from '@editorjs/underline';

interface OutputData {
    time: number;
    blocks: any[];
    version: string;
}

interface EditorJSProps {
    data?: OutputData;
    onChange?: (data: OutputData) => void;
    placeholder?: string;
    readOnly?: boolean;
}

export interface EditorJSRef {
    save: () => Promise<OutputData>;
    clear: () => void;
}

const EditorJSComponent = forwardRef<EditorJSRef, EditorJSProps>(({ data, onChange, placeholder = "Let's write an awesome story!", readOnly = false }, ref) => {
    const editorRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInitialized = useRef(false);

    useImperativeHandle(ref, () => ({
        save: async () => {
            if (editorRef.current) {
                return await editorRef.current.save();
            }
            return { time: Date.now(), blocks: [], version: '2.28.2' };
        },
        clear: () => {
            if (editorRef.current) {
                editorRef.current.clear();
            }
        },
    })); useEffect(() => {
        if (!containerRef.current || editorRef.current || isInitialized.current) return;

        isInitialized.current = true;

        const editor = new EditorJS({
            holder: containerRef.current,
            placeholder,
            readOnly,
            data: data || {
                time: Date.now(),
                blocks: [],
                version: '2.28.2',
            },
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: ['marker', 'link'],
                    config: {
                        placeholder: 'Enter a header',
                        levels: [1, 2, 3, 4, 5, 6],
                        defaultLevel: 2,
                    },
                },
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                    config: {
                        placeholder: 'Tell your story...',
                    },
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered',
                    },
                },
                image: {
                    class: ImageTool,
                    config: {
                        endpoints: {
                            byFile: '/api/upload', // Your upload endpoint
                        },
                        field: 'file',
                        types: 'image/*',
                        captionPlaceholder: 'Enter image caption',
                        buttonContent: 'Select an Image',
                        uploader: {
                            uploadByFile: async (file: File) => {
                                const formData = new FormData();
                                formData.append('file', file);

                                try {
                                    const response = await fetch('/api/upload', {
                                        method: 'POST',
                                        body: formData,
                                    });

                                    if (!response.ok) {
                                        throw new Error('Upload failed');
                                    }

                                    const result = await response.json();
                                    return {
                                        success: 1,
                                        file: {
                                            url: result.link,
                                        },
                                    };
                                } catch (error) {
                                    return {
                                        success: 0,
                                        error: 'Upload failed',
                                    };
                                }
                            },
                        },
                    },
                },
                quote: {
                    class: Quote,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+O',
                    config: {
                        quotePlaceholder: 'Enter a quote',
                        captionPlaceholder: 'Quote\'s author',
                    },
                },
                delimiter: Delimiter,
                table: {
                    class: Table,
                    inlineToolbar: true,
                    config: {
                        rows: 2,
                        cols: 3,
                    },
                },
                code: {
                    class: CodeTool,
                    config: {
                        placeholder: 'Enter code',
                    },
                },
                linkTool: {
                    class: LinkTool,
                    config: {
                        endpoint: '/api/link-preview', // Optional: for link previews
                    },
                },
                marker: {
                    class: Marker,
                    shortcut: 'CMD+SHIFT+M',
                },
                inlineCode: {
                    class: InlineCode,
                    shortcut: 'CMD+SHIFT+M',
                },
                underline: Underline,
            },
            onChange: async () => {
                if (onChange && editorRef.current) {
                    try {
                        const outputData = await editorRef.current.save();
                        onChange(outputData);
                    } catch (error) {
                        console.log('Saving failed: ', error);
                    }
                }
            },
            minHeight: 300,
        });

        editorRef.current = editor; return () => {
            if (editorRef.current && editorRef.current.destroy) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
            isInitialized.current = false;
        };
    }, []);

    return (
        <div className="editor-js-container">
            <div
                ref={containerRef}
                className="min-h-[300px] border border-gray-300 rounded-md p-4 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent"
            />
        </div>
    );
}
);

EditorJSComponent.displayName = 'EditorJSComponent';

export default EditorJSComponent;
