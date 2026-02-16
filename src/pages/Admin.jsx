import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HalftoneBackground from "@/components/HalftoneBackground";
import DraggableWindow from "@/components/DraggableWindow";
import { adminService } from "@/services/adminService";

const CATEGORIES = [
  { value: "", label: "None" },
  { value: "insects", label: "Insects" },
  { value: "flowers", label: "Flowers" },
  { value: "water_drops", label: "Water Drops" },
  { value: "textures", label: "Textures" },
  { value: "fungi", label: "Fungi" },
  { value: "crystals", label: "Crystals" },
];

const MONTHS = [
  { value: "", label: "Not specified" },
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export default function Admin() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const fileInputRef = useRef(null);

  // Check authentication on mount
  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subject: "",
    magnification: "",
    featured: false,
    sort_order: "",
    date_taken_month: "",
    date_taken_year: "",
    file_size_mb: 0,
    megapixels: 0
  });

  // Optimize image: resize to max 2500px and convert to WebP
  const optimizeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      img.onload = () => {
        // Store original dimensions for megapixel calculation
        const originalWidth = img.width;
        const originalHeight = img.height;
        const megapixels = ((originalWidth * originalHeight) / 1000000).toFixed(1);

        // Calculate new dimensions (max 2500px on longest side)
        let width = img.width;
        let height = img.height;
        const maxDimension = 2500;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height / width) * maxDimension;
            width = maxDimension;
          } else {
            width = (width / height) * maxDimension;
            height = maxDimension;
          }
        }

        // Create canvas and draw resized image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP at 85% quality
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Create a new File object with .webp extension
              const optimizedFile = new File(
                [blob],
                file.name.replace(/\.[^.]+$/, '.webp'),
                { type: 'image/webp' }
              );
              resolve({
                file: optimizedFile,
                originalWidth,
                originalHeight,
                megapixels
              });
            } else {
              reject(new Error('Failed to optimize image'));
            }
          },
          'image/webp',
          0.85
        );
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      reader.readAsDataURL(file);
    });
  };

  // Check if file is a JXL format (can't be decoded by canvas)
  const isJxlFile = (file) => {
    return file.name.toLowerCase().endsWith('.jxl') || file.type === 'image/jxl';
  };

  // Handle file selection
  const handleFileSelect = async (selectedFile) => {
    const isImage = selectedFile && (selectedFile.type.startsWith('image/') || isJxlFile(selectedFile));

    if (isImage) {
      try {
        // JXL files: skip canvas optimization (browser can't decode them)
        // Upload raw — JXL is already very efficient compression
        if (isJxlFile(selectedFile)) {
          setFile(selectedFile);
          const fileSizeMB = (selectedFile.size / 1024 / 1024).toFixed(2);
          setFormData(prev => ({
            ...prev,
            file_size_mb: parseFloat(fileSizeMB),
            megapixels: 0
          }));

          // JXL preview won't work in most browsers, show placeholder
          setPreview(null);
          setMessage({
            type: "success",
            text: `JXL file selected: ${fileSizeMB}MB (uploaded as-is, Sanity CDN will serve WebP fallback)`
          });
          return;
        }

        setMessage({ type: "", text: "Optimizing image..." });

        // Standard images: optimize to WebP
        const result = await optimizeImage(selectedFile);
        setFile(result.file);

        // Update form data with file size and megapixels
        const fileSizeMB = (result.file.size / 1024 / 1024).toFixed(2);
        setFormData(prev => ({
          ...prev,
          file_size_mb: parseFloat(fileSizeMB),
          megapixels: parseFloat(result.megapixels)
        }));

        // Create preview from optimized file
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(result.file);

        // Show optimization success
        const originalSize = (selectedFile.size / 1024 / 1024).toFixed(2);
        const optimizedSize = fileSizeMB;
        setMessage({
          type: "success",
          text: `Image optimized: ${originalSize}MB → ${optimizedSize}MB (WebP, ${result.originalWidth}×${result.originalHeight}, ${result.megapixels}MP)`
        });
      } catch (error) {
        setMessage({ type: "error", text: `Optimization failed: ${error.message}` });
      }
    } else {
      setMessage({ type: "error", text: "Please select a valid image file" });
    }
  };

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    navigate("/login");
  };

  // Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage({ type: "error", text: "Please select an image" });
      return;
    }

    if (!formData.title) {
      setMessage({ type: "error", text: "Please enter a title" });
      return;
    }

    setUploading(true);
    setMessage({ type: "", text: "" });

    try {
      // Get next sort order if not provided
      const sortOrder = formData.sort_order || await adminService.getNextSortOrder();

      // Upload photo
      await adminService.uploadPhoto(file, {
        ...formData,
        sort_order: parseInt(sortOrder)
      });

      setMessage({ type: "success", text: "Photo uploaded successfully!" });

      // Reset form
      setFile(null);
      setPreview(null);
      setFormData({
        title: "",
        category: "",
        subject: "",
        magnification: "",
        featured: false,
        sort_order: "",
        date_taken_month: "",
        date_taken_year: "",
        file_size_mb: 0,
        megapixels: 0
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setMessage({ type: "error", text: `Upload failed: ${error.message}` });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative bg-background min-h-screen px-4 py-12">
      <HalftoneBackground />
      <div className="relative z-10 max-w-4xl mx-auto">
        <DraggableWindow>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-border bg-background"
          >
            {/* Terminal header */}
            <div className="window-titlebar bg-background border-b border-border px-4 py-2 cursor-grab active:cursor-grabbing flex justify-between items-center">
              <span className="text-sm text-primary">ADMIN.EXE - PHOTO UPLOAD</span>
              <button
                onClick={handleLogout}
                className="text-xs px-3 py-1 border border-muted-foreground text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                LOGOUT
              </button>
            </div>

            {/* Content */}
            <div className="bg-background p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Upload Area */}
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">IMAGE FILE</label>
                  <div
                    className={`border-2 border-dashed p-8 text-center transition-colors ${
                      isDragging
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {(preview || file) ? (
                      <div className="space-y-4">
                        {preview ? (
                          <img src={preview} alt="Preview" className="max-h-48 mx-auto border border-border" />
                        ) : (
                          <div className="border border-border p-6 text-center">
                            <p className="text-primary text-sm">{file?.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">JXL preview not available in this browser</p>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setFile(null);
                            setPreview(null);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                          className="text-sm text-primary hover:text-accent transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-foreground">Drop image here or click to browse</p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*,.jxl"
                          onChange={(e) => handleFileSelect(e.target.files[0])}
                          className="hidden"
                          id="file-input"
                        />
                        <label
                          htmlFor="file-input"
                          className="inline-block px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-background transition-colors cursor-pointer text-sm"
                        >
                          SELECT FILE
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">TITLE *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-background border border-border px-4 py-2 text-foreground focus:border-primary focus:outline-none"
                    placeholder="Enter photo title"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">CATEGORY</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-background border border-border px-4 py-2 text-foreground focus:border-primary focus:outline-none"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                {/* Two column layout for subject and magnification */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">SUBJECT</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-background border border-border px-4 py-2 text-foreground focus:border-primary focus:outline-none"
                      placeholder="e.g., Butterfly wing"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">MAGNIFICATION</label>
                    <input
                      type="text"
                      value={formData.magnification}
                      onChange={(e) => setFormData({ ...formData, magnification: e.target.value })}
                      className="w-full bg-background border border-border px-4 py-2 text-foreground focus:border-primary focus:outline-none"
                      placeholder="e.g., 5x"
                    />
                  </div>
                </div>

                {/* Date taken (month and year) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">MONTH TAKEN</label>
                    <select
                      value={formData.date_taken_month}
                      onChange={(e) => setFormData({ ...formData, date_taken_month: e.target.value })}
                      className="w-full bg-background border border-border px-4 py-2 text-foreground focus:border-primary focus:outline-none"
                    >
                      {MONTHS.map(month => (
                        <option key={month.value} value={month.value}>{month.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">YEAR TAKEN</label>
                    <input
                      type="number"
                      value={formData.date_taken_year}
                      onChange={(e) => setFormData({ ...formData, date_taken_year: e.target.value })}
                      className="w-full bg-background border border-border px-4 py-2 text-foreground focus:border-primary focus:outline-none"
                      placeholder="e.g., 2024"
                      min="1900"
                      max="2100"
                    />
                  </div>
                </div>

                {/* Auto-captured info (read-only display) */}
                {(formData.file_size_mb > 0 || formData.megapixels > 0) && (
                  <div className="border border-border p-4 bg-muted/20">
                    <p className="text-xs text-muted-foreground mb-2">AUTO-CAPTURED INFO</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">File Size: </span>
                        <span className="text-primary">{formData.file_size_mb} MB</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Megapixels: </span>
                        <span className="text-primary">{formData.megapixels} MP</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sort Order and Featured */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">SORT ORDER</label>
                    <input
                      type="number"
                      value={formData.sort_order}
                      onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
                      className="w-full bg-background border border-border px-4 py-2 text-foreground focus:border-primary focus:outline-none"
                      placeholder="Auto-assigned if empty"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 border border-border bg-background checked:bg-primary"
                      />
                      <span className="text-sm text-foreground">Featured on homepage</span>
                    </label>
                  </div>
                </div>

                {/* Message */}
                {message.text && (
                  <div className={`border px-4 py-2 text-sm ${
                    message.type === "error"
                      ? "border-destructive text-destructive"
                      : "border-primary text-primary"
                  }`}>
                    {message.text}
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-6 py-3 bg-background text-primary border border-primary hover:bg-primary hover:text-background transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? "UPLOADING..." : "UPLOAD PHOTO"}
                  </button>
                </div>
              </form>
            </div>

            {/* Terminal footer */}
            <div className="bg-background border-t border-border px-4 py-1.5 text-xs text-muted-foreground">
              {uploading ? "PROCESSING..." : "READY"}
            </div>
          </motion.div>
        </DraggableWindow>
      </div>
    </div>
  );
}
