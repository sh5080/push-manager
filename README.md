# Push Manager

Push Manager는 푸시 알림 및 앱 사용자를 관리하고 스케줄링하는 웹 애플리케이션입니다.

## 프로젝트 구조

프로젝트는 Yarn Workspace를 사용하여 모노레포로 구성되어 있습니다:

- `src/shared`: 공통 타입, 유틸리티 및 상수
- `src/web`: Next.js 기반의 프론트엔드
- `src/server`: Nest.js 기반의 백엔드

## 시작하기

### 환경 설정

`.env` 파일을 `src/shared` 디렉토리에 생성하세요:

### 설치 및 실행

```bash
# 패키지 설치
yarn install

# 개발 모드로 실행
# 프론트엔드 (Next.js)
yarn web:dev

# 백엔드 (Nest.js)
yarn server:dev

# 또는 포트를 정리한 후 서버 실행
yarn dev:clean
```

### 빌드

```bash
# 공유 패키지 빌드
yarn build:shared

# 프론트엔드 빌드
yarn build:web

# 백엔드 빌드
yarn build:server

# 전체 프로젝트 빌드
yarn build:all
```

## 배포

```bash
# 프로덕션 모드로 실행
# 프론트엔드
yarn web:prod

# 백엔드
yarn server:prod
```

## CI/CD 배포 방식

프로젝트는 Jenkins를 통한 자동화된 CI/CD 파이프라인을 사용합니다:

1. 개발자는 master 브랜치에 직접 커밋하지 않고, dev에서 작업합니다.
2. 개발 완료 후 Pull Request를 생성합니다.
3. 코드 리뷰 후 승인되면 PR이 master 브랜치로 병합됩니다.
4. master 브랜치에 병합되면 Jenkins가 자동으로 빌드를 시작합니다.
5. Jenkins는 다음 단계를 수행합니다:
   - 코드 checkout
   - 의존성 설치
   - 빌드 및 테스트
   - 배포 패키지 생성
   - 서버 배포

## 주요 기능

- 푸시 알림 조회, 생성 및 관리
- 특정 유저 대량 타겟 푸시
- 푸시 알림 실시간 모니터링
- 푸시 발송 결과 통계 및 분석
- 사용자 관리 및 쿠폰 조회
- 앱 설정 수정
- 엑셀 데이터 다운로드

## 기술 스택

- **프론트엔드**: Next.js, React, TypeScript
- **백엔드**: Nest.js, TypeScript
- **데이터베이스**: Oracle/Sequelize Postgresql/Drizzle
- **패키지 관리**: Yarn Workspaces
