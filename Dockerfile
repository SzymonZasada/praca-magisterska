# Etap budowania
FROM node:20.11.1-alpine as builder

# # Ustawienie katalogu roboczego
# WORKDIR /app

# # Kopiowanie plików package.json i package-lock.json
# COPY package*.json ./

# # Instalacja zależności
# RUN npm ci

# Kopiowanie kodu źródłowego
COPY . .

# Budowanie aplikacji
RUN npm run build

# Etap produkcyjny
FROM nginx:1.25-alpine

# Kopiowanie plików konfiguracyjnych Nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Kopiowanie zbudowanych plików z etapu 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Konfiguracja healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q --spider http://localhost/ || exit 1

# Ekspozycja portu
EXPOSE 80

# Uruchomienie Nginx
CMD ["nginx", "-g", "daemon off;"]
