cd github-repo-with-hook-enabled

echo "Pulling from Master"

git pull origin master

echo "Pulled successfully from master"

echo "Restarting server..."

#pm2 start bin/www

echo "Server restarted Successfully"
