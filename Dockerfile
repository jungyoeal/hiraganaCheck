# 베이스 이미지: Node.js 18 (ARM64 지원)
FROM node:18-bullseye-slim

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사 및 의존성 설치
COPY package*.json ./
RUN npm install

# 소스코드 전체 복사
COPY . .

# Next.js 빌드
RUN npm run build

# 포트 노출 (Next.js 기본 포트)
EXPOSE 3000

# 컨테이너 실행 시 Next.js 서버 시작
CMD ["npm", "run", "start"]