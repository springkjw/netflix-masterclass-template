import { execSync } from 'child_process';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });

async function ask(question, defaultValue) {
  const answer = await rl.question(`${question} (${defaultValue}): `);
  return answer.trim() || defaultValue;
}

async function run() {
  try {
    console.log('\nGitHub Actions 배포 디스패치를 시작합니다.\n');

    const branch = await ask('배포 브랜치', 'main');
    const environment = await ask('환경(staging|production)', 'staging');
    const imageTag = await ask('이미지 태그', 'latest');

    console.log('\n==== OPTION ====');
    console.log(`branch: ${branch}`);
    console.log(`environment: ${environment}`);
    console.log(`image_tag: ${imageTag}`);
    console.log('================\n');

    execSync(
      `gh workflow run "Deploy ECS" --ref=${branch} -f environment=${environment} -f image_tag=${imageTag}`,
      { stdio: 'inherit' },
    );

    console.log('\n배포 워크플로를 실행했습니다. GitHub Actions에서 진행 상태를 확인하세요.');
  } finally {
    rl.close();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
