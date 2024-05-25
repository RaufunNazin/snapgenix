echo "switching to main"
git checkout main
git pull origin main

echo "building frontend"
npm run build

echo "deploying frontend"
scp -r dist/* root@93.127.206.98:/var/www/snapgenix/

echo "done"