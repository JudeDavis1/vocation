img-push:
	docker build -t judedavis92/vocation:latest -f docker/cloud/Dockerfile .
	docker push judedavis92/vocation:latest

kube-start:
	kubectl apply -f k8s/

kube-clean:
	kubectl delete pods --all

kube-pull-creds:
	@echo "Usage: make kube-pull-creds EMAIL=<email> USER=<user> PASS=<pass>"
	@kubectl create secret docker-registry regcred \
		--docker-server=https://index.docker.io/v1/ \
		--docker-email=$(EMAIL) \
		--docker-username=$(USER) \
		--docker-password=$(PASS)

