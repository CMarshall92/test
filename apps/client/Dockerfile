# Base stage with Alpine image
FROM node:20-alpine3.17 AS base
WORKDIR /app

# # # Install necessary packages
RUN apk update && apk add --no-cache libc6-compat openssh git

# # # Install pnpm and turbo globally define you specific version according to the package.json
RUN npm install -g pnpm@10.4.1 turbo  
RUN pnpm config set store-dir ~/.pnpm-store

# # #############################################################
# # # Stage 1 - Pruning unnecessary files                       #
# # #############################################################

FROM base AS pruner

# Copy all files to the container and Prune files that are not needed for the specified project
COPY . .
RUN npx turbo prune --scope=client --docker

# # #############################################################
# # # Stage 2 - Installing dependencies and building            #
# # #############################################################

FROM base AS builder
WORKDIR /app
# # Copy lockfile and package.json's of isolated subworkspace
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .

# Install dependencies using pnpm, using a cache for faster builds
RUN --mount=type=cache,id=pnpm-store,target=~/.pnpm-store pnpm install --frozen-lockfile

# # Copy source code of isolated subworkspace
COPY --from=pruner /app/out/full/ .
COPY apps/client/.env /app/apps/client/.env
RUN turbo build --filter=client
RUN pnpm prune --prod --no-optional

# # Cleanup: Remove source files that are not needed
RUN rm -rf ./**/*/src
RUN rm -rf apps/client/.next/standalone/node_modules


# # #############################################################
# # # Stage 3 - Run the application                             #
# # #############################################################

FROM base AS runner

WORKDIR /app/

ENV NODE_ENV="production"

# Copy built files from the builder stage
# COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/ .     

COPY apps/client/public apps/client/.next/standalone/public
RUN mkdir -p apps/client/.next/standalone/public/_next/static
RUN cp -r apps/client/.next/static/* apps/client/.next/standalone/public/_next/static

CMD node apps/client/.next/standalone/server.js