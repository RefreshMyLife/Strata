FROM node:lts
WORKDIR /app
COPY package*.json ./
RUN npm i --force
COPY . .
# No CMD here, or just:
ENTRYPOINT ["node"]