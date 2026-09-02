const { Client } = require('d:/Project-files/web-dev/Helios/node_modules/ssh2');
const fs = require('fs');
const path = require('path');

const host = '45.196.196.220';
const username = 'root';
const password = 'theSCI2205';

const localRoot = 'D:/Project-files/web-dev/shivam-vishwanaath';
const remoteDir = '/home/shivamvishwanaath.dev/portfolio';

// Walk local directory recursively, excluding node_modules, .next, .git
function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git' && file !== '.env') {
        results = results.concat(walkDir(filePath));
      }
    } else {
      results.push(filePath);
    }
  }
  return results;
}

console.log('Gathering files from local portfolio directory...');
const localFiles = walkDir(localRoot);
console.log(`Found ${localFiles.length} files to upload.`);

const conn = new Client();
conn.on('ready', () => {
  console.log('SSH Connected. Preparing directories on VPS...');
  
  // Extract all unique remote subdirectories to create
  const relativeDirs = [...new Set(localFiles.map(filePath => {
    const relativePath = path.relative(localRoot, filePath).replace(/\\/g, '/');
    return path.posix.dirname(relativePath);
  }))].filter(dir => dir !== '.');

  const remoteDirsToCreate = relativeDirs.map(dir => `"${remoteDir}/${dir}"`).join(' ');
  const mkdirCmd = `mkdir -p "${remoteDir}" ${remoteDirsToCreate}`;

  console.log('Creating remote directories...');
  conn.exec(mkdirCmd, (err, stream) => {
    if (err) throw err;
    stream.resume();
    stream.on('close', (code) => {
      if (code !== 0) {
        console.error('Failed to create remote directories');
        conn.end();
        return;
      }
      
      console.log('Remote directories created. Starting SFTP upload...');
      conn.sftp((err, sftp) => {
        if (err) throw err;
        
        let index = 0;
        
        function uploadNext() {
          if (index >= localFiles.length) {
            console.log('All files uploaded successfully via SFTP.');
            runRemoteBuild();
            return;
          }
          
          const localPath = localFiles[index];
          const relativePath = path.relative(localRoot, localPath).replace(/\\/g, '/');
          const remotePath = `${remoteDir}/${relativePath}`;
          
          sftp.fastPut(localPath, remotePath, (err) => {
            if (err) {
              console.error(`SFTP Upload failed for: ${relativePath}`, err);
              // fallback to standard put
              sftp.put(localPath, remotePath, (err2) => {
                if (err2) {
                  console.error(`Fallback upload failed for: ${relativePath}`, err2);
                  conn.end();
                  return;
                }
                console.log(`Uploaded (fallback): ${relativePath}`);
                index++;
                uploadNext();
              });
              return;
            }
            console.log(`Uploaded: ${relativePath} (${index + 1}/${localFiles.length})`);
            index++;
            uploadNext();
          });
        }
        
        uploadNext();
      });
    });
  });
}).on('error', (err) => {
  console.error('SSH Error:', err);
}).connect({
  host,
  port: 22,
  username,
  password,
  readyTimeout: 30000
});

function runRemoteBuild() {
  console.log('Starting remote installation, compilation, and Caddy configuration...');
  
  const setupCommands = [
    // 1. Install Node.js, pnpm, and pm2
    'echo "=== 1. Upgrading Node.js to v22.x ==="',
    'curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && apt-get install -y nodejs',
    'node -v',
    'if ! command -v pnpm &> /dev/null; then npm install -g pnpm; fi',
    'pnpm -v',
    'if ! command -v pm2 &> /dev/null; then npm install -g pm2; fi',
    'pm2 -v',
    
    // 2. Setup environment file
    `cat << 'EOF' > ${remoteDir}/.env\nNEXT_PUBLIC_SITE_URL="https://shivamvishwanaath.dev"\nNEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="zscM1ryPIkzsX0Ar5czCACwkKVw8kDbiV0XgivcTBG8"\nEOF`,

    // 3. Build the Next.js project
    'echo "=== 3. Running dependency installation and build ==="',
    `cd ${remoteDir}`,
    'pnpm install',
    'pnpm build',
    
    // 4. Persistence with PM2
    'echo "=== 4. Launching Next.js with PM2 ==="',
    'pm2 stop shivam-vishwanaath || true',
    'pm2 delete shivam-vishwanaath || true',
    'pm2 start ecosystem.config.cjs',
    'pm2 save',
    
    // 5. Update Caddyfile with reverse proxy
    'echo "=== 5. Updating Caddy configuration ==="',
    `cat << 'EOF' > /etc/caddy/Caddyfile\nhe.thesci.co {\n    reverse_proxy 127.0.0.1:8090\n}\n\nmail.thesci.co {\n    reverse_proxy 127.0.0.1:8090\n}\n\ncal.thesci.co {\n    reverse_proxy 127.0.0.1:8090\n}\n\nshivamvishwanaath.dev, www.shivamvishwanaath.dev {\n    reverse_proxy 127.0.0.1:3000\n}\nEOF`,
    'systemctl reload caddy',
    
    // 6. Verify health of ports and deployment
    'echo "=== 6. Running post-deployment health check ==="',
    'sleep 3',
    'curl -s -I http://127.0.0.1:3000 | head -n 4 || true',
    'pm2 status',
    'echo "=== DEPLOYMENT COMPLETED SUCCESSFUL ==="'
  ];
  
  conn.exec(setupCommands.join('\n'), (err, stream) => {
    if (err) throw err;
    stream.on('close', (code) => {
      console.log(`Remote setup script finished with exit code ${code}`);
      conn.end();
    }).on('data', (d) => process.stdout.write(d))
    .stderr.on('data', (d) => process.stderr.write(d));
  });
}
