#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Convert all case images (.png, .jpeg, .webp) to .webp format in staging folder.
Source: public/images/cases/ (excluding batch-* and C* folders)
Target: temp-cases-staging/ (will be uploaded to R2)
"""

import os
import sys
from pathlib import Path
from PIL import Image

# Set stdout to UTF-8 for Windows compatibility
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def main():
    source_dir = Path("public/images/cases")
    staging_dir = Path("temp-cases-staging")
    
    # Create staging folder
    staging_dir.mkdir(exist_ok=True)
    
    # Extensions to process
    extensions = {'.webp', '.png', '.jpg', '.jpeg'}
    
    # Collect all image files (skip folders and txt files)
    images = []
    for ext in extensions:
        images.extend(source_dir.glob(f"*{ext}"))
    
    # Filter out files in batch-* and C* folders
    images = [img for img in images if not any(
        part.startswith(('batch-', 'C')) for part in img.parts
    )]
    
    # Filter out case-* files (keep only tvl-* files for consistency)
    # We want 60 files: 30 after-tvl-* + 30 before-tvl-* pairs
    images = [img for img in images if 'tvl-' in img.name]
    
    print(f"Found {len(images)} tvl-* images to convert")
    
    if len(images) != 60:
        print(f"WARNING: Expected 60 images, found {len(images)}")
        return False
    
    converted_files = []
    failed = []
    
    # Convert each image
    for idx, img_path in enumerate(images, 1):
        try:
            # Get basename without extension
            basename = img_path.stem
            target_path = staging_dir / f"{basename}.webp"
            
            # Open and convert to WebP
            print(f"[{idx}/60] Converting {img_path.name} → {target_path.name}...", end=" ")
            
            with Image.open(img_path) as img:
                # Convert RGBA to RGB if needed (WebP quality improvement)
                if img.mode in ('RGBA', 'LA', 'P'):
                    rgb_img = Image.new('RGB', img.size, (255, 255, 255))
                    rgb_img.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
                    rgb_img.save(target_path, 'WEBP', quality=90)
                else:
                    img.save(target_path, 'WEBP', quality=90)
            
            converted_files.append(f"images/cases/{basename}.webp")
            print("✓")
        except Exception as e:
            print(f"✗ Error: {e}")
            failed.append((img_path.name, str(e)))
    
    print(f"\n{'='*60}")
    print(f"Conversion complete: {len(converted_files)}/60 successful")
    
    if failed:
        print(f"\nFailed ({len(failed)}):")
        for fname, error in failed:
            print(f"  - {fname}: {error}")
        return False
    
    # Write manifest
    manifest_path = staging_dir / "MANIFEST.txt"
    with open(manifest_path, 'w', encoding='utf-8') as f:
        f.write("# R2 Upload Manifest\n")
        f.write("# Format: r2_key\n\n")
        for key in sorted(converted_files):
            f.write(f"{key}\n")
    
    print(f"\nManifest written to: {manifest_path}")
    print(f"Ready to upload from: {staging_dir}")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
