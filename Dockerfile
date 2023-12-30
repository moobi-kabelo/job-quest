FROM node:18-alpine3.18

ENV PORT=4200

ENV NODE_ENV=production

WORKDIR /job-quest

COPY package*.json nx.json ./

RUN npm ci

COPY . .

RUN npx nx build --prod

EXPOSE 4200

CMD ["node", "./dist/job-quest/main.js"]
