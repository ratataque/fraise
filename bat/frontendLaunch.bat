cd ..
docker run --rm -it -p 3000:3000 -v "%cd%\frontend\src:/fraise/frontend/src" -e CHOKIDAR_USEPOLLING=true -e WATCHPACK_POLLING=true fraisefront