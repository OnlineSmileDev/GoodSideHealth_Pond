FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm ci

COPY . .

RUN NEXT_TELEMETRY_DISABLED=1 npm run build

RUN npm prune --production && npm cache clean --force

USER node

EXPOSE 3000

CMD ["npm", "start"]