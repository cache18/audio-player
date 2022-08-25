Audio Player

### building (from main directory):
docker image build -f Dockerfile-backend -t music-player-backend .
docker image build -f Dockerfile-frontend -t music-player-frontend .

### running:
1) set PATH_TO_MUSIC_DIR in docker-compose.yml
2) docker-compose up -d
3) http://localhosty:8081