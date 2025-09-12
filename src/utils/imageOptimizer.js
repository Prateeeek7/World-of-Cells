// Image optimization utilities
export class ImageOptimizer {
  constructor() {
    this.supportedFormats = ['webp', 'avif'];
    this.fallbackFormats = ['jpeg', 'png', 'jpg'];
  }

  // Generate responsive image sources
  generateResponsiveSources(basePath, altText, sizes = ['320', '640', '1024', '1920']) {
    const sources = [];
    
    // Generate WebP sources
    if (this.supportsWebP()) {
      sizes.forEach(size => {
        sources.push({
          src: this.generateOptimizedPath(basePath, 'webp', size),
          type: 'image/webp',
          media: this.getMediaQuery(size),
          alt: altText
        });
      });
    }

    // Generate AVIF sources (best compression)
    if (this.supportsAVIF()) {
      sizes.forEach(size => {
        sources.push({
          src: this.generateOptimizedPath(basePath, 'avif', size),
          type: 'image/avif',
          media: this.getMediaQuery(size),
          alt: altText
        });
      });
    }

    return sources;
  }

  // Generate fallback image
  generateFallback(basePath, altText) {
    return {
      src: basePath,
      alt: altText,
      loading: 'lazy'
    };
  }

  // Check browser support
  supportsWebP() {
    if (typeof window === 'undefined') return false;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  supportsAVIF() {
    if (typeof window === 'undefined') return false;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  }

  // Generate optimized image path
  generateOptimizedPath(basePath, format, size) {
    const pathParts = basePath.split('/');
    const fileName = pathParts.pop();
    const directory = pathParts.join('/');
    const nameWithoutExt = fileName.split('.')[0];
    
    return `${directory}/optimized/${nameWithoutExt}_${size}.${format}`;
  }

  // Get media query for size
  getMediaQuery(size) {
    const sizeMap = {
      '320': '(max-width: 320px)',
      '640': '(max-width: 640px)',
      '1024': '(max-width: 1024px)',
      '1920': '(min-width: 1025px)'
    };
    return sizeMap[size] || '(min-width: 0px)';
  }

  // Preload critical images
  preloadImage(src, type = 'image/webp') {
    if (typeof window === 'undefined') return;
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    if (type) link.type = type;
    document.head.appendChild(link);
  }

  // Lazy load with intersection observer
  observeImage(imgElement, callback) {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      callback();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '50px'
    });

    observer.observe(imgElement);
    return observer;
  }
}

export const imageOptimizer = new ImageOptimizer();

// Image compression utility
export const compressImage = (file, quality = 0.8, maxWidth = 1920) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };

    img.src = URL.createObjectURL(file);
  });
};

