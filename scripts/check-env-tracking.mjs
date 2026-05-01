import { execFileSync } from 'node:child_process';

const trackedFiles = execFileSync('git', ['ls-files'], {
  encoding: 'utf8',
})
  .split('\n')
  .filter(Boolean);

const trackedEnvFiles = trackedFiles.filter((file) => {
  if (file === '.env.example') return false;
  return file === '.env' || file.startsWith('.env.');
});

if (trackedEnvFiles.length > 0) {
  console.error(
    `Tracked local env file(s) must be removed from git: ${trackedEnvFiles.join(', ')}`
  );
  process.exit(1);
}

console.log('No local env files are tracked.');
