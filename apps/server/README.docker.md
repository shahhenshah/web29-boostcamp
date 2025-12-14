# Docker Setup Guide

이 문서는 NestJS 서버의 Docker 설정 및 사용법을 설명합니다.

## 파일 구조

```
apps/server/
├── Dockerfile              # Multi-stage Dockerfile
├── .dockerignore          # Docker 빌드 시 제외할 파일
├── docker-compose.yml     # 개발 환경 설정
├── docker-compose.prod.yml # 프로덕션 환경 설정
└── .env.example           # 환경 변수 예제
```

## 개발 환경 (Development)

### 1. 시작하기

```bash
cd apps/server

# Docker Compose로 MySQL과 서버 함께 실행
docker-compose up

# 백그라운드 실행
docker-compose up -d
```

### 2. 특징

- **Hot Reload**: 소스 코드 변경 시 자동 재시작
- **볼륨 마운트**: `src/`와 `test/` 디렉토리가 마운트되어 실시간 반영
- **MySQL 포트**: 호스트 3306 포트로 접근 가능
- **서버 포트**: 호스트 3000 포트로 접근 가능

### 3. 데이터베이스 접속 정보

- Host: `localhost`
- Port: `3306`
- Database: `boostcamp_dev`
- Username: `boostcamp`
- Password: `boostcamp123`

### 4. 유용한 명령어

```bash
# 로그 확인
docker-compose logs -f

# 서버만 재시작
docker-compose restart server

# 전체 중지
docker-compose down

# 볼륨까지 삭제 (데이터베이스 초기화)
docker-compose down -v
```

## 프로덕션 환경 (Production)

### 1. 환경 변수 설정

```bash
# .env.example을 복사하여 .env 파일 생성
cp .env.example .env

# .env 파일 편집하여 실제 값 입력
```

### 2. 시작하기

```bash
cd apps/server

# 프로덕션 모드로 실행
docker-compose -f docker-compose.prod.yml up -d

# 빌드부터 다시 시작
docker-compose -f docker-compose.prod.yml up -d --build
```

### 3. 특징

- **최적화된 빌드**: 멀티 스테이지 빌드로 이미지 크기 최소화
- **프로덕션 의존성**: devDependencies 제외
- **환경 변수**: `.env` 파일에서 중요 정보 관리
- **네트워크 격리**: 독립적인 bridge 네트워크 사용

### 4. 유용한 명령어

```bash
# 로그 확인
docker-compose -f docker-compose.prod.yml logs -f server

# 컨테이너 상태 확인
docker-compose -f docker-compose.prod.yml ps

# 중지
docker-compose -f docker-compose.prod.yml down

# 이미지 재빌드
docker-compose -f docker-compose.prod.yml build --no-cache
```

## Dockerfile 구조

### Stage 1: Base
- Node.js 20 Alpine 이미지
- pnpm 설치
- 워크스페이스 파일 복사

### Stage 2: Development
- 모든 의존성 설치 (devDependencies 포함)
- 소스 코드 볼륨 마운트
- Hot reload 지원

### Stage 3: Build
- 프로덕션 빌드 실행
- dist 폴더 생성

### Stage 4: Production
- 프로덕션 의존성만 설치
- 빌드된 파일만 복사
- 최소 이미지 크기

## 트러블슈팅

### MySQL 연결 실패

```bash
# MySQL 헬스체크 확인
docker-compose ps

# MySQL 컨테이너 로그 확인
docker-compose logs mysql
```

### 소스 코드 변경이 반영되지 않음 (개발 환경)

```bash
# 서버 컨테이너 재시작
docker-compose restart server

# 또는 전체 재시작
docker-compose down && docker-compose up
```

### 이미지 빌드 캐시 문제

```bash
# 캐시 없이 빌드
docker-compose build --no-cache
```

## 보안 주의사항

1. `.env` 파일을 절대 Git에 커밋하지 마세요
2. 프로덕션 환경에서는 강력한 비밀번호를 사용하세요
3. 프로덕션에서는 MySQL 포트를 외부에 노출하지 마세요
4. 환경 변수를 통해 중요 정보를 관리하세요
