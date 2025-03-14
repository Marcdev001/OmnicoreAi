"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, Loader2 } from "lucide-react"

interface FileUploadProps {
  onUpload: (files: File[]) => void
  isLoading?: boolean
}

export function FileUpload({ onUpload, isLoading }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles)
  }, [onUpload])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/plain': ['.txt'],
      'application/xml': ['.xml'],
      'text/xml': ['.xml'],
    },
    multiple: true
  })

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8 transition-colors duration-200 ease-in-out
        ${dragActive ? 'border-[#30D5C8] bg-[#30D5C8]/5' : 'border-[#30D5C8]/20'}
        ${isLoading ? 'pointer-events-none opacity-60' : 'cursor-pointer hover:border-[#30D5C8]/50'}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center text-center">
        {isLoading ? (
          <Loader2 className="h-10 w-10 text-[#30D5C8] animate-spin" />
        ) : (
          <Upload className="h-10 w-10 text-[#30D5C8]" />
        )}
        <p className="mt-4 text-sm text-foreground/70">
          Drag & drop your data files here, or click to select files
        </p>
        <p className="mt-2 text-xs text-foreground/50">
          Supports CSV, JSON, Excel, TXT, and XML files
        </p>
      </div>
    </div>
  )
}
