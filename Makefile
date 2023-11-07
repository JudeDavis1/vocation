img-push:
	docker build -t judedavis92/vocation:latest -f docker/cloud/Dockerfile .
	docker push judedavis92/vocation:latest
