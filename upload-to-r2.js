#!/usr/bin/env node

/**
 * Upload all WebP images from temp-cases-staging/ to R2 bucket.
 * R2 Key format: images/cases/<filename>.webp
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const STAGING_DIR = 'temp-cases-staging';
const R2_PREFIX = 'images/cases';

async function main() {
  console.log('🚀 Starting R2 upload from:', STAGING_DIR);
  
  if (!fs.existsSync(STAGING_DIR)) {
    console.error(`❌ Staging directory not found: ${STAGING_DIR}`);
    process.exit(1);
  }

  // Read all .webp files
  const files = fs.readdirSync(STAGING_DIR)
    .filter(f => f.endsWith('.webp'))
    .sort();

  if (files.length === 0) {
    console.error('❌ No .webp files found in staging directory');
    process.exit(1);
  }

  console.log(`Found ${files.length} files to upload\n`);

  let uploaded = 0;
  let failed = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(STAGING_DIR, file);
    const r2Key = `${R2_PREFIX}/${file}`;

    try {
      process.stdout.write(`[${i + 1}/${files.length}] Uploading ${file}... `);
      
      // Use wrangler r2 object put command (--remote for production R2)
      execSync(`wrangler r2 object put "${r2Key}" --file="${filePath}" --remote`, {
        stdio: 'pipe',
        encoding: 'utf-8'
      });

      console.log('✓');
      uploaded++;
    } catch (err) {
      console.log('✗');
      console.error(`  Error: ${err.message.slice(0, 80)}`);
      failed++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`Upload complete: ${uploaded}/${files.length} successful`);
  
  if (failed > 0) {
    console.log(`⚠️  ${failed} failed\n`);
    process.exit(1);
  }

  // Verify CDN URLs
  console.log('\n📋 Uploaded to R2:');
  console.log(`Base URL: https://cdn.tocvietlab.studio`);
  console.log(`\nSample URLs:\n`);
  const samples = files.slice(0, 3).concat(files.slice(-1));
  samples.forEach(f => {
    console.log(`  https://cdn.tocvietlab.studio/${R2_PREFIX}/${f}`);
  });
  console.log(`\n... and ${files.length - samples.length} more files\n`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
