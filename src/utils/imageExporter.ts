/**
 * Utility for downloading images, extracting alpha channels (removing #150a24 background),
 * and exporting vector SVG silhouettes.
 */

interface TransparencyOptions {
  tolerance?: number; // color distance threshold (default ~28)
  feather?: number; // edge feathering
}

export function downloadImageOriginal(src: string, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || 1200;
      canvas.height = img.naturalHeight || 1600;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to create blob'));
          return;
        }
        triggerDownload(blob, filename);
        resolve();
      }, 'image/png');
    };
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

/**
 * Chroma-keys out the deep midnight background (#150a24) so the user gets
 * a true transparent PNG with alpha channel on the outer edges and center if requested.
 */
export function processAndDownloadTransparentPNG(
  src: string,
  filename: string,
  options: TransparencyOptions = {}
): Promise<void> {
  const tolerance = options.tolerance ?? 32;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const width = img.naturalWidth || 1200;
      const height = img.naturalHeight || 1600;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;

      // Target background color: #150a24 -> rgb(21, 10, 36)
      const targetR = 21;
      const targetG = 10;
      const targetB = 36;

      // Sample average corner background to get exact local shade
      // Corner average: top-left (0,0), top-right (width-1, 0)
      const sampleCorner = (x: number, y: number) => {
        const idx = (y * width + x) * 4;
        return [data[idx], data[idx + 1], data[idx + 2]];
      };

      const c1 = sampleCorner(10, 10);
      const c2 = sampleCorner(width - 10, 10);
      const bgR = (targetR + c1[0] + c2[0]) / 3;
      const bgG = (targetG + c1[1] + c2[1]) / 3;
      const bgB = (targetB + c1[2] + c2[2]) / 3;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Euclidean distance in RGB color space
        const dist = Math.sqrt(
          (r - bgR) * (r - bgR) +
          (g - bgG) * (g - bgG) +
          (b - bgB) * (b - bgB)
        );

        if (dist < tolerance) {
          // Full transparency for dark background
          data[i + 3] = 0;
        } else if (dist < tolerance + 18) {
          // Feather edge transition for smooth antialiased glow
          const alphaFactor = (dist - tolerance) / 18;
          data[i + 3] = Math.round(data[i + 3] * alphaFactor);
        }
      }

      ctx.putImageData(imgData, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to create transparent PNG'));
          return;
        }
        triggerDownload(blob, filename);
        resolve();
      }, 'image/png');
    };
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Generates an ultra crisp standalone SVG vector frame for download
 */
export function downloadSVGVector(shapeType: 'pumpkin-a' | 'pumpkin-b' | 'coffin' | 'ghost', filename: string) {
  let svgContent = '';

  if (shapeType === 'coffin') {
    svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="1200" height="1600">
  <defs>
    <filter id="glow-coffin" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="16" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <linearGradient id="coffin-rim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5c8a6b" />
      <stop offset="50%" stop-color="#3c5943" />
      <stop offset="100%" stop-color="#8ec59f" />
    </linearGradient>
  </defs>
  <!-- Transparent Background -->
  <!-- Outer coffin glow -->
  <polygon points="170,30 430,30 570,230 480,770 120,770 30,230" 
           fill="none" stroke="#5c8a6b" stroke-width="8" opacity="0.6" filter="url(#glow-coffin)" />
  <!-- Main coffin shape with hollow center -->
  <polygon points="170,30 430,30 570,230 480,770 120,770 30,230" 
           fill="#150a24" fill-opacity="0.92" stroke="url(#coffin-rim)" stroke-width="5" />
  <!-- Inner bevel line -->
  <polygon points="180,45 420,45 550,235 465,755 135,755 50,235" 
           fill="none" stroke="#5c8a6b" stroke-width="1.5" stroke-dasharray="10,6" opacity="0.5" />
</svg>`;
  } else if (shapeType === 'ghost') {
    svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="1200" height="1600">
  <defs>
    <filter id="glow-claro" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="20" result="blur" />
      <feColorMatrix type="matrix" values="
        1 0 0 0 0.88
        0 0 0 0 0
        0 0 0 0 0.1
        0 0 0 1 0" in="blur" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <linearGradient id="claro-aura" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ff5a6a" />
      <stop offset="50%" stop-color="#e2001a" />
      <stop offset="100%" stop-color="#990012" />
    </linearGradient>
  </defs>
  <!-- Phantom ghost contour with hollow body for text overlay -->
  <path d="M 50,300 C 50,110 180,30 300,30 C 420,30 550,110 550,300 L 550,710 
           C 530,750 490,750 470,720 
           C 450,750 410,750 390,720 
           C 370,750 330,750 300,720 
           C 270,750 230,750 210,720 
           C 190,750 150,750 130,720 
           C 110,750 70,750 50,710 Z"
        fill="#150a24" fill-opacity="0.94" stroke="url(#claro-aura)" stroke-width="6" filter="url(#glow-claro)" />
  <!-- Subtle inner luminous border -->
  <path d="M 65,305 C 65,125 190,48 300,48 C 410,48 535,125 535,305 L 535,695
           C 515,735 480,735 460,705 
           C 440,735 405,735 385,705 
           C 365,735 325,735 300,705 
           C 275,735 235,735 215,705 
           C 195,735 160,735 140,705 
           C 120,735 85,735 65,695 Z"
        fill="none" stroke="#ff5a6a" stroke-width="1.5" opacity="0.6" />
</svg>`;
  } else {
    // pumpkin-a and pumpkin-b
    svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="1200" height="1600">
  <defs>
    <filter id="glow-pumpkin" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="18" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <linearGradient id="pumpkin-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff7a29" />
      <stop offset="50%" stop-color="#d95e14" />
      <stop offset="100%" stop-color="#ffa059" />
    </linearGradient>
  </defs>
  <!-- Stylized pumpkin ribs frame -->
  <path d="M 120,40 C 200,60 400,60 480,40 
           C 560,150 580,300 580,450 
           C 580,600 560,700 480,760 
           C 400,740 200,740 120,760 
           C 40,700 20,600 20,450 
           C 20,300 40,150 120,40 Z"
        fill="#150a24" fill-opacity="0.93" stroke="url(#pumpkin-gradient)" stroke-width="5" filter="url(#glow-pumpkin)" />
  <!-- Inner ribbing accents -->
  <path d="M 300,55 L 300,90 M 300,710 L 300,745" stroke="#ff7a29" stroke-width="3" stroke-linecap="round" />
  <path d="M 135,55 C 210,72 390,72 465,55 
           C 540,160 560,300 560,450 
           C 560,590 540,690 465,745 
           C 390,728 210,728 135,745 
           C 60,690 40,590 40,450 
           C 40,300 60,160 135,55 Z"
        fill="none" stroke="#ff7a29" stroke-width="1.2" stroke-dasharray="8,4" opacity="0.5" />
</svg>`;
  }

  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  triggerDownload(blob, filename.replace('.png', '.svg'));
}
