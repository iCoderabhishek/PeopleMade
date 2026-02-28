
//  Workaround for RN 0.84 missing hermesc win64 binary.
//  See: https://github.com/facebook/react-native/issues/55538
 
//  hermes-compiler@250829098.0.7 doesn't ship win64-bin.
//   This script copies it from 250829098.0.9 which has the fix.

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const win64Dir = path.join(
  __dirname,
  '..',
  'node_modules',
  'hermes-compiler',
  'hermesc',
  'win64-bin',
);

if (process.platform !== 'win32') {
  console.log('[fix-hermesc] Not on Windows, skipping.');
  process.exit(0);
}

if (fs.existsSync(path.join(win64Dir, 'hermesc.exe'))) {
  console.log('[fix-hermesc] hermesc.exe already exists, skipping.');
  process.exit(0);
}

console.log('[fix-hermesc] win64-bin missing, extracting from hermes-compiler@250829098.0.9...');

const tmpDir = path.join(__dirname, '..', '.hermesc-tmp');
fs.mkdirSync(tmpDir, { recursive: true });

try {
  execSync(`npm pack hermes-compiler@250829098.0.9 --pack-destination "${tmpDir}"`, {
    stdio: 'pipe',
  });

  const tgz = path.join(tmpDir, 'hermes-compiler-250829098.0.9.tgz');
  fs.mkdirSync(win64Dir, { recursive: true });

  execSync(
    `tar -xzf "${tgz}" --strip-components=1 -C "${path.join(__dirname, '..', 'node_modules', 'hermes-compiler')}" "package/hermesc/win64-bin/"`,
    { stdio: 'pipe' },
  );

  console.log('[fix-hermesc] Successfully extracted hermesc.exe for win64.');
} catch (e) {
  console.error('[fix-hermesc] Failed to extract hermesc:', e.message);
  process.exit(1);
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
