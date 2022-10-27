cd ..
docker build -t fraise .  
docker run --rm -it -p 8000:8000 -v "%cd%\backend:/fraise/backend/" fraise