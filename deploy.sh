
#!/bin/bash
set -e
git pull

docker-compose -f docker-stack.yml pull
# Deploy with Docker Stack
docker stack deploy -c docker-stack.yml appname --with-registry-auth
